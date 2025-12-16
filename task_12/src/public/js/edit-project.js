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
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const file = uploadInput.files[0];
  let imageSrc = previewImage.src;

  if (file && file.size > MAX_FILE_SIZE) {
    alert("Image size must be less than 2MB");
    return;
  }

  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      imageSrc = ev.target.result;
      updateProject(imageSrc);
    };
    reader.readAsDataURL(file);
  } else {
    updateProject(imageSrc);
  }
});

function updateProject(image) {
  const updatedData = {
    title: titleInput.value,
    startDate: startInput.value,
    endDate: endInput.value,
    description: descInput.value,
    language: langInput.value,
    imageSrc: image,
  };

  fetch(`/api/projects/${actualProjectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Project updated successfully!");
      window.location.href = "/myproject";
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Failed to update project");
    });
}

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
