// add imports
import { seasons, podcasts, genres } from "./data.js";
import { createModalController } from "./Modal.js";
import { createGrid } from "./CreateGrid.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("data-container");
  const modalController = createModalController();

  createGrid(container, podcasts, genres, modalController);
});

import { formatDate } from "./dateUtil.js";
import { getGenreTitles } from "./GenreService.js";

export function createPodcastCard(item, genres, onClick) {
  const card = document.createElement("div");
  card.className = "data-content";

  const genreButtons = getGenreTitles(item.genres, genres)
    .map((genre) => `<button class="genre-button">${genre}</button>`)
    .join("");

  card.innerHTML = `
    <img src="${item.image}" alt="${item.title} Cover Photo"/>
    <h3>${item.title}</h3>
    <p><img src="icons/calender-icon.svg" alt="calendar-icon"/>${
      item.seasons
    } seasons</p>
    <span>${genreButtons}</span>
    <small>${formatDate(item.updated)}</small>
  `;

  card.addEventListener("click", () => onClick(item));
  return card;
}

// Imports at the Top
import { formatDate } from "./dateUtil.js";
import { getGenreTitles } from "./GenreService.js";

// Get DOM Elements
export function createModalController() {
  const modalOverlay = document.getElementById("modal-overlay");
  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modal-close");
  const modalCover = document.getElementById("modal-cover");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalGenres = document.getElementById("modal-genres");
  const modalUpdated = document.getElementById("modal-updated");
  const modalSeasonList = document.getElementById("modal-season-list");

  // Show the Modal with data
  function show(item, genres, seasons = []) {
    // Set Cover Image and Title
    modalCover.src = item.image || "placeholder.jpg";
    modalCover.alt = `${item.title} Cover`;
    modalTitle.textContent = item.title;
    modalDescription.textContent =
      item.description || "No description available";
    modalUpdated.textContent = `Last updated: ${formatDate(item.updated)}`;

    // Show Genre Buttons
    modalGenres.innerHTML = getGenreTitles(item.genres, genres)
      .map((g) => `<button class="genre-button">${g}</button>`)
      .join("");

    // Generate Season Info
    modalSeasonList.innerHTML = "";

    const seasonData = seasons.find((s) => s.id === item.id);

    if (seasonData && Array.isArray(seasonData.seasonDetails)) {
      seasonData.seasonDetails.forEach((season, index) => {
        const seasonDiv = document.createElement("div");
        seasonDiv.className = "season-item";
        seasonDiv.innerHTML = `
          Season ${index + 1}: ${season.title}
          <span>${season.episodes} episodes</span>
        `;
        modalSeasonList.appendChild(seasonDiv);
      });
    } else {
      // fallback if no season data found
      for (let i = 1; i <= item.seasons; i++) {
        const seasonDiv = document.createElement("div");
        seasonDiv.className = "season-item";
        seasonDiv.innerHTML = `
          Season ${i}: Unknown
          <span>0 episodes</span>
        `;
        modalSeasonList.appendChild(seasonDiv);
      }
    }

    // Show modal
    modalOverlay.style.display = "block";
    modal.style.display = "block";
    document.body.classList.add("modal-open");
  }

  // Close the Modal
  function hide() {
    modalOverlay.style.display = "none";
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }

  // Close Event Listeners
  modalClose.addEventListener("click", hide);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) hide();
  });

  // Return the controller
  return { show, hide };
}

export function getGenreTitles(ids, genres) {
  return ids.map((id) => genres.find((g) => g.id === id)?.title || "Unknown");
}

export function formatDate(datestr) {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const now = new Date();
  const then = new Date(datestr);
  const diffInSeconds = Math.floor((then - now) / 1000);

  const divisions = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Infinity, name: "years" },
  ];

  let duration = diffInSeconds;
  for (let i = 0; i < divisions.length; i++) {
    if (Math.abs(duration) < divisions[i].amount) {
      return `Updated ${rtf.format(Math.round(duration), divisions[i].name)}`;
    }
    duration /= divisions[i].amount;
  }
}

import { createPodcastCard } from "./RenderCards";

export function createGrid(container, podcasts, genres, modalController) {
  podcasts.forEach((item) => {
    const card = createPodcastCard(item, genres, (podcast) =>
      modalController.show(podcast, genres)
    );
    container.appendChild(card);
  });
}
