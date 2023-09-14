import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shoplist-db-dc64e-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

const endorsmentInDB = ref(database, "endorsment")

const publishEl = document.getElementById("publish")
const endorsmentEl = document.getElementById("endorsment")
const fromEl = document.getElementById("from")
const toEl = document.getElementById("to")
const ulEl = document.getElementById("entry")


publishEl.addEventListener("click", function() {
    let endorsmentVal = endorsmentEl.value
    let fromVal = fromEl.value
    let toVal = toEl.value

    let entries = [endorsmentVal, fromVal, toVal]
    console.log(entries)

    if(endorsmentVal && fromVal && toVal) {
        push(endorsmentInDB, entries)
        clearInputFieldEl()
    }
})


onValue(endorsmentInDB, function(snapshot) {

    // check if there's data on the snapshot
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearEndorsmentEntry()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            
            postEndorsment(currentItem)
        }    
    } else {
        // set display to none if no entry
        ulEl.innerHTML = ""
    }
})

function postEndorsment(item) {
    let itemID = item[0]
    let itemValue = item[1]
    ulEl.innerHTML += 
            `<li>
                <h3>To ${itemValue[2]}</h3>
                <p>${itemValue[0]}</p>
                <h3>From ${itemValue[1]}</h3>     
            </li>`

}


//clear ul inner html if there is no data on the database
function clearEndorsmentEntry() {
    ulEl.innerHTML = ""
}


//clear all fields when user press enter/publish
function clearInputFieldEl() {
    endorsmentEl.value = ""
    fromEl.value = ""
    toEl.value
}