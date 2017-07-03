/* eslint-disable no-console */

// import './index.css'
//
// import numeral from 'numeral'
// //https://github.com/adamwdraper/Numeral-js
//
// const courseValue = numeral(1000).format('$0,0.00')
// console.log(`I would pay ${courseValue} for this course!`)

import { getUsers, deleteUser } from './api/usersApi.js'

const log = function() {
    console.log.apply(console, arguments)
}

getUsers().then(data => {
    let usersBody = ''

    data.forEach(user => {
        usersBody += `
        <tr class="user-row">
            <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
        </tr>`
    })

    global.document.querySelector('#users').innerHTML = usersBody

    const deleteLinks = global.document.querySelectorAll('.deleteUser')
    log('deleteLinks', deleteLinks)

    const bindEvent = function(element, eventName, callback) {
        element.addEventListener(eventName, callback)
    }

    // Must use array.from to create a real array from a DOM collection
    // getElementsByClassname only returns an "array like" object
    Array.from(deleteLinks, function(link) {
        bindEvent(link, 'click', function(event) {
            console.log('clicked')
            const element = event.target
            event.preventDefault()

            const userID = element.dataset.id
            log(userID)
            deleteUser(userID)

            const row = element.closest('.user-row')
            row.remove()
        })
    })
})
