import {Search, Desc, Liked, remSearch, searchMem, clearSearch} from './models';
import * as views from './views';

// Keeps track of current state of the webpage - search results, pages, description, etc
const state = {};

//Get input from search field
document.querySelector('.search').addEventListener('submit', e => {
	e.preventDefault();
	state.page = 1;
	const query = document.querySelector('.search__field').value;
	// clearRec();
	state.searchInfo = [query, state.page]
	remSearch(state.searchInfo);
	searchController(query);
});

// Search Controller - takes input value and searches for results in API
const searchController = async (query) => {
	
	if(query){
		state.search = new Search(query, state.page);
		
		try{
			await state.search.getRes();
			views.clearWelcome();
			views.clearResults();
			views.showResults(state.search.results);
			views.clearButtons();
			views.showButtons(state.page, state.search.results);
		}catch(err){
			alert (`Error searching for results`);
		}
	}
}

// Detect if user clicks on a change page button
document.querySelector('.pagebuttons').addEventListener('click', e =>{
	const btn = e.target.closest('.changepage');
	if(btn){
		const goto = parseInt(btn.dataset.goto,10);
		state.page = goto;
		state.searchInfo[1] = goto;
		searchController(state.searchInfo[0]);
		remSearch(state.searchInfo);
	}
});

// Description Controller - takes the imdbID of movie clicked, searches and displays movie info
const descriptionController = async () => {
	//Get ID from URL
	const id = window.location.hash.replace('#', '');

	if (id){

		if(state.search){
			// //Highlight selected item
			views.darkenSelected(id);
		}
		
		//Create new description object
		state.id = new Desc(id);
		
		try{
			// get description info
			await state.id.getDes();
			
			//get the ratings info to one string
			state.id.res.Ratings.forEach((so) => {
				views.desRating(so, state.id)});
			
			// render the description on UI
			views.showDes(state.id.res, state.id.rate);
			if(state.liked.isLiked(id)){
				views.toggleHeartBtn(true);
			}	
		} catch (err){
		}		
	}
}

// Detect if the "Recommended" button is clicked
document.querySelector('.rec_btn').addEventListener('click', e =>{
	recommendedController();
	clearSearch();
});

// Recommended Controller - displays list of movies recommended by me
const recommendedController = async () => {
	const recommendedMovies = ['tt3104988','tt5884052','tt0470752','tt0417299','tt0133093','tt1375666','tt6751668','tt5503686', 'tt4154756','tt4154796'];
	state.recs = [];
	//get information for movies with ids in reccomended Movies array
	for(var i = 0; i<10; i++){
		var id = recommendedMovies[i];
		state.id = new Desc(id);
		try{
			await state.id.getDes();
			state.recs.push(state.id.res);
		} catch (err){
		}
	}
	// display results
	views.clearResults();
	views.showResults(state.recs);
	views.clearButtons();
}

// If imdb changes in hash, description changes to corresponding imdb description
window.addEventListener('hashchange', descriptionController);

// Tracks if heart button on description page is clicked
document.querySelector('.description').addEventListener('click', e =>{
	if(e.target.matches('.heart_btn')){
		likedController();
	}
});

// Liked Movies Controller - keeps track of how many movies are liked and display them in a drop down list
const likedController = () => {
	if (!state.liked){
		state.liked = new Liked()
	}
	const movieID = window.location.hash.replace('#', '');

	// if not liked yet
	if(!state.liked.isLiked(movieID)){
		//add like to state
		const newLike = state.liked.addLike(movieID, state.id.res.Title, state.id.res.Year, state.id.res.Poster);
		views.toggleHeartBtn(true);
		views.showNewLike(newLike);

	}else{
		//already liked and want to remove
		state.liked.removeLike(movieID);
		views.toggleHeartBtn(false);
		views.removeLikeList(movieID);
	}
}

// reinitializes the state of the webpage after it is reloaded
window.addEventListener('load', () => {

	// Liked movies is readded from memory storage
	state.liked = new Liked();
	state.liked.readRemembered();
	state.liked.liked.forEach(like => views.showNewLike(like));
	document.querySelector('.liked_list').scroll();

	searchMem(state);

	if(state.searchInfo){ // searched list is readded from storage
		state.page = state.searchInfo[1];
		var query = state.searchInfo[0];
		searchController(query);
	}
	else{ // show welcome screen
		views.welcome();
	}
})