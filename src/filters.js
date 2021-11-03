const filters = {
    searchText: '',
    sortBy: 'byAsc',
    completeStatus : 'true'
}

const getFilters = () => filters

const setFilters = (updates) => {
    if (typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText
    }
    if (typeof updates.sortBy === 'string') {
        filters.sortBy = updates.sortBy
    }
    if (typeof updates.completeStatus === 'string') {
        filters.completeStatus = updates.completeStatus
    }

}

export { getFilters, setFilters }