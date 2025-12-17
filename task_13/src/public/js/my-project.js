document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addProject");
  const projectsContainer = document.getElementById("projectsContainer");
  const filterLanguage = document.getElementById("filterLanguage");

  // Add new project
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("titleProject").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const description = document.getElementById("description").value;
    const language = document.getElementById("language").value;
    const file = document.getElementById("uploadImage").files[0];

    //validation image size
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

    if (file && file.size > MAX_FILE_SIZE) {
      alert("Image size must be less than 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("description", description);
    formData.append("language", language);
    if (file) formData.append("image", file);

    fetch("/api/projects", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Project added");
        form.reset();
        location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add project");
      });
  });

  // Filter by language
  filterLanguage.addEventListener("change", () => {
    const selectedLanguage = filterLanguage.value;
    const cards = document.querySelectorAll("[data-language]");

    if (selectedLanguage === "") {
      cards.forEach((card) => (card.style.display = "block"));
    } else {
      cards.forEach((card) => {
        if (card.dataset.language === selectedLanguage) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    }
  });

  // Delete project
  window.deleteProject = (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Project deleted:", data);
          location.reload();
        })
        .catch((err) => console.error("Error:", err));
    }
  };

  // Add data-language attribute to cards for filtering
  document.addEventListener("DOMContentLoaded", function () {
    const cards = projectsContainer.querySelectorAll("div[data-language]");
  });
});
