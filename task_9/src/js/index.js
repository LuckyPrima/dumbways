document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addProject");
  const projectsContainer = document.getElementById("projectsContainer");

  const addProject = (project) => {
    const data = getProjects();
    data.push(project);
    saveProjects(data);
  };

  const deleteProject = (id) => {
    const filtered = getProjects().filter((p) => p.id !== id);
    saveProjects(filtered);
    renderProjects();
  };

  const truncate = (text, max) =>
    text.length > max ? text.substring(0, max) + "..." : text;

  // ==================================================
  // RENDER (MAP + FILTER READY)
  // ==================================================
  const renderProjects = (filterCallback = null) => {
    const filterLanguage = document.getElementById("filterLanguage");

    filterLanguage.addEventListener("change", () => {
      const value = filterLanguage.value;

      if (value === "") {
        renderProjects(); // No filter
      } else {
        renderProjects((p) => p.language === value);
      }
    });

    let projects = getProjects();

    // Optional Filter
    if (typeof filterCallback === "function") {
      projects = projects.filter(filterCallback);
    }

    projectsContainer.innerHTML = projects
      .map((p) => {
        return `
          <div class="bg-white rounded-xl shadow p-4 flex flex-col items-start">
            <img 
              src="${
                p.imageSrc ||
                "https://via.placeholder.com/400x200?text=No+Image"
              }"
              class="w-full h-40 object-cover rounded-md mb-4"
            />

            <h4 class="text-lg font-semibold mb-2">${p.title}</h4>

            <p class="text-sm text-gray-700 mb-3">
              ${truncate(p.description, 100)}
            </p>

            <p class="text-xs text-gray-500 mb-4">
              ${p.startDate} - ${p.endDate} · ${p.language}
            </p>

            <div class="mt-auto flex gap-2 w-full justify-center">
              <button
                class="flex-grow bg-slate-500 hover:bg-slate-700 text-white px-4 py-2 text-sm rounded-lg"
                onclick="window.location.href='project-details.html?id=${p.id}'"
              >
                Details
              </button>

              <button
                class="flex-grow bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 text-sm rounded-lg"
                onclick="editProject('${p.id}')"
              >
                Edit
              </button>

              <button
                class="flex-grow bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-lg"
                onclick="deleteProjectHandler('${p.id}')"
              >
                Delete
              </button>
            </div>
          </div>
        `;
      })
      .join("");
  };

  // ==================================================
  // DELETE HANDLER
  // ==================================================
  window.deleteProjectHandler = (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
    }
  };

  // ==================================================
  // EDIT HANDLER
  // ==================================================
  window.editProject = (id) => {
    window.location.href = `edit-project.html?id=${id}`;
  };

  // ==================================================
  // FORM SUBMIT
  // ==================================================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = crypto.randomUUID();
    const title = document.getElementById("titleProject").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const description = document.getElementById("description").value;
    const language = document.getElementById("language").value;

    const file = document.getElementById("uploadImage").files[0];

    const newProject = {
      id,
      title,
      startDate,
      endDate,
      description,
      language,
      imageSrc: null,
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        newProject.imageSrc = ev.target.result;
        addProject(newProject);
        renderProjects();
        form.reset();
      };
      reader.readAsDataURL(file);
    } else {
      addProject(newProject);
      renderProjects();
      form.reset();
    }
  });

  renderProjects();
});
