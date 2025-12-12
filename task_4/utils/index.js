document.addEventListener("DOMContentLoaded", function () {
  const sumbitAction = document.getElementById("addProject");

  if (!sumbitAction) {
    console.warn('Form with id "addProject" not found.');
    return;
  }

  const projectsContainer = document.getElementById("projectsContainer");
  if (!projectsContainer) {
    console.warn(
      'Container with id "projectsContainer" not found. Cards will not be displayed.'
    );
  }

  function buildCard({
    imageSrc,
    title,
    description,
    startDate,
    endDate,
    language,
  }) {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow p-4 flex flex-col items-start";

    const img = document.createElement("img");
    img.className = "w-full h-40 object-cover rounded-md mb-4";
    img.alt = title || "project image";
    img.src = imageSrc || "https://via.placeholder.com/400x240?text=No+Image";

    const h4 = document.createElement("h4");
    h4.className = "text-lg font-semibold mb-2";
    h4.textContent = title || "Untitled Project";

    const p = document.createElement("p");
    p.className = "text-sm text-gray-700 mb-3";
    p.textContent = description || "";

    const meta = document.createElement("div");
    meta.className = "text-xs text-gray-500 mt-auto";
    meta.textContent = `${startDate || "-"} — ${endDate || "-"} · ${
      language || ""
    }`;

    card.appendChild(img);
    card.appendChild(h4);
    card.appendChild(p);
    card.appendChild(meta);

    if (projectsContainer) projectsContainer.prepend(card);
  }

  sumbitAction.addEventListener("submit", function (e) {
    e.preventDefault();

    const titleProject = document.getElementById("titleProject")?.value || "";
    const startDate = document.getElementById("startDate")?.value || "";
    const endDate = document.getElementById("endDate")?.value || "";
    const description = document.getElementById("description")?.value || "";
    const language = document.getElementById("language")?.value || "";
    const uploadElem = document.getElementById("uploadImage");
    const uploadImage =
      uploadElem && uploadElem.files ? uploadElem.files[0] : null;

    // If there's an image file, read it as a data URL first
    if (uploadImage) {
      const reader = new FileReader();
      reader.onload = function (ev) {
        buildCard({
          imageSrc: ev.target.result,
          title: titleProject,
          description,
          startDate,
          endDate,
          language,
        });
      };
      reader.readAsDataURL(uploadImage);
    } else {
      // No image, build card with placeholder
      buildCard({
        imageSrc: null,
        title: titleProject,
        description,
        startDate,
        endDate,
        language,
      });
    }

    console.log({
      titleProject,
      startDate,
      endDate,
      description,
      language,
      uploadImage,
    });

    // Optionally reset the form (comment out if you want values kept)
    sumbitAction.reset();
  });
});
