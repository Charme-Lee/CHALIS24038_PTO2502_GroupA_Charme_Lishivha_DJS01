// Imports at the Top
import { formatDate } from "./dateUtil.js";
import { getGenreTitles } from "./GenreService.js";
import { seasons } from "./data.js";

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
  function show(item, genres, season = seasons) {
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

    // const seasonData = seasons.find( ( s ) => s.id === item.id );
    // const seasonData = seasons.find((s) => String( s.id ) === String( item.id ) );
    const seasonData = seasons.find((s) => String(s.id) === String(item.id));
    console.log(seasonData);

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
