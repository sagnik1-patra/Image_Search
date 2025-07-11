const ACCESS_KEY = "W4v9VltzX1_kxwFQp0gdeVRzHMB_KPgovYSY5KhD19g"; // Replace with your Unsplash API access key
let page = 1;
let currentQuery = "";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const loadMoreBtn = document.getElementById("load-more-btn");
const imageGrid = document.getElementById("image-grid");
const refreshBtn = document.getElementById("refresh-btn");
const toggleThemeBtn = document.getElementById("toggle-theme");

async function searchImages(query, reset = false) {
  if (reset) {
    imageGrid.innerHTML = "";
    page = 1;
  }
  const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=${ACCESS_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.results.length === 0 && page === 1) {
      imageGrid.innerHTML = "<p>No images found.</p>";
      return;
    }
    displayImages(data.results);
    page++;
  } catch (error) {
    console.error("Error fetching images:", error);
    imageGrid.innerHTML = "<p>Error loading images. Please try again.</p>";
  }
}

function displayImages(images) {
  images.forEach(img => {
    const card = document.createElement("div");
    card.classList.add("image-card");
    card.innerHTML = `
      <img src="${img.urls.small}" alt="${img.alt_description || 'Unsplash Image'}" loading="lazy">
      <div class="image-info">
        <p>${img.alt_description || "No description"}</p>
        <p>📸 <a href="${img.user.links.html}" target="_blank">${img.user.name}</a></p>
        <p><a href="${img.links.download}" target="_blank">⬇ Download</a></p>
      </div>
    `;
    imageGrid.appendChild(card);
  });
}

searchBtn.addEventListener("click", () => {
  currentQuery = searchInput.value.trim();
  if (currentQuery) searchImages(currentQuery, true);
});

searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    currentQuery = searchInput.value.trim();
    if (currentQuery) searchImages(currentQuery, true);
  }
});

loadMoreBtn.addEventListener("click", () => {
  if (currentQuery) searchImages(currentQuery);
});

refreshBtn.addEventListener("click", () => {
  if (currentQuery) searchImages(currentQuery, true);
});

toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
