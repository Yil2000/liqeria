
document.getElementById("whatsapp-btn").onclick = function () {
  const message = `שלום, הגעתי אליך דרך האתר שלך. אני מעוניין לרכוש ליקרים`;
  const phone = "972537985298";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};


document.getElementById("faq-contact").onclick = function () {
  const message = `שלום, הגעתי אלייך דרך האתר, יש לי שאלה`;
  const phone = "972537985298";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};


document.querySelectorAll(".stars").forEach((starsContainer) => {
  const count = parseInt(starsContainer.dataset.stars || "0");

  starsContainer.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const star = document.createElement("i");
    star.className = "fa-star fa-solid";
    // אם i קטן ממספר הכוכבים הרצוי – תוסיף מחלקה לצבע צהוב
    if (i < count) {
      star.classList.add("active"); // תסמן שהוא צהוב
    }
    starsContainer.appendChild(star);
  }
});

const scrollContainer = document.querySelector(".grading-boxs");
const btnLeft = document.querySelector(".scroll-btn.left");
const btnRight = document.querySelector(".scroll-btn.right");

btnLeft.addEventListener("click", () => {
  scrollContainer.scrollBy({
    left: scrollContainer.clientWidth * 0.6,
    behavior: "smooth",
  });
});

btnRight.addEventListener("click", () => {
  scrollContainer.scrollBy({
    left: -scrollContainer.clientWidth * 0.6,
    behavior: "smooth",
  });
});

const popupOverlay = document.getElementById("popup-overlay");
const popupBox = document.querySelector(".make-recommendation");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");

openBtn.addEventListener("click", () => {
  popupOverlay.style.display = "flex"; // מציג את השכבה השקופה ואת הפופאפ
  setTimeout(() => {
    popupBox.classList.add("active"); // מפעיל אנימציה על תיבת ההמלצה בלבד
  }, 10);
});

closeBtn.addEventListener("click", () => {
  popupBox.classList.remove("active"); // מסיר את האנימציה
  setTimeout(() => {
    popupOverlay.style.display = "none"; // מסתיר את כל השכבה לאחר סיום האנימציה
  }, 500); // זמן התאמה ל־transition
});

const stars = document.querySelectorAll(".star-rating .star");
const ratingInput = document.getElementById("rating-value");

stars.forEach((star) => {
  star.addEventListener("click", () => {
    const rating = parseInt(star.dataset.value);
    ratingInput.value = rating;

    stars.forEach((s) => {
      s.classList.toggle("selected", parseInt(s.dataset.value) <= rating);
    });
  });

  star.addEventListener("mouseenter", () => {
    const hoverValue = parseInt(star.dataset.value);
    stars.forEach((s) => {
      s.classList.toggle("hovered", parseInt(s.dataset.value) <= hoverValue);
    });
  });

  star.addEventListener("mouseleave", () => {
    stars.forEach((s) => s.classList.remove("hovered"));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach((question) => {
    question.addEventListener("click", () => {
      question.classList.toggle("active");
      const answer = question.nextElementSibling;
      const icon = question.querySelector(".faq-icon");

      if (answer.style.display === "block") {
        answer.style.display = "none";
        icon.textContent = "+";
      } else {
        answer.style.display = "block";
        icon.textContent = "-";
      }
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const liquerImgs = document.querySelectorAll(".liquer-img");
  const overlay = document.getElementById("overlay");

  liquerImgs.forEach(img => {
    // זום בעכבר (hover)
    img.addEventListener("mousemove", e => {
      const rect = img.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
      img.style.transform = "scale(2)";
      img.style.transition = "transform 0.3s ease";
      img.style.cursor = "zoom-in";
    });

    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1)";
      img.style.transformOrigin = "center center";
      img.style.transition = "transform 0.3s ease";
      img.style.cursor = "default";
    });

    // קליק לפתיחת העותק המורחב ב-overlay
    img.addEventListener("click", () => {
      overlay.innerHTML = ""; // ניקוי תוכן קודם

      const expandedImg = img.cloneNode(true); // שכפול התמונה
      expandedImg.classList.add("expanded"); // להוסיף קלאס לעיצוב

      // ניקוי transform ו-transform-origin כדי למרכז כמו שצריך
      expandedImg.style.transform = '';
      expandedImg.style.transformOrigin = '';
      expandedImg.style.cursor = 'zoom-out';

      overlay.appendChild(expandedImg);
      overlay.style.display = "flex";

      // מניעת גלילה ברקע
      document.body.style.overflow = "hidden";

      // לחיצה על התמונה המורחבת סוגרת את ה-overlay
      expandedImg.addEventListener("click", () => {
        overlay.style.display = "none";
        overlay.innerHTML = "";
        document.body.style.overflow = "auto";
      });

      // לחיצה על ה-overlay מחוץ לתמונה סוגרת
      overlay.addEventListener("click", e => {
        if (e.target === overlay) {
          overlay.style.display = "none";
          overlay.innerHTML = "";
          document.body.style.overflow = "auto";
        }
      }, { once: true });
    });
  });
});





document.addEventListener('DOMContentLoaded', function () {
  emailjs.init("2jpU5CgCOgcvvXP-E"); // ← החלף ב־Public Key שלך
  const form = document.getElementById('recommendation-form');

  // לנהל את דירוג הכוכבים (עדכון input.hidden)
  const stars = document.querySelectorAll('#star-rating .star');
  const ratingInput = document.getElementById('rating-value');

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = star.getAttribute('data-value');
      ratingInput.value = rating;

      // עדכון מראה הכוכבים (לדוגמה, הצבעה לכוכבים נבחרים)
      stars.forEach(s => {
        if (s.getAttribute('data-value') <= rating) {
          s.style.color = 'gold';
        } else {
          s.style.color = 'gray';
        }
      });
    });
  });

  const submitBtn = document.getElementById("submitbtn");

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // הפעלת מצב טעינה
  submitBtn.disabled = true;
  submitBtn.classList.add("loading");

  emailjs.sendForm('service_mcl574a', 'template_30db5qj', this)
    .then(() => {
      alert('✅ ההמלצה נשלחה בהצלחה!');
      document.getElementById("popup-overlay").style.display = "none";
      form.reset();
      stars.forEach(s => s.style.color = 'gray');
    })
    .catch((error) => {
      alert('❌ שגיאה בשליחה: ' + JSON.stringify(error));
    })
    .finally(() => {
      // החזרת הכפתור למצב רגיל
      submitBtn.disabled = false;
      submitBtn.classList.remove("loading");
    });
});
})

