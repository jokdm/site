// =========================
// WINAMP
// =========================

const playlist = [
    {
        file: "music/leningrad.mp3",
        artist: "Ленинград",
        title: "Money"
    },

    {
        file: "music/vorovaiki.mp3",
        artist: "Воровайки",
        title: "Гаси карманчики"
    },
    {
        file: "music/scooter.mp3",
        artist: "Scooter",
        title: "Fire"
    },
    {
        file: "music/brass.mp3",
        artist: "Herb Alpert & The Tijuana Brass",
        title: "A Banda"
    },
];

let currentTrack = 0;
let eqTimer = null;

const music = document.getElementById("music");
const eq = document.getElementById("eq");
const trackTitle = document.getElementById("track-title");
const trackSubtitle = document.getElementById("track-subtitle");


// =========================
// ЭКВАЛАЙЗЕР
// =========================

function startEqualizer() {
    if (eqTimer) return;

    const chars = ["▁", "▂", "▃", "▄", "▅", "▆", "▇"];

    eqTimer = setInterval(() => {
        eq.textContent = Array.from(
            {length: 14},
            () => chars[Math.floor(Math.random() * chars.length)]
        ).join("");
    }, 100);
}


function stopEqualizer() {
    clearInterval(eqTimer);
    eqTimer = null;

    eq.textContent = "▂▅▃▇▅▂▆▃▇▂▅";
}


// =========================
// ЗАГРУЗИТЬ ТРЕК
// =========================

function loadTrack(index) {
    currentTrack =
        (index + playlist.length) % playlist.length;

    const track = playlist[currentTrack];

    music.src = track.file;

    trackTitle.textContent = track.artist;
    trackSubtitle.textContent = track.title;

    stopEqualizer();

    console.log("Загружен трек:", track.file);
}


// =========================
// PLAY
// =========================

function playMusic() {

    console.log("PLAY:", music.src);

    music.play()
        .then(() => {
            console.log("Музыка запущена");
            startEqualizer();
        })
        .catch(error => {
            console.error("ОШИБКА PLAY:", error);
        });
}


// =========================
// PAUSE
// =========================

function pauseMusic() {
    music.pause();
    stopEqualizer();
}


// =========================
// STOP
// =========================

function stopMusic() {
    music.pause();
    music.currentTime = 0;
    stopEqualizer();
}


// =========================
// NEXT
// =========================

function nextTrack() {
    loadTrack(currentTrack + 1);
    playMusic();
}


// =========================
// PREVIOUS
// =========================

function previousTrack() {
    loadTrack(currentTrack - 1);
    playMusic();
}


// =========================
// КНОПКИ
// =========================

document
    .getElementById("play")
    .addEventListener("click", playMusic);

document
    .getElementById("pause")
    .addEventListener("click", pauseMusic);

document
    .getElementById("stop")
    .addEventListener("click", stopMusic);

document
    .getElementById("next")
    .addEventListener("click", nextTrack);

document
    .getElementById("prev")
    .addEventListener("click", previousTrack);


// =========================
// АВТО-СЛЕДУЮЩИЙ ТРЕК
// =========================

music.addEventListener("ended", () => {
    nextTrack();
});


// =========================
// ВХОД НА САЙТ
// =========================

function enterSite(encoding) {

    console.log("Выбрана кодировка:", encoding);

    document.getElementById("encoding-screen").style.display = "none";
    document.getElementById("site").style.display = "block";

    loadTrack(0);
    playMusic();
}


// =========================
// ПЕРВОНАЧАЛЬНАЯ ЗАГРУЗКА
// =========================

// loadTrack(0);