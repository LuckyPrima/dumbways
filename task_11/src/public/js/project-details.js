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

window.deleteProject = (id) => {
  if (!confirm("Are you sure you want to delete this project?")) return;

  fetch(`/api/projects/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to delete project");
      return res.json();
    })
    .then(() => {
      window.location.href = "/myproject";
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Failed to delete project");
    });
};
