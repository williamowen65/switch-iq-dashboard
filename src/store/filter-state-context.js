'use client';

const { createContext, useState } = require("react");

const FilterStateContext = createContext({
    filterStatus: {}, // Will contain { from: Date, to: Date }
    updateFilter: function (newFilterStatus) {
        console.log("updateFilter")
    }
})


export function FilterStateProvider(props) {

    const [filterStatus, setFilterStatus] = useState({})

    function handleUpdateFilterStatus(newFilterStatus) {
        console.log("handleUpdateFilterStatus", { newFilterStatus })

        // Handle if just from, set to to be same day end of day.
        // Handle if from and to, but not selectValue, set to value to be end of to day.

        if (newFilterStatus.from && !newFilterStatus.to) {
            newFilterStatus.to = getDayEnd(newFilterStatus.from)
        }

        if (newFilterStatus.from && newFilterStatus.to && !newFilterStatus.selectValue) {
            newFilterStatus.to = getDayEnd(newFilterStatus.to)
        }

        setFilterStatus(newFilterStatus)

        function getDayEnd(date) {
            const thisDate = new Date(date)
            thisDate.setHours(23, 59, 59, 999)
            return thisDate
        }
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