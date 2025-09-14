import { formatDate } from "./dateUtil.js";
import { getGenreTitles } from "./GenreService.js";

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
}
