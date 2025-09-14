// add imports
import { podcasts, genres } from "./data.js";
import { createModalController } from "./Modal.js";
import { createGrid } from "./CreateGrid.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("data-container");
  const modalController = createModalController();

  createGrid(container, podcasts, genres, modalController);
});
