'use client';

import FilterStateContext from '@/store/filter-state-context'
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

    let [localFilter, setLocalFilter] = useState(null)

    const [callRecords, setCallRecords] = useState()
    const [rejectedCallRecords, setRejectedCallRecords] = useState()
    const [rejectedCalls, setRejectedCalls] = useState()
    const [frequentDIDs, setFrequentDIDs] = useState()

    // function handleUpdateFilterStatus(newFilterStatus) {
    //     setCallRecords(newFilterStatus)
    // }

    useEffect(() => {
        if (localFilter !== activeFilterStatus) {
            setLocalFilter(activeFilterStatus)
            fetchData()
        }
        console.log("activeFilterStatus in SwitchIQStateProvider \n", activeFilterStatus)
    }, [activeFilterStatus])

    const context = {
        callRecords,
        rejectedCallRecords,
        rejectedCalls,
        frequentDIDs
    }


    async function fetchData() {
        console.log('fetch data')
        const response = await fetch(root + 'calls', {
            mode: 'cors'
        })
        const calls = await response.json()
        console.log({ calls })
    }


    return <SwitchIQContext.Provider value={context}>
        {props.children}
    </SwitchIQContext.Provider>
}

export default SwitchIQContext