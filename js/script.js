// Player START
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img: "/image/eminem-photo-ava2.png",
    name: "Smack That",
    artist: "Akon Feat. Eminem",
    music: "/audio/Akon Feat. Eminem - Smack That.mp3",
  },
  {
    img: "/image/eminem-photo-ava2.png",
    name: "Stan",
    artist: "Eminem & Dido",
    music: "/audio/Eminem & Dido - Stan.mp3",
  },
  {
    img: "/image/eminem-photo-ava2.png",
    name: "Ass Like That (Termik Remix)",
    artist: "Eminem",
    music: "/audio/Eminem - Ass Like That (Termik Remix).mp3",
  },
  {
    img: "/image/eminem-photo-ava2.png",
    name: "Lose Yourself",
    artist: "Eminem",
    music: "/audio/Eminem - Lose Yourself.mp3",
  },
  {
    img: "/image/eminem-photo-ava2.png",
    name: "Mockingbird",
    artist: "Eminem",
    music: "/audio/Eminem - Mockingbird.mp3",
  },
  {
    img: "/image/eminem-photo-ava2.png",
    name: "My Name Is",
    artist: "Eminem",
    music: "/audio/Eminem - My Name Is.mp3",
  },
  {
    img: "/image/eminem-photo-ava2.png",
    name: "Rap God",
    artist: "Eminem",
    music: "/audio/Eminem - Rap God.mp3",
  },
  {
    img: "/image/eminem-photo-ava2.png",
    name: "Venom",
    artist: "Eminem",
    music: "/audio/Eminem - Venom.mp3",
  },
  {
    img: "/image/eminem-photo-ava2.png",
    name: "Without Me",
    artist: "Eminem",
    music: "/audio/Eminem - Without Me.mp3",
  },
  {
    img: "/image/eminem-photo-ava2.png",
    name: "Love The Way You Lie",
    artist: "Rihanna Feat. Eminem",
    music: "/audio/Rihanna Feat. Eminem - Love The Way You Lie.mp3",
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  now_playing.textContent =
    "Playing music " + (track_index + 1) + " of " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function random_bg_color() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];
  let a;

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
}
function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
// Player END

// Nav and scroll START
const navLinks = document.querySelectorAll(".header_nav_link");

navLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    navLinks.forEach(function (item) {
      item.classList.remove("active");
    });

    link.classList.add("active");
    const href = link.getAttribute("href");
    const targetElement = document.querySelector(href);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  });
});
//Nav and scroll END

// User Start
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Авторизація
$("#login-form").submit(function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "ajax_login.php",
    data: $(this).serialize(),
    success: function (data) {
      if (data === "success") {
        window.location.href = "cabinet.php";
      } else {
        alert(data); // Виводимо повідомлення про помилку
      }
    },
  });
});

// Виход
$("#logout-button").click(function () {
  $.ajax({
    type: "POST",
    url: "ajax_logout.php",
    success: function () {
      window.location.href = "login.php";
    },
  });
});

// Hamburger
$(document).ready(function () {
  var headerMobile = $(".header_mobile");
  $(".hamburger").on("click", function () {
    headerMobile.addClass("is-active");
  });
  $(".hamburger_exit").on("click", function () {
    headerMobile.removeClass("is-active");
  });
});