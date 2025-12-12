const STORAGE_KEY = "projects";

const getProjects = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const saveProjects = (data) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

// Take project ID from URL
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

// Select form fields
const form = document.getElementById("editProjectForm");
const titleInput = document.getElementById("titleProject");
const startInput = document.getElementById("startDate");
const endInput = document.getElementById("endDate");
const descInput = document.getElementById("description");
const langInput = document.getElementById("language");
const previewImage = document.getElementById("previewImage");

// Load existing project
const projects = getProjects();
const project = projects.find((p) => p.id === projectId);

if (!project) {
  alert("Project not found!");
  window.location.href = "my-project.html";
}

// Populate form
titleInput.value = project.title;
startInput.value = project.startDate;
endInput.value = project.endDate;
descInput.value = project.description;
langInput.value = project.language;
previewImage.src =
  project.imageSrc || "https://via.placeholder.com/400x200?text=No+Image";

// Submit changes
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const file = document.getElementById("uploadImage").files[0];

  const update = () => {
    project.title = titleInput.value;
    project.startDate = startInput.value;
    project.endDate = endInput.value;
    project.description = descInput.value;
    project.language = langInput.value;

    saveProjects(projects);
    alert("Project updated successfully!");
    window.location.href = "my-project.html";
  };

  // If new image is uploaded
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      project.imageSrc = ev.target.result;
      update();
    };
    reader.readAsDataURL(file);
  } else {
    update();
  }
});
