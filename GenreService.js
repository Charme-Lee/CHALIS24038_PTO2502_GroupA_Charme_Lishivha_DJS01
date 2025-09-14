export function getGenreTitles(ids, genres) {
  return ids.map((id) => genres.find((g) => g.id === id)?.title || "Unknown");
}
