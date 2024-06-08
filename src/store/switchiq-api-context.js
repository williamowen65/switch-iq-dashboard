'use client';

import FilterStateContext from '@/store/filter-state-context'
import moment from 'moment';
const { createContext, useState, useEffect, useContext } = require("react");

const SwitchIQContext = createContext({
    callRecords: {},
    rejectedCallRecords: {},
    rejectedCalls: {},
    frequentDIDs: {},
    summary: {},
    refresh: function () { }
})


export function SwitchIQStateProvider(props) {

    const root = 'https://switchiq-api.vercel.app/'

    const filterContext = useContext(FilterStateContext)
    const activeFilterStatus = filterContext.filterStatus

    let [localFilter, setLocalFilter] = useState({})
    let [pageLoaded, setPageLoaded] = useState(false)

    const [callRecords, setCallRecords] = useState()
    const [rejectedCallRecords, setRejectedCallRecords] = useState()
    const [rejectedCalls, setRejectedCalls] = useState()
    const [frequentDIDs, setFrequentDIDs] = useState()
    const [summary, setSummary] = useState()
    const [abortController, setAbortController] = useState(null)




    useEffect(() => {
        handleUseEffect()
        async function handleUseEffect() {

            if (pageLoaded && (localFilter.from !== activeFilterStatus.from || localFilter.to !== activeFilterStatus.to || !callRecords)) {

                if (abortController) {
                    // Cancels the current api calls being made for an old query
                    abortController.abort("There is a new filter query")
                }

                const controller = new AbortController()

                setAbortController(controller)
                await fetchData(getFilterQuery(activeFilterStatus), controller)

            }

            // This prevents a duplicate fetch on load.
            setPageLoaded(true)
            // console.log("activeFilterStatus in SwitchIQStateProvider \n", activeFilterStatus,
            //     { "localFilter.from !== activeFilterStatus.from || localFilter.to !== activeFilterStatus.to": localFilter.from !== activeFilterStatus.from || localFilter.to !== activeFilterStatus.to }
            // )
        }

    }, [activeFilterStatus, pageLoaded])

    useEffect(() => {
        if (pageLoaded) {

            console.log({
                callRecords,
                rejectedCallRecords,
                rejectedCalls,
                frequentDIDs
            })
        }
        console.log({
            callRecords,
            rejectedCallRecords,
            rejectedCalls,
            frequentDIDs,
            summary
        })
    }, [callRecords, rejectedCallRecords,
        rejectedCalls, summary,
        frequentDIDs, pageLoaded])



    const context = {
        callRecords,
        rejectedCallRecords,
        rejectedCalls,
        frequentDIDs,
        summary,
        refresh: function () {
            console.log("Refreshing data")
            if (abortController) {
                // Cancels the current api calls being made for an old query
                abortController.abort("There is a new filter query")
            }

            const controller = new AbortController()

            setAbortController(controller)
            fetchData(getFilterQuery(activeFilterStatus), controller)
        }
    }




    /**
     * Fetches all data based on the current query
     */
    async function fetchData(query, abortController) {


        try {
            Promise.all([
                (async () => {
                    // Initializing the fetch process for all the data
                    setCallRecords([])
                    const calls = await paginateFetch('calls', query, setCallRecords)
                    // setCallRecords(callRecords => {
                    //     console.log({ callRecords })
                    //     return callRecords
                    // })
                })(),
                (async () => {
                    setRejectedCallRecords([])
                    const rejectedCallRecords = await paginateFetch('rejected_calls', query, setRejectedCallRecords)
                })(),
                (async () => {
                    setRejectedCalls([])
                    const rejectedCalls = await paginateFetch('rejected_chart', query, setRejectedCalls)
                })(),
                (async () => {
                    setFrequentDIDs([])
                    const frequentDIDs = await paginateFetch('frequent_dids', query, setFrequentDIDs)
                })(),
                (async () => {
                    setSummary([])
                    const frequentDIDs = await paginateFetch('summary', query, setSummary)
                })(),
            ])






        } catch (error) {
            console.log(error)
            // TODO Display error to user.
        }


        async function paginateFetch(route, query, setState) {

            let page = 0;
            const dataCountBy = 20000;

            const data = []
            let responseData = await performFetch(page)

            if (responseData.data.length == dataCountBy) {

                while (responseData.data.length == dataCountBy) {
                    setState(data)
                    page += 1
                    responseData = await performFetch(page)
                }
            } else {
                setState(data)
            }

            // return data
            async function performFetch(page) {
                return new Promise(async (resolve, reject) => {

                    console.log("Selected: ", activeFilterStatus.selectValue || activeFilterStatus.from && 'custom filter' || 'no filter',)
                    const url = encodeURI(root + route + `?page_size=${dataCountBy}&page=${page}` + query)
                    console.log("Fetching: " + url)
                    const signal = abortController.signal
                    const response = await fetch(url, { signal })
                    const responseData = await response.json()

                    if (responseData.error) {
                        console.error(responseData.error)
                        if (JSON.stringify(responseData.error).includes("Too many request")) {
                            throw new Error(responseData.error.error)
                        }
                    }

                    // Comment back in when we can fetch
                    // Get rate limit headers, set rateLimits
                    // console.log(...response.headers)
                    // console.log(response.headers.get('X-RateLimit-Limit'))
                    responseData.data = responseData.data.flat(Infinity)
                    data.push(...responseData.data)

                    if (responseData.data.length == dataCountBy) {
                        console.log("Going to fetch paginate")
                    }

                    // Resolve with response data so we can determine if there is more data to fetch.
                    resolve(responseData)
                })

            }

        }

    }


    return <SwitchIQContext.Provider value={context}>
        {props.children}
    </SwitchIQContext.Provider>
}

/**
 * Gets/returns the query string for the start_time=2024-04-28&end_time=2024-05-03
 */
function getFilterQuery(activeFilterStatus) {
    let query = '&'
    const from = activeFilterStatus.from ? query += 'start_time=' + moment(activeFilterStatus.from).format("YYYY-MM-DD HH:mm:ss") : ''
    const to = activeFilterStatus.to ? query += '&end_time=' + moment(activeFilterStatus.to).format("YYYY-MM-DD HH:mm:ss") : ''

    const returnedQuery = from ? query : ''
    // console.log("getFilterQuery", { activeFilterStatus, returnedQuery })
    return returnedQuery
}

export default SwitchIQContext