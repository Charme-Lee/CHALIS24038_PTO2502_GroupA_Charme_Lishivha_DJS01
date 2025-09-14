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


function show(item, genres) {modalCover.src = item.image || "placeholder.jpg";
modalCover.alt = `${item.title} Cover`;
modalTitle.textContent = item.title;
modalDescription.textContent = item.description || "No description available";
modalUpdated.textContent = `Last updated: ${formatDate(item.updated)}`;
modalGenres.innerHTML = getGenreTitles(item.genres, genres)
  .map(g => `<button class="genre-button">${g}</button>`)
    .join( "" );}
  
modalSeasonList.innerHTML = "";
  for ( let i = 1; i <= item.seasons; i++ )
  {
    const seasonDiv = document.createElement( "div" );
    seasonDiv.className = "season-item";
    seasonDiv.innerHTML = `
    Season ${i}: Getting Started ${i}
    <span>${12 * i} episodes</span>
  `;
    modalSeasonList.appendChild( seasonDiv );
  
    modalOverlay.style.display = "block";
    modal.style.display = "block";
    document.body.classList.add( "modal-open" );


    function hide ()
    {
      modalOverlay.style.display = "none";
      modal.style.display = "none";
      document.body.classList.remove( "modal-open" );
    }
  
    modalClose.addEventListener( "click", hide );
    modalOverlay.addEventListener( "click", e =>
    {
      if ( e.target === modalOverlay ) hide();
    } );

    return { show, hide };
    const modalController = createModalController();
    modalController.show( item, genres ); // opens modal with content
    modalController.hide();             // closes modal
  }



