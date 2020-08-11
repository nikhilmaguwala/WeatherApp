
console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const forecast = document.querySelector('#forecast')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                forecast.innerHTML = "Server Error:- " + data.error
            } else {
                forecast.innerHTML = data.forecast
            }
        })
    })
})