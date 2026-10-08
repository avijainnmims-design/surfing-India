const spots = [
  { id: "mulki", name: "Mulki", region: "Karnataka", type: "spot", x: 28, y: 31, note: "Gentle, forgiving waves" },
  { id: "panambur", name: "Panambur", region: "Mangalore · Karnataka", type: "spot", x: 26, y: 28, note: "Open beach break" },
  { id: "varkala", name: "Varkala", region: "Kerala", type: "spot", x: 40, y: 80, note: "Cliffside point breaks" },
  { id: "kovalam-kerala", name: "Kovalam", region: "Kerala", type: "spot", x: 43, y: 85, note: "Lighthouse Beach waves" },
  { id: "covelong", name: "Covelong", region: "Tamil Nadu", type: "spot", x: 74, y: 36, note: "East coast surf village" },
  { id: "mahabalipuram", name: "Mahabalipuram", region: "Tamil Nadu", type: "spot", x: 76, y: 33, note: "Long rides by the temples" },
  { id: "surf-brothers", name: "Surf Brothers", region: "Mulki · Karnataka", type: "school", x: 29, y: 31, note: "Google 5.0 · 119 reviews", url: "https://www.gocareless.in/schools" },
  { id: "sassha", name: "Sassha Surf School", region: "Mulki · Karnataka", type: "school", x: 31, y: 32, note: "Google 4.9 · 71 reviews", url: "https://www.gocareless.in/schools" },
  { id: "panambur-school", name: "Panambur Surfschool", region: "Mangalore · Karnataka", type: "school", x: 25, y: 27, note: "Google 4.8 · 47 reviews", url: "https://www.gocareless.in/schools" },
  { id: "elixir", name: "Elixir Surf School", region: "Varkala · Kerala", type: "school", x: 42, y: 78, note: "Google 5.0 · 645 reviews", url: "https://www.gocareless.in/schools" },
  { id: "moana", name: "Moana Surf Club", region: "Varkala · Kerala", type: "school", x: 38, y: 81, note: "Google 4.9 · 1,276 reviews", url: "https://moanasurfschool.in/" },
  { id: "copa", name: "Copa Cabana Surf School", region: "Varkala · Kerala", type: "school", x: 41, y: 83, note: "Google 5.0 · 337 reviews", url: "https://www.gocareless.in/schools" },
  { id: "mahalo", name: "Mahalo Surf", region: "Varkala · Kerala", type: "school", x: 43, y: 79, note: "Google 5.0 · 351 reviews", url: "https://www.gocareless.in/schools" },
  { id: "mahabs-school", name: "Mahabs Surf And Stay", region: "Mahabalipuram · Tamil Nadu", type: "school", x: 78, y: 31, note: "Google 5.0 · 57 reviews", url: "https://www.gocareless.in/schools" },
  { id: "murthy", name: "Murthy Surf School", region: "Covelong · Tamil Nadu", type: "school", x: 72, y: 38, note: "Google 5.0 · 373 reviews", url: "https://surfadda.com/schools/murthy-surf-school" },
  { id: "bay-of-life", name: "Bay of Life", region: "Covelong · Tamil Nadu", type: "school", x: 75, y: 41, note: "Google 4.8 · 1,543 reviews", url: "https://surfadda.com/schools/bay-of-life" },
  { id: "surf-turf", name: "Surf Turf", region: "Covelong · Tamil Nadu", type: "school", x: 77, y: 35, note: "Google 4.3 · 1,360 reviews", url: "https://www.surfturf.in/" }
];

const schools = [
  { name: "Surf Brothers", place: "Mulki · Karnataka", rating: "5.0", reviews: "119 reviews", about: "Friendly coaching in India's original surf hub.", url: "https://www.gocareless.in/schools" },
  { name: "Sassha Surf School", place: "Mulki · Karnataka", rating: "4.9", reviews: "71 reviews", about: "A relaxed place to get comfortable in the water.", url: "https://www.gocareless.in/schools" },
  { name: "Panambur Surfschool", place: "Mangalore · Karnataka", rating: "4.8", reviews: "47 reviews", about: "Local lessons near Mangalore's open beach.", url: "https://www.gocareless.in/schools" },
  { name: "Elixir Surf School", place: "Varkala · Kerala", rating: "5.0", reviews: "645 reviews", about: "Popular Varkala coaches for a first surf.", url: "https://www.gocareless.in/schools" },
  { name: "Moana Surf Club", place: "Varkala · Kerala", rating: "4.9", reviews: "1,276 reviews", about: "Experienced local surfers and friendly lessons.", url: "https://moanasurfschool.in/" },
  { name: "Copa Cabana Surf School", place: "Varkala · Kerala", rating: "5.0", reviews: "337 reviews", about: "Surf lessons with a laid-back coastal feel.", url: "https://www.gocareless.in/schools" },
  { name: "Mahalo Surf", place: "Varkala · Kerala", rating: "5.0", reviews: "351 reviews", about: "A welcoming option for trying your first wave.", url: "https://www.gocareless.in/schools" },
  { name: "Mahabs Surf And Stay", place: "Mahabalipuram · Tamil Nadu", rating: "5.0", reviews: "57 reviews", about: "Coaching and a stay beside the east coast.", url: "https://www.gocareless.in/schools" },
  { name: "Murthy Surf School", place: "Covelong · Tamil Nadu", rating: "5.0", reviews: "373 reviews", about: "Local-led lessons from a pioneer of the scene.", url: "https://surfadda.com/schools/murthy-surf-school" },
  { name: "Bay of Life", place: "Covelong · Tamil Nadu", rating: "4.8", reviews: "1,543 reviews", about: "Surfing and ocean literacy at sheltered Kovalam.", url: "https://surfadda.com/schools/bay-of-life" }
];

const pins = document.querySelector("#map-pins");
const list = document.querySelector("#place-list");
const count = document.querySelector("#spot-count");
let activeFilter = "all";
let selectedId = "varkala";

function filteredPlaces() { return spots.filter(item => activeFilter === "all" || item.type === activeFilter); }
function renderPlaces() {
  const items = filteredPlaces();
  count.textContent = `${String(items.length).padStart(2, "0")} ${activeFilter === "school" ? "SCHOOLS" : activeFilter === "spot" ? "SPOTS" : "PLACES"}`;
  pins.replaceChildren(); list.replaceChildren();
  items.forEach((item, index) => {
    const pin = document.createElement("button");
    pin.className = `map-pin ${item.type}${item.id === selectedId ? " selected" : ""}${item.x > 64 ? " left-label" : ""}`;
    pin.style.left = `${item.x}%`; pin.style.top = `${item.y}%`; pin.type = "button";
    pin.setAttribute("aria-label", `${item.name}, ${item.type === "spot" ? "surf spot" : "surf school"} in ${item.region}`);
    pin.innerHTML = `<span class="pin-core"></span><span class="pin-label">${item.name}</span>`;
    pin.addEventListener("click", () => { selectedId = item.id; renderPlaces(); });
    pins.append(pin);
    const row = document.createElement("div");
    row.className = `place-item${item.id === selectedId ? " is-active" : ""}`; row.tabIndex = 0; row.setAttribute("role", "button");
    row.innerHTML = `<span class="place-number">${String(index + 1).padStart(2, "0")}</span><span><span class="place-name">${item.name}</span><span class="place-meta">${item.region} · ${item.note}</span></span><span class="place-tag">${item.type.toUpperCase()}</span>`;
    row.addEventListener("click", () => { selectedId = item.id; renderPlaces(); });
    row.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectedId = item.id; renderPlaces(); } });
    list.append(row);
  });
}

document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
  if (!filteredPlaces().some(item => item.id === selectedId)) selectedId = filteredPlaces()[0]?.id;
  renderPlaces();
}));

const schoolGrid = document.querySelector("#school-grid");
schools.forEach((school, index) => {
  const card = document.createElement("article"); card.className = "school-card";
  card.innerHTML = `<div class="school-card-head"><span class="school-loc">${school.place}</span><span class="school-star">★ ${school.rating}</span></div><h3>${school.name}</h3><p>${school.about}</p><div class="school-card-foot"><span><strong>${school.rating}</strong> · ${school.reviews}</span><a href="${school.url}" target="_blank" rel="noopener" aria-label="Check ${school.name} details">Details ↗</a></div>`;
  schoolGrid.append(card);
});
renderPlaces();

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const heroPhoto = document.querySelector(".hero-photo");
const useRemotePhoto = () => {
  if (!heroPhoto.dataset.fallbackUsed && heroPhoto.dataset.fallback) {
    heroPhoto.dataset.fallbackUsed = "true";
    heroPhoto.src = heroPhoto.dataset.fallback;
  }
};
heroPhoto.addEventListener("error", useRemotePhoto);
if (heroPhoto.complete && heroPhoto.naturalWidth === 0) useRemotePhoto();
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false"); menuToggle.setAttribute("aria-label", "Open menu");
}));

