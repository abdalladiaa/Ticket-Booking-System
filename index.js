let movies = [
  {
    id: 1,
    movieName: "Avengers",
    movieRating: 8.0,
    movieImage: "./assets/Avengers.jpg",
    movieGenre: "Action",
    movieDuration: "2h 23m",
  },
  {
    id: 2,
    movieName: "Interstellar",
    movieRating: 8.7,
    movieImage: "./assets/Interstellar.jpg",
    movieGenre: "Sci-Fi",
    movieDuration: "2h 49m",
  },
  {
    id: 3,
    movieName: "The Dark Knight",
    movieRating: 9.0,
    movieImage: "./assets/The-Dark-Knight.jpg",
    movieGenre: "Action",
    movieDuration: "2h 32m",
  },
  {
    id: 4,
    movieName: "Inception",
    movieRating: 8.8,
    movieImage: "./assets/Inception.jpg",
    movieGenre: "Sci-Fi",
    movieDuration: "2h 28m",
  },
];

let moviesGrid = document.querySelector(".movies-grid");
let cart = {}; 

function getMovieCard(movie) {
  let isInCart = cart[movie.id] ? true : false;

  return `
    <article class="movie-card">
      <div class="movie-image">
        <img src="${movie.movieImage}" alt="${movie.movieName}">
        <span class="movie-rating">
          <i class="fa-solid fa-star"></i>
          ${movie.movieRating}
        </span>
      </div>

      <div class="movie-info">
        <h3>${movie.movieName}</h3>

        <div class="movie-meta">
          <span>${movie.movieGenre}</span>
          <span>•</span>
          <span>${movie.movieDuration}</span>
        </div>

        <button class="btn primary select-movie ${isInCart ? "text-green" : ""}" data-id="${movie.id}">
          ${isInCart ? "Movie Added" : "Select Movie"}
        </button>
      </div>
    </article>
  `;
}

function displayMoviesCards() {
  moviesGrid.innerHTML = "";

  movies.forEach((movie) => {
    moviesGrid.innerHTML += getMovieCard(movie);
  });

  let selectMovieBtns = document.querySelectorAll(".select-movie");

  selectMovieBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let movieId = parseInt(e.target.getAttribute("data-id"));
      
      if (cart[movieId]) {
        delete cart[movieId]; 
      } else {
        let clickedMovie = movies.find((m) => m.id === movieId);
        cart[movieId] = clickedMovie;
      }

      displayMoviesCards();
      
      document.getElementById("cart-count").innerText = Object.keys(cart).length;
    });
  });
}

displayMoviesCards();


let cartBtn = document.getElementById("cart-btn");
let home = document.getElementById("home");
let movieSection = document.getElementById("movies");
let booking = document.getElementById("booking");
let cartItem = document.getElementById("cart-items");
let backToMoviesBtn = document.getElementById("back-to-movies");
let cartActions = document.getElementById("cart-actions");
let confirmBtn = document.getElementById("confirm-booking");

cartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  home.classList.add("hidden");
  movieSection.classList.add("hidden");
  booking.classList.remove("hidden");

  booking.style.backgroundColor = "#0e0e0e";
  booking.style.minHeight = "100vh";
  booking.style.paddingTop = "8rem";

  if (Object.keys(cart).length > 0) {
    cartItem.innerHTML = "";
    
    Object.values(cart).forEach((movie) => {
      cartItem.innerHTML += getMovieCard(movie);
    });
    cartActions.style.display = "block";
  } else {
    cartItem.innerHTML = "<h3>No movies selected yet. Please go back and select some.</h3>";
    cartActions.style.display = "none";
  }
});

backToMoviesBtn.addEventListener("click", () => {
  home.classList.remove("hidden");
  movieSection.classList.remove("hidden");
  booking.classList.add("hidden");
  displayMoviesCards();
});

confirmBtn.addEventListener("click", () => {
  if (Object.keys(cart).length > 0) {
    
    movies = movies.filter((movie) => !cart[movie.id]);

    cart = {};
    document.getElementById("cart-count").innerText = "0";

    alert("Booking Confirmed Successfully!");

    displayMoviesCards();
    home.classList.remove("hidden");
    movieSection.classList.remove("hidden");
    booking.classList.add("hidden");
  }
});