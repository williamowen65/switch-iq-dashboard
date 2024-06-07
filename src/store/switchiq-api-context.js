'use client';

import FilterStateContext from '@/store/filter-state-context'
import moment from 'moment';
const { createContext, useState, useEffect, useContext } = require("react");

const SwitchIQContext = createContext({
    callRecords: {},
    rejectedCallRecords: {},
    rejectedCalls: {},
    frequentDIDs: {},
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





    useEffect(() => {
        handleUseEffect()
        async function handleUseEffect() {

            if (pageLoaded && (localFilter.from !== activeFilterStatus.from || localFilter.to !== activeFilterStatus.to || !callRecords)) {
                // console.log({
                //     "localFilter.from !== activeFilterStatus.from": localFilter.from !== activeFilterStatus.from,
                //     " localFilter.to !== activeFilterStatus.to": localFilter.to !== activeFilterStatus.to,
                //     " !callRecords": !callRecords,
                //     callRecords
                // })

                await fetchData(getFilterQuery(activeFilterStatus))

                // setLocalFilter(activeFilterStatus)
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
    }, [callRecords, rejectedCallRecords,
        rejectedCalls,
        frequentDIDs, pageLoaded])



    const context = {
        callRecords,
        rejectedCallRecords,
        rejectedCalls,
        frequentDIDs,
        refresh: function () {
            console.log("Refreshing data")
            fetchData(getFilterQuery(activeFilterStatus))
        }
    }


    /**
     * Fetches all data based on the current query
     */
    async function fetchData(query) {
        // Rate limit is updated/evaluated via paginateFetch
        let rateLimits = {}

        try {
            // Initializing the fetch process for all the data
            const calls = await paginateFetch('calls', query)
            setCallRecords(calls)
            const rejectedCallRecords = await paginateFetch('rejected_calls', query)
            setRejectedCallRecords(rejectedCallRecords)
            const rejectedCalls = await paginateFetch('rejected_chart', query)
            setRejectedCalls(rejectedCalls)
            const frequentDIDs = await paginateFetch('frequent_dids', query)
            setFrequentDIDs(frequentDIDs)

        } catch (error) {
            console.log(error)
            // TODO Display error to user.
        }


        async function paginateFetch(route, query) {

            let page = 0;
            const dataCountBy = 20000;

            const data = []
            let responseData = await performFetch(page)

            while (responseData.data.length == dataCountBy) {
                page += 1
                responseData = await performFetch(page)
            }

            return data
            async function performFetch(page) {
                let waitTime = 0
                // Evaluate rate limits and possibly wait
                return new Promise((resolve, reject) => {

                    setTimeout(async () => {
                        console.log("Selected: ", activeFilterStatus.selectValue || activeFilterStatus.from && 'custom filter' || 'no filter',)
                        const url = encodeURI(root + route + `?page_size=${dataCountBy}&page=${page}` + query)
                        console.log("Fetching: " + url)
                        const response = await fetch(url)
                        const responseData = await response.json()

                        if (responseData.error) {
                            console.error(responseData.error)
                            if (JSON.stringify(responseData.error).includes("Too many request")) {
                                throw new Error(responseData.error.error)
                            }
                        }

                        // Comment back in when we can fetch
                        // Get rate limit headers, set rateLimits
                        console.log(...response.headers)
                        // console.log(response.headers.get('X-RateLimit-Limit'))
                        responseData.data = responseData.data.flat(Infinity)
                        data.push(...responseData.data)

                        if (responseData.data.length == dataCountBy) {
                            console.log("Going to fetch paginate")
                        }

                        // Resolve with response data so we can determine if there is more data to fetch.
                        resolve(responseData)
                    }, waitTime)
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