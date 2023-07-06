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


var textDisplay = document.querySelector('#definitionDisplay');
var pagination_element = document.getElementById('pagination');
let current_page = 0;
let rows = 10;
var linkList = [];
var listData = [];
// getLocalStorage()

function getPoem(search, select) {
    //Add inputs to modify base URL
    var baseUrl = 'https://poetrydb.org'
    baseUrl += `/${select}/${search}`
    fetch(baseUrl)
        .then(function (response) {
            if (response.status === 200) {
                return response.json()
            }
        })
        .then(function (data) {
            console.log(data)
            console.log(data[0].lines)
            poemTitle.textContent = data[0].title;
            poetName.textContent = data[0].author;
            if (select === "author") {
                removeTextFunction(data[0].author)
                getList(data)
                linkList = data;
                console.log(linkList) //linklist contails the entire data
            } else {
                // if the search type is not author, update the poem title and author name normally
                displayPoem(data)
                console.log("poem")
            }
        });
}


function displayPoem(object) {
    var linebreak = "<br>"
    poemTitle.textContent = object[0].title;
    poetName.textContent = object[0].author;
    poemParagraph.innerHTML = object[0].lines.join(linebreak);
    var pTitle = poemTitle.textContent;
    var poetn = poetName.textContent;
    localStorage.setItem("Poem Title", pTitle);
    localStorage.setItem("Poet Name", poetn);
    poemParagraph.style.visibility = "visible";
    // save the data of the first poem from the api response

    // check if the entered author matches any author from api


};

//store the api response data in local storage

function clearPage() {
    poemTitle.textContent = '';
    poetName.textContent = '';
    poemParagraph.textContent = ''
}


//Add event listener to button, function passes form info to API call function
document.getElementById("searchForm").addEventListener('submit', function (e) {
    //CHANGE THIS TO REFLECT THE FORM
    e.preventDefault();
    // check if the selected search type is author 
    // if it is , sets content of paragraph with id of "poemParagraph" to an empty string
    var searchType = document.querySelector('input[name="searchType"]:checked').value;

    var searchTerm = document.querySelector('input[type=text]').value;
    var selectField = document.querySelector('input[type=radio]:checked').value;

    getPoem(searchTerm, selectField)


})



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
displayPoem(data);
                        localStorage.setItem("Poem Title", data[0].title)
                        localStorage.setItem("Poet Name", data[0].author)
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



//listTitle = link.innerHTML ; link
//titleNewPoem = listItem

function getList(data) {
    //var listContainer = document.createElement('ul')
    //poemParagraph.appendChild(listContainer)
    //console.log(poemParagraph) // contains the entire container- ul, li, href of title
    poemParagraph.style.visibility= "visible";
    for (var i = 0; i < data.length; i++) {
        // creating elements poem paragraph links to the poems 
        var link = document.createElement('a')
        //console.log(link) // the actual link title names
        // made listed items to make 10 titles pop up as bullet points

        var listItem = document.createElement('li')
        link.innerHTML = data[i].title
        // listContainer.appendChild(listItem)
        listItem.appendChild(link)
        // added this to make links clickable 
        link.href = "#";
        listData.push(listItem);
        //console.log(listData);
        (function (index) {

            // add click event listeners to each anchor tage to handle the selection
            link.addEventListener("click", function (e) {
                // prevent default link behavior
                e.preventDefault();
                populatePoem(data[index]);
                // pass the selected poem object tho the populated function 
            });

        })(i);
    }
    Pagination();
};
//Another function, define pagination, loop though the list Data,
function Pagination() {
    var listContainer = document.createElement('ul')
    poemParagraph.appendChild(listContainer)
    let start = rows * current_page;
    let end = start + rows;
    console.log(listData);
    let paginatedItems = listData.slice(start, end);
    console.log(paginatedItems);
    //URLappend ul to poemparagraph
    for (let i = 0; i < paginatedItems.length; i++) {
        // linkList, a, update textcontent, update href

        listContainer.appendChild(paginatedItems[i]);

    }
    // generatePageButton();
}
/*
var newPage = listData.length / 10;
var roundnewpage = Math.floor(newPage);

//console.log(newPage);
//displayListPoem(listData, listItem, rows, current_page);
//listItem.innerHTML = "";
//page--;
let start = rows * current_page;
let end = start + rows;
console.log(listData);
let paginatedItems = listData.slice(start, end);
console.log(paginatedItems);
//URLappend ul to poemparagraph
for (let i = 0; i < paginatedItems.length; i++) {
  // linkList, a, update textcontent, update href
   poemParagraph.appendChild(paginatedItems);
   
}
*/

/*
function generatePageButton () {
    var newPage = listData.length / 10;
var roundnewpage = Math.floor(newPage);
var nextbtn = document.createElement('button')
nextbtn.setAttribute("id", "nextButton");
nextbtn.textContent = "Next";
var prevbtn = document.createElement('button')
prevbtn.setAttribute("id", "prevButton");
prevbtn.textContent = "Previous";
poemParagraph.appendChild(prevbtn);
poemParagraph.appendChild(nextbtn);
var thisPage = document.createElement('p')
thisPage.setAttribute("id", "thisPageNumber");
thisPage.textContent = "Page " + current_page + " of " + roundnewpage;
poemParagraph.appendChild(thisPage);
if (current_page == 0) {
    prevbtn.style.display = 'none';
};
if (current_page == roundnewpage) {
    nextbtn.style.display = 'none';
}
document.getElementById("nextButton").addEventListener("click", function () {
    if (current_page < roundnewpage) {
        current_page++;
        getList(data);
    }}
);
document.getElementById("prevButton").addEventListener("click", function () {
    if (current_page > 0) {
        current_page--;
        getList(data);
    }
});
};

    


//console.log(listItem); // list item that contains the href within it. 
//console.log(listItem.textContent); // the text of href titles from within the list

        (function (index) {

            // add click event listeners to each anchor tage to handle the selection
            link.addEventListener("click", function (e) {
                // prevent default link behavior
                e.preventDefault();
                populatePoem(data[index]);
                // pass the selected poem object tho the populated function 
            });

        })(i);
    }
};

function displayListPoem(items, title, rows_per_page, page) {
    title.innerHTML = "";
   //page--;
    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);
    console.log(paginatedItems);
    for (let i = 0; i < paginatedItems.length; i++) {
        poemParagraph.textContent = paginatedItems;
        }
    }
*/

//add the populatePoem function to set the selected poem lines in the poemParagraph
function populatePoem(poemObject) {
    var linebreak = "<br>";
    poemTitle.textContent = poemObject.title;
    poetName.textContent = poemObject.author;
    //poemParagraph.textContent = poemObject.lines;
    poemParagraph.innerHTML = poemObject.lines.join(linebreak);
    localStorage.setItem("Poem Title", poemObject.title)
    localStorage.setItem("Poet Name", poemObject.author)
    // making back button & appending it w functionality
    var backButton = document.createElement('button');
    var linebreakelement = document.createElement('br');
    backButton.classList.add("Button");
    backButton.textContent = "Back";
    // add event listener
    backButton.addEventListener('click', function () {

        poemParagraph.textContent = "";
        poemTitle.textContent = poemObject.author;
        poetName.textContent = "";
        getList(linkList)
    });
    // making parent element

    poemParagraph.appendChild(linebreakelement);
    poemParagraph.appendChild(backButton);

}

function getLocalStorage() {

    var storage = localStorage.getItem("Poem Title");
    var pstoragename = localStorage.getItem("Poet Name");
    console.log(pstoragename)
    if (storage) {
        poemParagraph.style.visibility="visible"
        var storeUrl = requestUrl + "/author,title/" + pstoragename + ";" + storage;
        console.log(storeUrl)
        fetch(storeUrl)
            .then(function (response) {
                if (response.status === 200) {
                    return response.json()

                        .then(function (data) {
                            // if (data.status === 200) {
                            //console.log(data[0].lines)
                            poemTitle.textContent = data[0].title;
                            poetName.textContent = data[0].author;
                            poemParagraph.textContent = data[0].lines;
                            //} else {
                            //   console.log("no previous stored poem for display")
                            //   return;
                            // }
                        });
                }
            })
    } else {
        return;
    }
};

//poemParagraph.textContent = storage;

getLocalStorage();
