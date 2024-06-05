'use client';

import FilterStateContext from '@/store/filter-state-context'
import moment from 'moment';
const { createContext, useState, useEffect, useContext } = require("react");

const SwitchIQContext = createContext({
    callRecords: {},
    rejectedCallRecords: {},
    rejectedCalls: {},
    frequentDIDs: {},
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
                // setCallRecords(true)

                // setLocalFilter(activeFilterStatus)
            }

            setPageLoaded(true)
            // console.log("activeFilterStatus in SwitchIQStateProvider \n", activeFilterStatus,
            //     { "localFilter.from !== activeFilterStatus.from || localFilter.to !== activeFilterStatus.to": localFilter.from !== activeFilterStatus.from || localFilter.to !== activeFilterStatus.to }
            // )
        }

    }, [activeFilterStatus, pageLoaded])



    const context = {
        callRecords,
        rejectedCallRecords,
        rejectedCalls,
        frequentDIDs
    }


    async function fetchData(query) {

        paginateFetch('calls', query)


        // console.log('fetch data', { route, query })

        // setCallRecords(paginateFetch(route, query))
        // console.log("set call records to true")
        // setCallRecords(true)


        async function paginateFetch(route, query) {
            let dataCount = 0
            let rateLimits = {}
            const data = []
            const responseData = await performFetch()
            // console.log({ "dataCount < responseData.statistics.rows_read)": dataCount < responseData.statistics.rows_read })
            // while (dataCount < responseData.statistics.rows_read) {
            //     performFetch()
            // }

            return data

            async function performFetch() {
                let waitTime = 0
                // Evaluate rate limits and possibly wait
                setTimeout(async () => {
                    console.log("Selected: ", activeFilterStatus.selectValue || activeFilterStatus.from && 'custom filter' || 'no filter',)
                    console.log("Fetching: " + root + route + query)
                    // const response = await fetch(root + route + query)
                    // const responseData = await response.json()

                    // Get rate limit headers, set rateLimits

                    // data.push(responseData.data)
                    // dataCount += responseData.rows
                    // console.log("performFetch", { responseData, dataCount })
                    // return responseData
                }, waitTime)

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
    let query = '?'
    const from = activeFilterStatus.from ? query += 'start_time=' + moment(activeFilterStatus.from).format("YYYY-MM-DD HH:mm:ss") : ''
    const to = activeFilterStatus.to ? query += '&end_time=' + moment(activeFilterStatus.to).format("YYYY-MM-DD HH:mm:ss") : ''

    const returnedQuery = from ? query : ''
    // console.log("getFilterQuery", { activeFilterStatus, returnedQuery })
    return returnedQuery
}

export default SwitchIQContext