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
    <p><img src="assets/calender-icon.svg" alt="calendar-icon"/>${
      item.seasons
    } seasons</p>
    <span>${genreButtons}</span>
    <small>${formatDate(item.updated)}</small>
  `;

  card.addEventListener("click", () => onClick(item));
  return card;
}
