
// Check all button for tables, implemented onChange events
export function selectAll(event) {
    // Find closest table
    const parentTable = event.target.closest('table') as HTMLTableElement;
    console.log(event.target)
    // Value to Assign
    const value = event.target.checked
    // Select all checkboxes in table
    const allCheckboxes = parentTable.querySelectorAll('input[type=checkbox]')
    // Assign them to value
    allCheckboxes.forEach((checkbox: HTMLInputElement) => {
        checkbox.checked = value
    })
}
