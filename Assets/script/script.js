


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
             poemTitle.textContent = data[0].title;
            poetName.textContent = data[0].author;
            poemParagraph.textContent = data[0].lines;
            // save the data of the first poem from the api response
            var poemData = data[0];
            // check if the entered author matches any author from api
           
            if(select ==="author"){
            removeTextFunction(data[0].author)
                
            }else{
                // if the search type is not author, update the poem title and author name normally
                poemParagraph.textContent = poemData.lines;
                poetName.textContent = poemData.author;
            }
           });  
        }
            //store the api response data in local storage
          



//Add event listener to button, function passes form info to API call function
document.getElementById("searchForm").addEventListener('submit', function(e) {
    //CHANGE THIS TO REFLECT THE FORM
    console.log('hi')
    e.preventDefault();
     // check if the selected search type is author 
     // if it is , sets content of paragraph with id of "poemParagraph" to an empty string
     var searchType = document.querySelector('input[name="searchType"]:checked').value;
    
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

// clear content function
            function removeTextFunction(authorName) {
            poemParagraph.textContent = "";
        // check if the entered input matches any author from the api response
              poemTitle.textContent = authorName;
              poetName.textContent = "";
    
    // check if the entered input matches any author from the api response
         
 }

  function getList(){
    
  }
 