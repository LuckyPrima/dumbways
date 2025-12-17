// Get project ID from URL
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
const uploadInput = document.getElementById("uploadImage");

// Extract project ID from URL path
const pathId = window.location.pathname.split("/").pop();
const actualProjectId = projectId || pathId;

// Validation config
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

// Submit changes
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const res = await fetch(
    `/api/projects/${window.location.pathname.split("/").pop()}`,
    {
      method: "PUT",
      body: formData,
    }
  );

  if (res.ok) {
    alert("Project updated");
    window.location.href = "/myproject";
  }
});

// Handle image preview
uploadInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (file) {
    if (file.size > MAX_FILE_SIZE) {
      alert("Image size must be less than 2MB");
      uploadInput.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      previewImage.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
});
