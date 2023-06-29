
baseUrl = 'https://poetrydb.org'

requesturl = 'https://poetrydb.org';
var selectField = "author"
var searchTerm = "William Shakespeare"
var randompoem = document.querySelector('#Random');
var poemParagraph = document.querySelector('#poemParagraph');
var poetName = document.querySelector('#poemAuthor');
var poemTitle = document.querySelector('#poemTitle');


function getPoem(searchTerm, selectField) {
    //Add inputs to modify base URL
    baseUrl += `/${selectField}/${searchTerm}`
    console.log(baseUrl) //should output (for example) https://poetrydb.org/author/authorName
    fetch(baseUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            console.log(data[0].lines)
            document.querySelector("p").textContent = data[0].lines;
            document.querySelector('h2').textContent = data[0].title;
            document.querySelector('span').textContent = data[0].author;
})  
}


//Add event listener to button, function passes form info to API call function
document.querySelector('button').addEventListener('click', function() {
    //CHANGE THIS TO REFLECT THE FORM
    var searchTerm = document.querySelector('input[type=text]').value;
    var selectField = document.querySelector('input[type=radio]:checked').value;
    getPoem(searchTerm, selectField)
})
// getPoem()

//FOR LATER

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

