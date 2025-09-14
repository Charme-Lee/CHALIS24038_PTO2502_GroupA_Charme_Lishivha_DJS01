import { createPodcastCard } from "./RenderCards.js";

export function createGrid(container, podcasts, genres, modalController) {
  podcasts.forEach((item) => {
    const card = createPodcastCard(item, genres, (podcast) =>
      modalController.show(podcast, genres)
    );
    container.appendChild(card);
  });
}
