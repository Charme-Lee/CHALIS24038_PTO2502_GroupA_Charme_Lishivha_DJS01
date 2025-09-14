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
