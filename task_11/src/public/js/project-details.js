document.addEventListener("DOMContentLoaded", () => {
  const start = document.body.dataset.start;
  const end = document.body.dataset.end;

  if (!start || !end) return;

  const durationText = document.getElementById("durationText");
  durationText.textContent = calculateDuration(start, end);
});

function calculateDuration(start, end) {
  const s = new Date(start);
  const e = new Date(end);

  const days = Math.ceil((e - s) / (1000 * 60 * 60 * 24));

  if (days < 30) return `${days} days`;

  const months = Math.floor(days / 30);
  const remaining = days % 30;

  return remaining === 0
    ? `${months} months`
    : `${months} months ${remaining} days`;
}
