const video = document.querySelector("#introVideo");
const videoScene = document.querySelector(".video-scene");
const posterScene = document.querySelector(".poster-scene");
const posterImage = document.querySelector("#posterImage");
const rippleLayer = document.querySelector(".ripple-layer");
const playFallback = document.querySelector("#playFallback");
const prevPoster = document.querySelector("#prevPoster");
const nextPoster = document.querySelector("#nextPoster");
const pageIndicator = document.querySelector("#pageIndicator");

const posters = [
  {
    src: "./assets/poster-1.png",
    alt: "抑郁症与躯体化：定义、症状与影响因素",
  },
  {
    src: "./assets/poster-2.png",
    alt: "抑郁症与躯体化：预防、支持与求助",
  },
];

let transitioned = false;
let posterIndex = 0;

function updatePosterControls() {
  pageIndicator.textContent = `${posterIndex + 1} / ${posters.length}`;
  prevPoster.disabled = posterIndex === 0;
  nextPoster.disabled = posterIndex === posters.length - 1;
}

function showPoster(index) {
  const nextIndex = Math.max(0, Math.min(posters.length - 1, index));
  if (nextIndex === posterIndex && posterImage.src.includes(posters[nextIndex].src.replace("./", ""))) {
    updatePosterControls();
    return;
  }

  posterIndex = nextIndex;
  posterImage.classList.add("is-switching");
  window.setTimeout(() => {
    posterImage.src = posters[posterIndex].src;
    posterImage.alt = posters[posterIndex].alt;
    updatePosterControls();
    posterImage.classList.remove("is-switching");
  }, 160);
}

function revealPoster() {
  if (transitioned) return;
  transitioned = true;
  playFallback.classList.remove("is-visible");
  showPoster(0);
  posterScene.classList.add("is-revealed");
  rippleLayer.classList.add("is-active");
  videoScene.classList.add("is-fading");
}

async function startVideo() {
  try {
    video.muted = false;
    video.volume = 1;
    await video.play();
    playFallback.classList.remove("is-visible");
  } catch {
    playFallback.classList.add("is-visible");
  }
}

video.addEventListener("ended", revealPoster);
video.addEventListener("error", revealPoster);
playFallback.addEventListener("click", startVideo);
prevPoster.addEventListener("click", () => showPoster(posterIndex - 1));
nextPoster.addEventListener("click", () => showPoster(posterIndex + 1));

window.addEventListener("keydown", (event) => {
  if (!transitioned && (event.key === "Enter" || event.key === " ")) {
    startVideo();
  } else if (transitioned && event.key === "ArrowLeft") {
    showPoster(posterIndex - 1);
  } else if (transitioned && event.key === "ArrowRight") {
    showPoster(posterIndex + 1);
  }
});

updatePosterControls();
startVideo();
