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
let selectedMovie = null;

function getMovieCard(movie) {
  return `
    <article class="movie-card">

      <div class="movie-image">
        <img src="${movie.movieImage}" alt="${movie.movieName}">

        <span class="movie-rating">
          <i class="fa-solid fa-star"></i>
          ${movie.movieRating}
        </span>

        <button class="movie-play">
          <i class="fa-solid fa-play"></i>
        </button>
      </div>

      <div class="movie-info">

        <h3>${movie.movieName}</h3>

        <div class="movie-meta">
          <span>${movie.movieGenre}</span>
          <span>•</span>
          <span>${movie.movieDuration}</span>
        </div>

        <button class="btn primary select-movie">
          Select Movie
        </button>

      </div>

    </article>
  `;
}

movies.forEach((movie) => {
  moviesGrid.innerHTML += getMovieCard(movie);
});

let selectMovieBtns = document.querySelectorAll(".select-movie");

selectMovieBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    selectedMovie = movies[index];
    console.log(selectedMovie);
  });
});
console.log(selectedMovie);

