console.log('client javascript loaded')

const todoForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message-1')

message.textContent = ''

todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const task = search.value;

    if (!task) {
        message.textContent = 'Please enter some task todo'
    } else {
        message.textContent = task
    }

    console.log(task)
})