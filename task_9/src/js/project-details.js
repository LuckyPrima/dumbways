// Get project ID from URL
const pathId = window.location.pathname.split("/").pop();

// Calculate duration between dates
function calculateDuration(start, end) {
  const s = new Date(start);
  const e = new Date(end);

  const diffInMs = e - s;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays < 30) {
    return `${Math.ceil(diffInDays)} days`;
  }

  const months = Math.floor(diffInDays / 30);
  const remainingDays = Math.ceil(diffInDays % 30);

  if (remainingDays === 0) {
    return `${months} month${months > 1 ? "s" : ""}`;
  }

  return `${months} month${months > 1 ? "s" : ""} and ${remainingDays} days`;
}

// Render duration info
function renderDuration(project) {
  const durationText = document.getElementById("durationText");
  if (durationText) {
    durationText.textContent = calculateDuration(
      project.startDate,
      project.endDate
    );
  }
}

// Delete project
window.deleteProject = (id) => {
  if (confirm("Are you sure you want to delete this project?")) {
    fetch(`/api/projects/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Project deleted successfully!");
        window.location.href = "/myproject";
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Failed to delete project");
      });
  }
};

// On page load, calculate duration
document.addEventListener("DOMContentLoaded", function () {
  // Get project data from meta or from a data attribute
  const projectData = {
    startDate: document.body.getAttribute("data-start"),
    endDate: document.body.getAttribute("data-end"),
  };

  // If data is not in attributes, try to extract from page content
  const dateText = document.querySelector("span")?.textContent || "";
  if (dateText && dateText.includes("-")) {
    const dates = dateText.split(" · ")[0].split(" - ");
    if (dates.length === 2) {
      projectData.startDate = dates[0].trim();
      projectData.endDate = dates[1].trim();
      renderDuration(projectData);
    }
  }
});
