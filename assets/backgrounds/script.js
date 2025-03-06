// Array of pixel fonts for title letters
const pixelFonts = [
  "'Press Start 2P', monospace",
  "'VT323', monospace",
  "'Share Tech Mono', monospace"
];

// Palette for UI elements (all elements except the Generate button)
const uiPalette = [
  "#FFFFFF", // white
  "#B0E0E6", // powder blue
  "#98FB98", // pale green
  "#FFFACD", // lemon chiffon
  "#FFB6C1"  // light pink
];

// Set random UI color on page load (applied to :root custom property)
function setRandomUIColor() {
  const randomColor = uiPalette[Math.floor(Math.random() * uiPalette.length)];
  document.documentElement.style.setProperty("--ui-color", randomColor);
}
setRandomUIColor();

// Initialize title text: each character wrapped in a span
function initTitle() {
  const titleText = "Robatic Geroinzo";
  const titleEl = document.getElementById("site-title");
  titleEl.innerHTML = "";
  for (let char of titleText) {
    const span = document.createElement("span");
    span.textContent = char;
    // Assign an initial random pixel font
    span.style.fontFamily = pixelFonts[Math.floor(Math.random() * pixelFonts.length)];
    titleEl.appendChild(span);
  }
}
initTitle();

// Slowly update one letter's font every few seconds
setInterval(() => {
  const letters = document.querySelectorAll("#site-title span");
  if (letters.length === 0) return;
  const index = Math.floor(Math.random() * letters.length);
  letters[index].style.fontFamily = pixelFonts[Math.floor(Math.random() * pixelFonts.length)];
}, 3000); // меняем раз в 3 секунды

// Helper function: get random number from 1 to max (inclusive)
function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

// Function to generate a poster based on one of three compositions
function generatePoster() {
  const poster = document.getElementById("poster");
  poster.innerHTML = ""; // очистить содержимое

  // Create background image element
  const bgImg = document.createElement("img");
  bgImg.className = "background";
  bgImg.src = `/assets/backgrounds/${getRandomNumber(5)}.png`; // 5 backgrounds

  // Create gradient overlay element
  const gradientOverlay = document.createElement("div");
  gradientOverlay.className = "gradient-overlay";

  // Create main image element (1080x1080)
  const mainImage = document.createElement("img");
  mainImage.className = "main-image";
  mainImage.src = `/assets/image/${getRandomNumber(16)}.png`; // 16 images

  // Create text overlay element (1080x1080)
  const textOverlay = document.createElement("img");
  textOverlay.className = "text-overlay";
  textOverlay.src = `/assets/text/${getRandomNumber(10)}.png`; // 10 texts

  // Choose random composition (1, 2, or 3)
  const compType = getRandomNumber(3);
  if (compType === 1) {
    // Composition 1: Classic – center main image, text at bottom
    poster.className = "poster composition1";
    poster.appendChild(bgImg);
    poster.appendChild(gradientOverlay);
    poster.appendChild(mainImage);
    poster.appendChild(textOverlay);
  } else if (compType === 2) {
    // Composition 2: Split – left: main image, right: text overlay
    poster.className = "poster composition2";
    poster.appendChild(bgImg);
    poster.appendChild(gradientOverlay);

    // Create container for two columns
    const leftCol = document.createElement("div");
    leftCol.className = "col";
    leftCol.appendChild(mainImage);

    const rightCol = document.createElement("div");
    rightCol.className = "col";
    rightCol.appendChild(textOverlay);

    const splitContainer = document.createElement("div");
    splitContainer.style.display = "flex";
    splitContainer.style.width = "100%";
    splitContainer.style.height = "100%";
    splitContainer.appendChild(leftCol);
    splitContainer.appendChild(rightCol);
    poster.appendChild(splitContainer);
  } else {
    // Composition 3: Overlapping – main image top-left, text bottom-right
    poster.className = "poster composition3";
    poster.appendChild(bgImg);
    poster.appendChild(gradientOverlay);
    poster.appendChild(mainImage);
    poster.appendChild(textOverlay);
  }
}

// Bind event to Generate button
document.getElementById("generate").addEventListener("click", generatePoster);

// Generate an initial poster when page loads
generatePoster();
