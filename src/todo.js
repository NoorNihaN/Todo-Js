import { getFilters, setFilters } from "./filters"




const todo = async () =>
{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    if (response.status === 200) {
        const data = await response.json()
       return data
    } else {
        throw new Error('Unable to get puzzle')
    }
}

 
// Sort your notes by one of three ways
const sortNotes = (sortBy,completeStatus,data) => {
    if (sortBy === 'byAsc')
       
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
   
    const dataListEl = document.createElement('tr')
   
    
    const titleEL = document.createElement('td')
    titleEL.classList.add('dataList_title')

    
    const idEL = document.createElement('td')
    
    const compEl = document.createElement('td')

    if (note.title.length > 0) {
        titleEL.textContent = ` ${note.title}` 
    } 
   
   dataListEl.append(titleEL)


   idEL.textContent = ` ${note.id}` 
   dataListEl.append(idEL)

   compEl.textContent = ` ${note.completed}` 
   if(note.completed)
   {
       compEl.style.backgroundColor = "green" 
   }
   else{
    compEl.style.backgroundColor = "red"
   }
   dataListEl.appendChild(compEl)
  
    return dataListEl
}

// Render application notes
const renderData = () => {

    const loadData = async ()=>
    {
        const data = await todo()
        console.log(data)
        const datasEl = document.querySelector('#dataLists')
        const tableEl = document.createElement('table')
        tableEl.classList.add('table')
        const filters = getFilters()
        const sortData = sortNotes(filters.sortBy,filters.completeStatus,data )
      
      const filteredData = sortData.filter((todo) => {
        const searchTextMatch = todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
     return searchTextMatch //&& hideCompletedMatch
    })
  
        datasEl.innerHTML = ''
        tableEl.innerHTML= ''
       
         const tablehr = document.createElement('tr')
         tableEl.append(tablehr)

         const tablehead1 =  document.createElement('th')
          tablehead1.innerText = "Title"
          tablehr.append(tablehead1)

          const tablehead2 =  document.createElement('th')
          tablehead2.innerText = "Id"
          tablehr.append(tablehead2)

          const tablehead3 =  document.createElement('th')
          tablehead3.innerText = "Status"
          tablehr.append(tablehead3)
            
        if (filteredData.length > 0) {
            datasEl.appendChild(tableEl)
            filteredData.forEach((data) => {
                const dataEl = generateNoteDOM(data)
                tableEl.appendChild(dataEl)
            })
        } else {
            const emptyMessage = document.createElement('p')
            emptyMessage.textContent = 'No Todo to show'
            emptyMessage.classList.add('empty-message')
            datasEl.appendChild(emptyMessage)
        }
       
        
    }
    loadData()
    
   
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
  
  
    summary.textContent = `${incompleteTodos.length} todo left`
  headerEl.appendChild(summary)
    }
    load()
    
} 


export{todo, renderData, generateSummaryDOM}