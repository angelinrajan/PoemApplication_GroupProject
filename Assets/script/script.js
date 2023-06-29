requesturl = 'https://poetrydb.org';
var selectField = "author"
var searchTerm = "William Shakespeare"
var randompoem = document.querySelector('#Random');
var poemParagraph = document.querySelector('#poemParagraph');
var poetName = document.querySelector('#poemAuthor');
var poemTitle = document.querySelector('#poemTitle');

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
};
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

function randomP() {
    var rpoemUrl = requesturl + '/random';
    fetch(rpoemUrl)
        .then(function (response) {
            if (response.status === 200) {
                console.log(response);
                return response.json()

                    .then(function (data) {
                        console.log(data)
                        console.log(data[0].lines)
                        poemParagraph.textContent = data[0].lines
                        poetName.textContent = data[0].author
                        poemTitle.textContent = data[0].title
                    });
            }
})
};



//getPoem()
randompoem.addEventListener("click", randomP);