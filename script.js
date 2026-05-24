const video = document.querySelector("#introVideo");
const videoScene = document.querySelector(".video-scene");
const posterScene = document.querySelector(".poster-scene");
const rippleLayer = document.querySelector(".ripple-layer");
const playFallback = document.querySelector("#playFallback");

let transitioned = false;

function revealPoster() {
  if (transitioned) return;
  transitioned = true;
  playFallback.classList.remove("is-visible");
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

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    startVideo();
  }
});

startVideo();
