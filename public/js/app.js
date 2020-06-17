console.log('client javascript loaded')

const todoForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message-1')

message.textContent = ''

todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const task = search.value;
    if (!task) {
        message.textContent = 'Please enter some task to do'

    } else {
        
        message.textContent = 'Your New Task added successfully'
        
        const body = {
            task: task
        }

        fetch('http://localhost:3000/Task-Manipulation', { 
        
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) 
        })
        .then((res) => res.json())
        .then((response) => {
            console.log(response)
        })

    }   

    fetch('http://localhost:3000/Task-Manipulation', { 
        
            method: 'GET', 
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             }
       })
       .then((res) => res.json())
       .then((data) => {
           console.log(data)
           let output = '<h2 style="color: green;text-decoration: underline">List Of Tasks : </h2>'
   
           data.forEach(function (userTask) {
               output += `
                   <ul>
                       <li>${userTask.task}</li>
                   </ul>
               `
           })
           document.getElementById('output').innerHTML = output
       })
})