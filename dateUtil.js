export function formatDate(datestr) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(datestr).toLocaleDateString("en-US", options);
}
