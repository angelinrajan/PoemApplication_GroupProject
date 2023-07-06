requestUrl = 'https://poetrydb.org';
dictionaryUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en';
var inputWord = document.querySelector('#wordInput');
var randompoem = document.querySelector('#Random');
var poemParagraph = document.querySelector('#poemParagraph');
var poetName = document.querySelector('#poemAuthor');
var poemTitle = document.querySelector('#poemTitle');
var contentDisplay = document.querySelector(".content-display")
var infoTest;
var span = document.getElementById("definition");
var cardHeader = document.getElementById("card-header")
var wordType = document.querySelector(".grammar")
//API call to retrieve a list of authors poems or a specific poem
function getPoem(search, select) {
    var baseUrl = 'https://poetrydb.org'
    baseUrl += `/${select}/${search}`
    fetch(baseUrl)
        .then(function (response) {
            if (response.status === 200) {
                return response.json()
            }
        })
        .then(function (data) {
            if (select === 'author') {
                removeTextFunction(data[0].author)
                makelist(data)
            } else {
                displayPoem(data)
            }

        })
}
//Function to print poem to page
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



// clear content function
function removeTextFunction(authorName) {
    poemParagraph.textContent = "";
    // check if the entered input matches any author from the api response
    poemTitle.textContent = authorName;
    poetName.textContent = "";
}


function makelist(data) {
    var listContainer = document.createElement('ul')
    poemParagraph.appendChild(listContainer)
    for (let i = 0; i < 10; i++) {
        var listItem = document.createElement("li")
        var link = document.createElement("a")

        link.innerHTML = data[i].title
        //add way to tie api call to each link with appropriate title
        //make sure it looks nice
        //add pages for entries over 10?
        listContainer.appendChild(listItem)
        listItem.appendChild(link)
        // link.addEventListener('click', displayPoem(data))
    }
}


//API call to retrieve the definition of a word
function clearCard() {
    cardHeader.textContent = "";
    wordType.textContent = "";
    span.textContent = ""
    document.querySelector(".row").style.visibility = 'hidden'
}
var getDefinition = function (word) {

    var dictionaryapi = dictionaryUrl + '/' + word;
    fetch(dictionaryapi)
        .then(function (response) {
            //If, for whatever reason, a definition is not available, prints message
            if (response.status !== 200) {
                span.textContent = "Sorry, Definition unavailable at the moment! Try another word..."
            }
            return response.json()
        })
        .then(function (data) {
            //Displays definition in its container
            console.log(data)
            console.log(data[0].meanings)
            var definition = data[0].meanings[0].definitions[0].definition;

            cardHeader.textContent = word
            wordType.textContent = data[0].meanings[0].partOfSpeech
            
            span.textContent = definition;

        })

};
//Function to call a random poem from the API database
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
                        infoTest = data
                        poemParagraph.textContent = data[0].lines
                        poetName.textContent = data[0].author
                        poemTitle.textContent = data[0].title
                        localStorage.setItem("title", data[0].title)
                    });
            }
        })
};

//Function to position span containing defintion
function positionDefinition(e) {
    var card = document.querySelector(".row")
    card.style.visibility = 'visible'
    card.style.left = e.offsetX + 'px'
    card.style.top = e.offsetY + 'px'
    
}

//Upon doubleclicking on poem/list container, retrieve definition of highlighted word and position span relative to cursor
contentDisplay.addEventListener('dblclick', function (e) {
    var selObj = window.getSelection()
    getDefinition(selObj)
    positionDefinition(e)
})
document.addEventListener('click', clearCard)
//Add event listener to take user input and make API call to retrieve poem(s)
document.getElementById("searchForm").addEventListener('submit', function (e) {
    //CHANGE THIS TO REFLECT THE FORM
    e.preventDefault();
    var searchTerm = document.querySelector('input[type=text]').value;
    var selectField = document.querySelector('input[type=radio]:checked').value;

    getPoem(searchTerm, selectField)


})

document.getElementById("randomButton").addEventListener("click", randomP);

// document.getElementById("wordSubmitBtn").addEventListener("click", submitWord);


