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

let order = {
  movie: null,
  ticketType: null,
  price: 0,
  quantity: 1,
};

const PRICES = {
  Standard: 150,
  VIP: 300,
};

let navCartBtnCount = document.getElementById("cart-count");

function getMovieCard(movie) {
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
        <button class="btn primary select-movie ${
          selectedMovie?.id === movie.id ? "text-green" : ""
        }">
          ${selectedMovie?.id === movie.id ? "Movie Added" : "Select Movie"}
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

  selectMovieBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (selectedMovie?.id === movies[index].id) {
        selectedMovie = null;
        order.movie = null;
      } else {
        selectedMovie = movies[index];
        order.movie = movies[index];
        order.ticketType = null;
        order.quantity = 1;
        order.price = 0;
      }

      displayMoviesCards();

      navCartBtnCount.innerText = selectedMovie ? "1" : "0";
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

cartBtn.addEventListener("click", () => {
  home.classList.add("hidden");
  movieSection.classList.add("hidden");
  booking.classList.remove("hidden");
  renderCart();
});

backToMoviesBtn.addEventListener("click", () => {
  home.classList.remove("hidden");
  movieSection.classList.remove("hidden");
  booking.classList.add("hidden");
});

function renderCart() {
  if (!order.movie) {
    cartItem.innerHTML =
      "<h3 style='color: white; text-align: center; width:100%; padding-top: 5rem;'>No movie selected yet. Please go back.</h3>";
    return;
  }

  cartItem.innerHTML = `
    <div class="booking-summary-container">
      <div class="selected-movie-wrapper">
        <div class="selected-movie-card">
          ${getMovieCard(order.movie)}
          ${
            order.ticketType
              ? `
          <div class="movie-counter">
            <div class="counter">
              <button id="quantity-decrease">-</button>
              <span id="quantity-value">${order.quantity}</span>
              <button id="quantity-increase">+</button>
            </div>
            <div class="counter-label">Tickets</div>
            <span id="total-price">${order.price * order.quantity} EGP</span>
          </div>
          `
              : ""
          }
        </div>
      </div>
      <div class="ticket-categories-wrapper">
          <h3 class="categories-title">Select Ticket Category</h3>
          <div class="ticket-categories">
            <div class="ticket-card ${order.ticketType === "Standard" ? "selected" : ""}" 
                 onclick="selectCategory('Standard')">
              ${order.ticketType === "Standard" ? '<div class="ribbon">SELECTED</div>' : ""}
              <div class="ticket-card-header">
                <div>
                    <h4>Standard</h4>
                    <span class="ticket-desc">Digital Projection</span>
                </div>
                <div class="radio-circle"></div>
              </div>
              <div class="ticket-card-footer">
                <span class="per-ticket">per ticket</span>
                <div class="price">
                  <span class="amount">${PRICES.Standard}</span>
                  <span class="currency">EGP</span>
                </div>
              </div>
            </div>
            <div class="ticket-card ${order.ticketType === "VIP" ? "selected" : ""}" 
                 onclick="selectCategory('VIP')">
              ${order.ticketType === "VIP" ? '<div class="ribbon">SELECTED</div>' : ""}
              <div class="ticket-card-header">
                <div>
                    <h4>VIP <span class="premium-badge">PREMIUM</span></h4>
                    <span class="ticket-desc">Recliner & Service</span>
                </div>
                <div class="radio-circle"></div>
              </div>
              <div class="ticket-card-footer">
                <span class="per-ticket">per ticket</span>
                <div class="price">
                  <span class="amount">${PRICES.VIP}</span>
                  <span class="currency">EGP</span>
                </div>
              </div>
            </div>
          </div>
      </div>
      <button id="confirm-btn" class="btn primary-btn confirm-booking-btn" ${order.ticketType ? "" : "disabled"}>Confirm Booking</button>
    </div>
  `;
  let quantityDecreaseBtn = document.getElementById("quantity-decrease");
  let quantityIncreaseBtn = document.getElementById("quantity-increase");
  let totalPriceSpan = document.getElementById("total-price");

  function allEnd() {
    home.classList.remove("hidden");
    movieSection.classList.remove("hidden");
    booking.classList.add("hidden");
    order = {
      movie: null,
      ticketType: null,
      price: 0,
      quantity: 1,
    };
    selectedMovie = null;
    displayMoviesCards();
    navCartBtnCount.innerHTML = "0";
  }

  if (quantityDecreaseBtn && quantityIncreaseBtn) {
    quantityDecreaseBtn.addEventListener("click", () => {
      if (order.quantity > 1) {
        order.quantity -= 1;
        renderCart();
      }
    });

    quantityIncreaseBtn.addEventListener("click", () => {
      order.quantity += 1;
      renderCart();
    });
  }

  const confirmBtn = document.getElementById("confirm-btn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      if (!order.ticketType) {
        alert(
          "Please select a ticket category (Standard or VIP) before confirming.",
        );
        return;
      }
      const totalPrice = order.price * order.quantity;
      alert(
        `Booking Confirmed! \nMovie: ${order.movie.movieName}\nCategory: ${order.ticketType}\nQuantity: ${order.quantity}\nTotal Price: ${totalPrice} EGP`,
      );
      allEnd();
    });
  }
}

let selectCategory = function (type) {
  order.ticketType = type;
  order.price = PRICES[type];
  renderCart();
};
