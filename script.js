const audio = document.getElementById("bg-music");
const muteBtn = document.getElementById("muteBtn");
const playBtn = document.getElementById("playBtn");
const muteIcon = muteBtn.querySelector("i");
const playIcon = playBtn.querySelector("i");

// Default: scroll terkunci
document.body.style.overflow = "hidden";

// Klik tombol Open Invitation
document.getElementById("open-invitation").addEventListener("click", () => {
  document.body.style.overflow = "auto";
  document.getElementById("detail").scrollIntoView({ behavior: "smooth" });

  audio.play().then(() => {
    audio.muted = false;
  }).catch(() => {
    console.log("Autoplay diblokir, user harus klik tombol musik.");
  });
});

// Tombol mute/unmute
muteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  muteIcon.classList.toggle("fa-volume-up", !audio.muted);
  muteIcon.classList.toggle("fa-volume-mute", audio.muted);
});

// Tombol play/pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playIcon.classList.replace("fa-play", "fa-pause");
  } else {
    audio.pause();
    playIcon.classList.replace("fa-pause", "fa-play");
  }
});

// Animasi section detail
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#detail");
  const events = section.querySelectorAll(".event");
  const tupai = section.querySelector(".animal-tupai");
  const kelinci = section.querySelector(".animal-kelinci");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        events.forEach((el, i) => {
          el.style.animationDelay = `${i * 0.4}s`;
          el.classList.add("show-event");
        });

        tupai.classList.add("show");
        kelinci.classList.add("show");

        let turn = 0;
        setInterval(() => {
          if (turn % 2 === 0) {
            kelinci.classList.add("lompat");
            setTimeout(() => kelinci.classList.remove("lompat"), 500);
          } else {
            tupai.classList.add("lompat");
            setTimeout(() => tupai.classList.remove("lompat"), 500);
          }
          turn++;
        }, 1000);

        observer.unobserve(section);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(section);
});

// Modal open/close
const modal = document.getElementById("rsvpModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");

openBtn.onclick = () => modal.style.display = "block";
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

// Form submit RSVP
const form = document.getElementById("rsvpForm");
const list = document.getElementById("rsvpList");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const kode = document.getElementById("kode").value;
  const wa = document.getElementById("wa").value;
  const status = document.getElementById("status").value;
  const pesan = document.getElementById("pesan").value;

  if (nama === "" || wa === "" || status === "") {
    alert("Harap isi semua data wajib yaa 🥰");
    return;
  }

  const item = document.createElement("div");
  item.className = "rsvp-item";
  item.innerHTML = `
    <h4>${nama} <span>(${kode}${wa})</span></h4>
    <p><strong>Kehadiran:</strong> ${status}</p>
    <p><strong>Pesan:</strong> ${pesan || "-"}</p>
  `;
  list.prepend(item);

  form.reset();
});

// Countdown
const eventDate = new Date("2025-10-05 08:00:00").getTime();
const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  if (distance < 0) {
    clearInterval(countdown);
    document.querySelector(".countdown").innerHTML = "Acara sudah dimulai 🎉";
  }
}, 1000);

// Animasi section RSVP
document.addEventListener("DOMContentLoaded", () => {
  const sectionRSVP = document.querySelector("#rsvp");
  if (!sectionRSVP) return;

  const items = sectionRSVP.querySelectorAll(".fade-in");

  const observerRSVP = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        items.forEach((el, i) => {
          el.style.animationDelay = `${i * 0.2}s`; // jeda tiap item
          el.classList.add("show-rsvp");
        });

        observerRSVP.unobserve(sectionRSVP); // biar cuma sekali
      }
    });
  }, { threshold: 0.4 });

  observerRSVP.observe(sectionRSVP);
});

function showSection(id) {
  document.querySelectorAll('.content-section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Tersalin: " + text);
  });
}

// fungsi show/hide content (cashless & kado)
function showSectionKasih(id) {
  document.querySelectorAll('.content-section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// fungsi copy text
function copyTextKasih(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Tersalin: " + text);
  });
}

// animasi muncul saat scroll
document.addEventListener("DOMContentLoaded", () => {
  const sectionKasih = document.querySelector("#tanda-kasih");
  const fadeKasih = sectionKasih.querySelectorAll(".fade-in");
  const burbir = sectionKasih.querySelector(".animal-burbir");

  // sembunyikan dulu
  fadeKasih.forEach(el => el.classList.remove("show-kasih"));
  burbir.classList.remove("show-burbir");

  const observerKasih = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let i = 0;
        const interval = setInterval(() => {
          if (i < fadeKasih.length) {
            fadeKasih[i].classList.add("show-kasih");
            i++;
          } else {
            clearInterval(interval);
          }
        }, 400);

        burbir.classList.add("show-burbir");

        observerKasih.unobserve(sectionKasih);
      }
    });
  }, { threshold: 0.3 });

  observerKasih.observe(sectionKasih);
});


// Animasi muncul saat venue discroll
const observerVenue = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-show');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('#venue .fade-up, #venue .fade-down')
  .forEach(el => observerVenue.observe(el));

  // Animasi muncul saat galeri discroll
const observerGaleri = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fadeEls = entry.target.querySelectorAll('.fade-up, .fade-down');
      fadeEls.forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.3}s`; // delay bertahap
        el.classList.add('fade-show');
      });
      observerGaleri.unobserve(entry.target); // sekali aja
    }
  });
}, { threshold: 0.2 });

observerGaleri.observe(document.querySelector('#galeri'));

// ==== Animasi Section Thank You ====
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#thankyou");
  const fadeEls = section.querySelectorAll("h2"); // teks
  const tupai = section.querySelector(".animal-tupaii");
  const kelinci = section.querySelector(".animal-kelincii");

  // sembunyikan dulu
  fadeEls.forEach(el => el.classList.remove("show-thankyou"));
  tupai.classList.remove("show");
  kelinci.classList.remove("show");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        // teks muncul bertahap
        fadeEls.forEach((el, i) => {
          setTimeout(() => el.classList.add("show-thankyou"), i * 400);
        });

        // munculkan hewan
        tupai.classList.add("show");
        kelinci.classList.add("show");

        // lompat bergantian
        let turn = 0;
        const interval = setInterval(() => {
          if(turn % 2 === 0) {
            kelinci.classList.add("lompat");
            setTimeout(() => kelinci.classList.remove("lompat"), 600);
          } else {
            tupai.classList.add("lompat");
            setTimeout(() => tupai.classList.remove("lompat"), 600);
          }
          turn++;
        }, 1000);

        observer.unobserve(section);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
});
