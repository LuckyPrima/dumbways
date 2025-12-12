const STORAGE_KEY = "projects";

const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

const container = document.getElementById("detailContainer");

function getProjects() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function calculateDuration(start, end) {
  const s = new Date(start);
  const e = new Date(end);

  const diffInMs = e - s;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays < 30) return `${Math.floor(diffInDays)} days`;

  return `${Math.floor(diffInDays / 30)} month`;
}

function renderDetail() {
  const projects = getProjects();
  const p = projects.find((item) => item.id === projectId);

  if (!p) {
    container.innerHTML =
      "<h2 class='text-center text-xl'>Project Not Found</h2>";
    return;
  }

  const duration = calculateDuration(p.startDate, p.endDate);

  container.innerHTML = `
    <div class="flex items-center justify-center py-24">
      <div class="w-full max-w-[70%]">
        <div class="bg-white shadow-xl rounded-2xl p-10 mt-10">
          <a href="../my-project.html" class="text-xl hover:text-gray-500">
            <i class="fa-solid fa-arrow-left"></i>
          </a>
          <h1 class="text-3xl font-semibold mb-8 py-4">${p.title}</h1>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <!-- LEFT: IMAGE + DESCRIPTION -->
            <div class="md:col-span-2">
              <img
                src="${p.imageSrc}"
                class="w-full max-w-[700px] h-auto object-contain rounded-lg shadow mb-6"
              />

              <p class="text-gray-700 leading-7 whitespace-pre-line">${p.description}</p>
            </div>

            <!-- RIGHT: SIDEBAR -->
            <div class="flex flex-col gap-8">
              <!-- Duration -->
              <div>
                <h2 class="text-xl font-semibold mb-2">Duration</h2>

                <div class="flex items-center gap-3 mb-2">
                  <i class="fa-solid fa-calendar-days text-xl"></i>
                  <span>${p.startDate} - ${p.endDate}</span>
                </div>

                <div class="flex items-center gap-3">
                  <i class="fa-solid fa-clock text-xl"></i>
                  <span>${duration}</span>
                </div>
              </div>

              <!-- Technologies -->
              <div>
                <h2 class="text-xl font-semibold mb-3">Technologies</h2>

                <div class="grid grid-cols-2 gap-3">
                  <div class="flex items-center gap-2">
                    <i class="fa-brands fa-js text-2xl text-yellow-500"></i>
                    <span>${p.language}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

renderDetail();
