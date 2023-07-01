requesturl = 'https://poetrydb.org';
dictionaryUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en';
var inputWord = document.querySelector('#wordInput');
var randompoem = document.querySelector('#Random');
var poemParagraph = document.querySelector('#poemParagraph');
var poetName = document.querySelector('#poemAuthor');
var poemTitle = document.querySelector('#poemTitle');
var textDisplay = document.querySelector('#definitionDisplay');

// getLocalStorage()

function getPoem(search, select) {
    //Add inputs to modify base URL
    var  baseUrl = 'https://poetrydb.org'
    baseUrl += `/${select}/${search}`
    // console.log(baseUrl) //should output (for example) https://poetrydb.org/author/authorName
    fetch(baseUrl)
        .then(function (response) {
            if (response.status === 200) {
                return response.json()
            }
        })
        .then(function (data) {
            console.log(data)
            console.log(data[0].lines)
            poemParagraph.textContent = data[0].lines;
            poemTitle.textContent = data[0].title;
            poetName.textContent = data[0].author;
})  
}

function displayPoem(object) {
    poemTitle.textContent = object[0].title;
    poetName.textContent = object[0].author;
    poemParagraph.textContent = object[0].lines
}
function clearPage() {
    poemTitle.textContent = '';
    poetName.textContent = '';
    poemParagraph.textContent = ''
}

//Add event listener to button, function passes form info to API call function
document.getElementById("searchForm").addEventListener('submit', function(e) {
    //CHANGE THIS TO REFLECT THE FORM
    e.preventDefault();
    var searchTerm = document.querySelector('input[type=text]').value;
    var selectField = document.querySelector('input[type=radio]:checked').value;

    getPoem(searchTerm, selectField)
})
// getPoem()

//FOR LATER
var submitWord = function(event) {
    event.preventDefault();
    console.log("Hello");
    var wordsearch = inputWord.value.trim();

    if (wordsearch) {
        getDefinition(wordsearch);

       // wordsearch.value = '';
        console.log(wordsearch);

    }
};

var getDefinition = function (word) {
    var dictionaryapi = dictionaryUrl + '/' + word;
    //Defines word
    fetch(dictionaryapi)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            if (data !== 200) {
                textDisplay.textContent = "Sorry, Definition unavailable at the moment! Try another word..."
            }
            console.log(data[0].meanings[0].definitions[0])
            var deftext = textDisplay;
            deftext.textContent = (data[0].meanings[0].definitions[0].definition);
            console.log(deftext);
            
            
        })

};

function randomP() {
   
    var rpoemUrl = requestUrl + '/random';
    fetch(rpoemUrl)
        .then(function (response) {
            if (response.status === 200) {
                // console.log(response);
                return response.json()

                    .then(function (data) {
                        // console.log(data)
                        // console.log(data[0].lines)
                        poemParagraph.textContent = data[0].lines
                        poetName.textContent = data[0].author
                        poemTitle.textContent = data[0].title
                        localStorage.setItem("title", data[0].title)
                    });
            }
})
};




document.getElementById("randomButton").addEventListener("click", randomP);

document.getElementById("wordSubmitBtn").addEventListener("click", submitWord);

poemParagraph.addEventListener('dblclick', function(){ 
    var selObj = window.getSelection()
    getDefinition(selObj)
    console.log(selObj)
})