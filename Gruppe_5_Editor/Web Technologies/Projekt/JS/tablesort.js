/**
 *
 * @param table
 * @param column
 * @param asc
 */
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody0 = table.tBodies[0];
    const tBody1 = table.tBodies[1];
    const tBody2 = table.tBodies[2];
    const rows0 = Array.from(tBody0.querySelectorAll("tr"));
    const rows1 = Array.from(tBody1.querySelectorAll("tr"));
    const rows2 = Array.from(tBody2.querySelectorAll("tr"));

    // Sort each row
    const sortedRows0 = rows0.sort((a, b) => {
        const aColText0 = parseFloat(a.querySelector(`td:nth-child(${ column + 1})`).textContent.trim().substr(1));
        const bColText0 = parseFloat(b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim().substr(1));

        return aColText0 > bColText0 ? (1 * dirModifier) : (-1 * dirModifier);
    });

    const sortedRows1 = rows1.sort((a, b) => {
        const aColText1 = parseFloat(a.querySelector(`td:nth-child(${ column + 1})`).textContent.trim().substr(1));
        const bColText1 = parseFloat(b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim().substr(1));

        return aColText1 > bColText1 ? (1 * dirModifier) : (-1 * dirModifier);
    });

    const sortedRows2 = rows2.sort((a, b) => {
        const aColText2 = parseFloat(a.querySelector(`td:nth-child(${ column + 1})`).textContent.trim().substr(1));
        const bColText2 = parseFloat(b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim().substr(1));

        return aColText2 > bColText2 ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody0.firstChild) {
        tBody0.removeChild(tBody0.firstChild);
    }

    while (tBody1.firstChild) {
        tBody1.removeChild(tBody1.firstChild);
    }

    while (tBody2.firstChild) {
        tBody2.removeChild(tBody2.firstChild);
    }

    // Re-add the newly sorted rows
    tBody0.append(...sortedRows0);

    tBody1.append(...sortedRows1);

    tBody2.append(...sortedRows2);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

/**
 *
 */
document.querySelectorAll(".reqtable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});