var selectField = "author"
var searchTerm = "William Shakespeare"

function getPoem() {
    //Saves currently display poem as "Previous Poem"
    fetch(`https://poetrydb.org/${selectField}/${searchTerm}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            console.log(data[0].lines)
            document.querySelector("p").textContent = data[0].lines
           //Saves poem as "Current Poem"
        })
}
function getDefinition() {
    //Defines word
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${highlightedWord}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            console.log(data[0].meanings[0].definitions[0])          
        })
}

getPoem()