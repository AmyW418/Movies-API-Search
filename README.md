# Movies-API-Search

Uses Javascript, HTML, and CSS along with Webpack to create a website that interacts with The Open Movie Database API and the user interface.

Users will be able to search keywords to find a movie, read the description for a movie, keep track of liked movies, and view a list of movies recommended by me.
For this project, interaction with the API is implemented through async javascript and liked movies is stored in local storage so that the information will still be there even if the page is reloaded or closed.

The HTML file contains a very basic outline for the overall page and the CSS file specifies the formatting.

JavaScript follows the Model-View-Controller pattern:
  - model.js constructs and initializes the objects and classes for data and handles the set and get methods with local and session storage.
  - views.js interacts with the user interface to recieve and display information from and to the user.
  - index.js acts as the controller that contains all the event handlers and will call on the two previous files to get the information it needs and display it on the user interface accordingly. 
  
Project is not published.

Here is an example result and description page that is zoomed out so the whole page can be seen:
![alt text](https://github.com/AmyW418/Movies-API-Search/blob/main/MovieAPI.png?raw=true)
