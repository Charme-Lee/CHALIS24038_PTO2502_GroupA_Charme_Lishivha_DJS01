// add imports
import { podcasts, genres } from "./data.js";
import { createModalController } from "./components/createModal.js";
import { createGrid } from "./views/createGrid.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("data-container");
  const modalController = createModalController();

  createGrid(container, podcasts, genres, modalController);
});
