// This file contains HTML that is added to the project when the page changes

// Creates an entry a movie 
const resultsHTML = movie => {
	const markup = `
	<li>
        <a class="results_link" href="#${movie.imdbID}">
            <figure class="results_fig">
                <img src="${movie.Poster}" alt="Poster N/A">
            </figure>
        	<div class="results_data">
            	<h4 class="results_name">${movie.Title}</h4>
            	<p class="results_year">${movie.Year}</p>
        	</div>
        </a>
    </li>
	`;
	document.querySelector('.results_list').insertAdjacentHTML('beforeend', markup);
}

// Creates entry for every movie in search results array
export const showResults = async (movies) => {
	movies.forEach(resultsHTML);
}

// clears entries for search results
export const clearResults = () => {
	document.querySelector('.results_list').innerHTML = '';
}

// darkens the user selected movie from results list so it stands out more
export const darkenSelected = id => {
	const resArr = Array.from(document.querySelectorAll('.results_link'));
	resArr.forEach(e => {
		e.classList.remove('results_link-active');
	});
	document.querySelector(`.results_link[href="#${id}"]`).classList.add('results_link-active');
}

// HTML for displaying the description of each movie
const desHTML = (res, rate) => {
	const markup = `
	<div class="des_head">
					<h1 class='title'>${res.Title}</h1>
					<h3 class='rated'>Rated: ${res.Rated}  Runtime: ${res.Runtime}</h3> 
					<h3>Language: ${res.Language}</h3>
				</div>
				<figure class="des_fig">
					<img src="${res.Poster}" alt="Poster N/A">
				</figure>
				<div class='genreAndHeart'>
					<h4 class="genre">${res.Genre}  </h4>
					<button class='heart_btn'>♡</button>
				</div>
				<div class='des_res'>
					<p class="plot">
						<h3>${res.Plot}</h3>
						<b>Actors:</b> ${res.Actors}
						<br></br>
						<b>Directors:</b> ${res.Director}
						<br></br>
						<b>Productions:</b> ${res.Production}
						<br></br>
						<b>Awards:</b> ${res.Awards}
					</p>
					<br></br>
					<div class="ratings">
						<b>Ratings</b>
					</div>
					<table style="width:100%">
						${rate}
					</table>
					<br></br>
				</div>
	`;
	document.querySelector('.description').innerHTML = markup;
}

// Gets the description for each movie given imdb
export const showDes = async (res, rate) => {
	desHTML(res, rate);
}

// Combine the rating info into one string in state to help with generating UI
export const desRating = (rates, id) => {
	id.rate += `<tr>
	<td>${rates.Source}</td>
	<td>${rates.Value}</td>
	</tr>`;
}

// Creates the change page buttons
const createPageButtons = (page, type) => {
	const button = `
		<button class="changepage type--${type}" data-goto=${page}>
			<span>Page ${page}</span>
		</button>`;
	document.querySelector('.pagebuttons').insertAdjacentHTML('afterbegin', button)
}

// Decides whether prev or next button is needed from amount of results 
export const showButtons = (page, resultsArray) => {
	if(page === 1){
		if(resultsArray.length == 10){
			createPageButtons(page+1,'next')
		}
	} else if (page > 1 && page < 100){
		createPageButtons(page-1,'prev')
		if(resultsArray.length == 10){
			createPageButtons(page+1,'next')
		}
	} else if (page === 100){
		createPageButtons(page-1,'prev')
	}
}

// Removes the buttons from UI
export const clearButtons = () =>{
	document.querySelector('.pagebuttons').innerHTML = '';
}

// toggle the heart button depending whether or not movie is liked
export const toggleHeartBtn = (isLiked) => {
	if (isLiked){
		document.querySelector('.heart_btn').classList.add('active');
	}else{
		document.querySelector('.heart_btn').classList.remove('active');
	}	
}

// HTML code to display a liked movie in drop down list
export const showNewLike = (newLike) => {
	const markup = `
			<a class="liked_link" href="#${newLike.id}">
				<figure class="liked_fig">
					<img src="${newLike.poster}" alt="Poster N/A"> 
				</figure>
				<div class="liked_data">
					<h4 class="liked_name">${newLike.title}</h4>
					<p class="liked_year">${newLike.year}</p>
				</div>
			</a>`;
	document.querySelector('.liked_list').insertAdjacentHTML('beforeend', markup);
}

// removes the HTML code for a removed movie from drop down list
export const removeLikeList = (id) => {
	const e = document.querySelector(`.liked_link[href="#${id}"]`);
	if (e){
		e.parentElement.removeChild(e);
	}
}

// HTML code for welcome screen
export const welcome = () => {
	const markup = `
	<div> 
		<br></br>
		<h1> Welcome!</h1>
		<h3>You can search for a movie to get its description or 
		check out some movies recommended by me.</h3>
		<h3> Your liked movies will be kept even if you close the tab.
	</div>
	`;
	document.querySelector('.description').innerHTML = markup;
}

// clears welcome screen
export const clearWelcome = () => {
	document.querySelector('.description').innerHTML = '';
}