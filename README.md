# Poem Dictionary App

## Application Created By-
* Ziad Alfadl
* Tyler Webster
* Angelin Rajan

## Application Overview
The Poem Dictionary App is an application created by our group for poetry enthusiasts and novices. It allows users to read poems by searching for their favorites or by generating random poems. In addition to reading poems, the application also aids in vocabulary improvement by providing word definitions, allowing users to better understand the poems. Our long-term goal is to include audio and author information to enhance the user experience as we advance through the boot camp.

## Website's Live URL -
https://angelinrajan.github.io/PoemApplication_GroupProject/

## Functionality of the website
* Upon visiting the website, users will encounter:
    1. The website's title
    2. A search box
        - An input field allowing users to enter the name of a poet or the title of a poem they wish to search for
        - Radio buttons to select either "poet" or "poem" to define the input value
        - A submit button to execute the search
        - A random button to generate a random poem
    3. A placeholder poem displaying sections for the poem title, poet, and the poem (unless a previous search has been made)
    4. Instructions on how to view definitions
    5. Links to the APIs used within the application
* If the user searches by poem name, selects the corresponding "Poem" radio button, and clicks submit, the poem will be fetched using an API call and displayed on the screen.
* If the user searches by poet name, selects the corresponding "Poet" radio button, and clicks submit, a list of poems written by the searched poet will be fetched using an API call, and the first 10 poem titles will be displayed on the screen.
* When the user selects a poem from the displayed list, the poem with the selected title will be shown on the screen along with a back button.
* Clicking the back button will navigate the user back to the poem list for the searched poet.
* Clicking the random poem button will generate a random poem and display it on the screen.
* Double-clicking on a word will provide the user with its definition, and clicking anywhere on the page will close the definition box.
* The most recently viewed poem is stored in the client's local storage and will be displayed on the screen upon page load or refresh.

## Deployment steps
1. Created a new repository on GitHub, including a README file.
2. Granted access to other group members by navigating to the repository's settings, selecting "Collaborators," and adding them.
3. Each team member copied the SSH URL for cloning the repository.
4. Performed a Git clone command in our local environment (e.g., VS Code) using the copied SSH URL.
5. Created a project board on GitHub to track the project's progress.
6. Shared access to the project board with each team member.
7. Created tasks on the project board based on functionality and assigned them to team members.
8. Each team member created branches for their respective work.
9. Regularly committed and pushed changes to keep the branches up to date within the GitHub repository.
10. As functionalities were completed, tasks on the project board were transitioned from "in-progress" to "in-review" and finally marked as "done".
11. Merged branches into the main branch to ensure it remains current.
12. Resolved conflicts that arose during branch merging.
13. After the final merge to the main branch, deployed the project from GitHub by navigating to the repository's settings, selecting "Pages," and choosing the main branch for deployment.
14. Tracked the progress and obtained the live website's URL within the Actions tab.
15. Clicking on the provided live website link directs users to the deployed website without any errors. (See screenshot below)




## API used
1. https://poetrydb.org
2. https://dictionaryapi.dev/

## Outside Resources-
* Readme format: https://github.com/tchapi/markdown-cheatsheet/blob/master/README.md
* Delete git branches: https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/delete-local-git-branch-origin-force-merge-all
* Pagination in js: https://www.youtube.com/watch?v=IqYiVHrO2U8
* Options for click event: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click
* Local Storage: https://www.w3schools.com/jsref/prop_win_localstorage.asp
* Stashing in gitbash: https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning
* Create element with attributes: https://bobbyhadz.com/blog/javascript-create-element-with-attributes
* Push into an array in js: https://www.freecodecamp.org/news/how-to-insert-an-element-into-an-array-in-javascript/
* local storage getitem: https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem
* Louis D'elia assisted us with pagination



