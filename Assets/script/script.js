requesturl = 'https://poetrydb.org';
dictionaryUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en';
var inputWord = document.querySelector('#wordInput');
var randompoem = document.querySelector('#Random');
var poemParagraph = document.querySelector('#poemParagraph');
var poetName = document.querySelector('#poemAuthor');
var poemTitle = document.querySelector('#poemTitle');
var textDisplay = document.querySelector('#definitionDisplay');


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
            var pTitle = poemTitle.textContent;
            //var aName = poetName.textContent;
            localStorage.setItem("Poem Title", pTitle);
          //localStorage.setItem(aName, pTitle);
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
            console.log(data)
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




document.getElementById("randomButton").addEventListener("click", randomP);

document.getElementById("wordSubmitBtn").addEventListener("click", submitWord);
