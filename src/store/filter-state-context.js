'use client';

const { createContext, useState } = require("react");

const FilterStateContext = createContext({
    filterStatus: null, // 
    updateFilter: function (newFilterStatus) {
        console.log("updateFilter")
    }
})


export function FilterStateProvider(props) {

    const [filterStatus, setFilterStatus] = useState()

    function handleUpdateFilterStatus(newFilterStatus) {
        setFilterStatus(newFilterStatus)
    }

    const context = {
        filterStatus,
        updateFilter: handleUpdateFilterStatus
    }

    return <FilterStateContext.Provider value={context}>
        {props.children}
    </FilterStateContext.Provider>
}

export default FilterStateContext