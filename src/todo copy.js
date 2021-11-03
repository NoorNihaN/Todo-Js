import { getFilters, setFilters } from "./filters"
const todo = async () =>
{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    if (response.status === 200 ) {
        const data = await response.json()
       return data
    } else {
        throw new Error('Unable to get data')
    }
}

 
// Sort your notes by one of three ways
const sortNotes = (sortBy,completeStatus,data) => {
    if (sortBy === 'byAsc')// && completeStatus == 'false') {
       // const hideCompletedMatch = !filters.completeStatus || !todo.completed
       {
        return data.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        }) //&&  hideCompletedMatch
    } 
   
    else if (sortBy === 'byDes') {
        return data.sort((a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byId') {
        return data.sort((a, b) => {
            if (a.id < b.id) {
                return -1
            } else if (a.id > b.id) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return data
    }
}

const generateNoteDOM = (note) => {
    
    const dataListEl = document.createElement('div')
    dataListEl.classList.add('dataList')
    const titleEL = document.createElement('h2')
    titleEL.classList.add('dataList_title')

    const statusEl = document.createElement('div')
    statusEl.classList.add('dataList_status')

    const idEL = document.createElement('h3')
    idEL.classList.add('dataList_id')

    const compEl = document.createElement('h3')
    compEl.classList.add('dataList_complete')

    // Setup the note title text
    if (note.title.length > 0) {
        titleEL.textContent = `Title : ${note.title}` 
    } 
    titleEL.classList.add('list-item__title')
   dataListEl.appendChild(titleEL)


   idEL.textContent = `Id: ${note.id}` 
   statusEl.append(idEL)

   compEl.textContent = `Complete Status: ${note.completed}` 
   if(note.completed)
   {
       compEl.style.backgroundColor = "green" 
   }
   else{
    compEl.style.backgroundColor = "red"
   }
   statusEl.appendChild(compEl)
  
   dataListEl.appendChild(statusEl)
    return dataListEl
}

// Render application notes
const renderData = () => {

    const loadData = async ()=>
    {
        const data = await todo()
        console.log(data)
       
        const datasEl = document.querySelector('#dataLists')
        if(!data)
        {
            datasEl.innerHTML = 'No DataFound'
        }
        const filters = getFilters()
        const sortData = sortNotes(filters.sortBy,filters.completeStatus,data )
    
        const filteredData = sortData.filter((todo) => {
        const searchTextMatch = todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
        //const hideCompletedMatch = !filters.completeStatus || !todo.completed
        return searchTextMatch //&& hideCompletedMatch
    })
   // const incompleteTodos = filteredData.filter((todo) => !todo.completed)
   // console.log(incompleteTodos.length)
    // generateSummaryDOM(incompleteTodos.length)
        
        
     //   console.log(filteredData)
        datasEl.innerHTML = ''
      //  datasEl.appendChild(generateSummaryDOM(incompleteTodos.length))
        if (filteredData.length > 0) {
            filteredData.forEach((data) => {
                const dataEl = generateNoteDOM(data)
                datasEl.appendChild(dataEl)
            })
        } else {
            const emptyMessage = document.createElement('p')
            emptyMessage.textContent = 'No Todo to show'
            emptyMessage.classList.add('empty-message')
            datasEl.appendChild(emptyMessage)
        }
       
        
    }
    loadData()
    
    // const filters = getFilters()
    // const data = sortNotes(filters.sortBy)
    //const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
}

// Get the DOM elements for list summary
const generateSummaryDOM = () => {

    const load = async ()=>
    {
        const data = await todo()
        const incompleteTodos = data.filter((todo) => !todo.completed)
        const headerEl = document.querySelector('.container')
  
    const summary = document.createElement('h1')
    
    summary.classList.add('summary')
    summary.innerHTML = ''
    //const plural = incompleteTodos.length === 1 ? '' : 's'
  
    summary.textContent = `You have ${incompleteTodos.length} todo left`
  headerEl.appendChild(summary)
    }
    load()
    
} 

// const generateSummaryDOM = (incompleteTodos) => {

//     const load = async ()=>
//     {
//         const data = await todo()
//         const incompleteTodos = data.filter((todo) => !todo.completed)
//     }
//     const headerEl = document.querySelector('.container')
  
//     const summary = document.createElement('h1')
    
//     summary.classList.add('summary')
//     summary.innerHTML = ''
//     //const plural = incompleteTodos.length === 1 ? '' : 's'
  
//     summary.textContent = `You have ${incompleteTodos} todo left`
//   headerEl.appendChild(summary)
// } 

export{todo, renderData, generateSummaryDOM}