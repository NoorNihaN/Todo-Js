
import {todo,renderData, generateSummaryDOM } from "./todo";
import { setFilters } from "./filters.js";
//debugger
renderData()
generateSummaryDOM()

document.querySelector('#search-by').addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderData()
})
document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderData()
})


