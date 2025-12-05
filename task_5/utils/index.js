document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addProject");

  if (!form) {
    console.warn('Form with id "addProject" not found.');
    return;
  }

  const projectsContainer = document.getElementById("projectsContainer");
  if (!projectsContainer) {
    console.warn(
      'Container with id "projectsContainer" not found. Cards will not be displayed.'
    );
  }

  const STORAGE_KEY = "projects";

  // ================================
  // LocalStorage Utils
  // ================================
  const getProjects = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const saveProjects = (data) =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  const addProject = (project) => {
    const data = getProjects();
    data.push(project);
    saveProjects(data);
  };

  // ================================
  // Trim Description Utility
  // ================================
  function truncate(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  // ================================
  // Render List (Looping)
  // ================================
  const renderProjects = () => {
    const projects = getProjects();

    projectsContainer.innerHTML = "";

    for (let i = 0; i < projects.length; i++) {
      const p = projects[i];

      const card = document.createElement("div");
      card.className =
        "bg-white rounded-xl shadow p-4 flex flex-col items-start";

      // Image
      const img = document.createElement("img");
      img.className = "w-full h-40 object-cover rounded-md mb-4";
      img.src =
        p.imageSrc || "https://via.placeholder.com/400x200?text=No+Image";
      img.alt = p.title;

      // Title
      const title = document.createElement("h4");
      title.className = "text-lg font-semibold mb-2";
      title.textContent = p.title;

      // Description
      const desc = document.createElement("p");
      desc.className = "text-sm text-gray-700 mb-3 trimmed-description";
      desc.textContent = truncate(p.description, 100);

      // Meta Information
      const meta = document.createElement("div");
      meta.className = "text-xs text-gray-500 mb-4";
      meta.textContext = `${p.startDate} - ${p.endDate} · ${p.language}`;

      // Buttons Detail
      const btn = document.createElement("button");
      btn.className =
        "mt-auto bg-slate-500 hover:bg-slate-700 text-white text-sm px-4 py-2 rounded-lg";
      btn.textContent = "Detail";

      btn.addEventListener("click", () => {
        window.location.href = `project-details.html?id=${p.id}`;
      });

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(meta);
      card.appendChild(btn);

      projectsContainer.appendChild(card);
    }
  };

  // ================================
  // Form Submit
  // ================================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("titleProject").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const description = document.getElementById("description").value;
    const language = document.getElementById("language").value;

    const uploadElem = document.getElementById("uploadImage");
    const file = uploadElem.files ? uploadElem.files[0] : null;

    const id = crypto.randomUUID();

    const newProject = {
      id,
      title,
      startDate,
      endDate,
      description,
      language,
      imageSrc: null, // Will be set after reading the file
    };

    // If there's an image file, read it as a data URL first
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        newProject.imageSrc = ev.target.result; // Base64 string
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

  // Initial render
  renderProjects();
});
