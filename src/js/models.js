import axios from 'axios';

//Search object to get object from input and search in API
export class Search {
	constructor(query, page){
		this.query = query;
		this.page = page;
	}
	
	// gets results after searching in API
	async getRes() { 
		try{
			const apiKey = 'f8ba42d0';
			const res = await axios(`https://www.omdbapi.com/?s=${this.query}&page=${this.page}&apikey=${apiKey}`);
			this.results = res.data.Search;
		}catch(err){
			alert(err);
		}
	}
}

// Description object to get the description of movie from API
export class Desc {
	constructor(id){
		this.id = id;
		this.rate='';
	}
	
	// Gets the description of the movie from given imdb
	async getDes() { 
		try{
			const apiKey = 'f8ba42d0';
			const res = await axios(`https://www.omdbapi.com/?apikey=${apiKey}&i=${this.id}`);
			this.res = res.data;
		}catch(err){
			alert(err);
		}
	}
}

// Liked object that stores liked movies in an array
export class Liked {
	constructor() {
		this.liked = [];
	}

	// finds if movie is in array
	isLiked(id){
		return(this.liked.findIndex(e => e.id === id) !== -1);
	}

	// stores liked list in local storage - in case page refreshes
	rememberLikeList(){
		localStorage.setItem('liked', JSON.stringify(this.liked))
	}

	// reads liked list from local storage and updates state
	readRemembered(){
		const saved = JSON.parse(localStorage.getItem('liked'));
		if (saved){
			this.liked = saved;
		}
	}

	// adds a movie to liked list
	addLike(id, title, year, poster){
		const like = {id, title, year, poster};
		this.liked.push(like);
		this.rememberLikeList();
		return like;
	}

	// removes a movie from the liked list
	removeLike(id){
		var like = this.liked.findIndex(e => e.id === id)
		this.liked.pop(like);
		this.rememberLikeList();
	}
}

// stores the user's search into memory in session storage - in case page refreshes
export const remSearch = (storeinfo)=>{
	window.sessionStorage.setItem('search', JSON.stringify(storeinfo));
}

// reads searched from session storage and updates state
export const searchMem = (state)=>{
	const saved = JSON.parse(sessionStorage.getItem('search'));
		if (saved){
			state.searchInfo = saved;
		}
}

// removes search from session storage
export const clearSearch = ()=>{
	sessionStorage.removeItem('search');
}
