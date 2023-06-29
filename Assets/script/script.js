


var randompoem = document.querySelector('#Random');
var poemParagraph = document.querySelector('#poemParagraph');
var poetName = document.querySelector('#poemAuthor');
var poemTitle = document.querySelector('#poemTitle');


function getPoem(search, select) {
    //Add inputs to modify base URL
    var  baseUrl = 'https://poetrydb.org'
    baseUrl += `/${select}/${search}`
    console.log(baseUrl) //should output (for example) https://poetrydb.org/author/authorName
    fetch(baseUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            console.log(data[0].lines)
            poemParagraph.textContent = data[0].lines;
            poemTitle.textContent = data[0].title;
            poetName.textContent = data[0].author;
})  
}


//Add event listener to button, function passes form info to API call function
document.getElementById("searchForm").addEventListener('submit', function(e) {
    //CHANGE THIS TO REFLECT THE FORM
    console.log('hi')
    e.preventDefault();
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
document.getElementById("randomButton").addEventListener("click", randomP);

