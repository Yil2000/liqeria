document.addEventListener("DOMContentLoaded", () => {
  const sidebarCheckbox = document.getElementById("sidebar-active");
  const navLinks = document.querySelectorAll(".navbar-content a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      sidebarCheckbox.checked = false;
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const accessToggle = document.querySelector(".access-logo");
  const accessPanel = document.querySelector(".access-content");
  const root = document.documentElement;
  const site = document.getElementById("site-content"); // רק על אלמנט זה יחולו הסגנונות
  const accessToggleButton = accessToggle;

  let currentFontSize = 1;
  let isGrayscale = false;
  let isHighContrast = false;
  let isInverted = false;
  let isLightBg = false;
  let linksHighlighted = false;
  let isReadableFont = false;



  accessToggle.onclick = () => {
    accessPanel.style.display =
      accessPanel.style.display === "flex" ? "none" : "flex";
  };

  const increaseText = () => {
    if (currentFontSize < 1.8) {
      currentFontSize += 0.1;
      site.style.fontSize = currentFontSize + "em";
      updateAccessButtonBackground(true);
    }
  };

  const decreaseText = () => {
    if (currentFontSize > 0.6) {
      currentFontSize -= 0.1;
      site.style.fontSize = currentFontSize + "em";
      updateAccessButtonBackground(true);
    }
  };

  const toggleGrayscale = () => {
    isGrayscale = !isGrayscale;
    updateFilters();
    updateAccessButtonBackground(isAnyAccessibilityActive());
  };

  const toggleHighContrast = () => {
    isHighContrast = !isHighContrast;
    site.classList.toggle("high-contrast", isHighContrast);
    updateAccessButtonBackground(isAnyAccessibilityActive());
  };

  const toggleInverted = () => {
    isInverted = !isInverted;
    updateFilters();
    updateAccessButtonBackground(isAnyAccessibilityActive());
  };

 const toggleLightBackground = () => {
  isLightBg = !isLightBg;

  // שנה צבע רקע וצבע טקסט לכל האלמנטים בתוך #site-content
  site.querySelectorAll("*").forEach((el) => {
    el.style.backgroundColor = isLightBg ? "#fff" : "";
    el.style.color = isLightBg ? "#000" : "";
  });

  // שנה גם את צבע הרקע והטקסט של האלמנט הראשי עצמו
  site.style.backgroundColor = isLightBg ? "#fff" : "";
  site.style.color = isLightBg ? "#000" : "";

  updateAccessButtonBackground(isAnyAccessibilityActive());
};

  const toggleHighlightLinks = () => {
    linksHighlighted = !linksHighlighted;
    site.querySelectorAll("a").forEach((link) => {
      link.style.outline = linksHighlighted ? "3px solid orange" : "";
      link.style.backgroundColor = linksHighlighted ? "yellow" : "";
    });
    updateAccessButtonBackground(isAnyAccessibilityActive());
  };

  const toggleReadableFont = () => {
    isReadableFont = !isReadableFont;
    site.style.fontFamily = isReadableFont ? "Arial, sans-serif" : "";
    updateAccessButtonBackground(isAnyAccessibilityActive());
  };

  const updateFilters = () => {
    let filterValue = "";
    if (isGrayscale) filterValue += "grayscale(1) ";
    if (isInverted) filterValue += "invert(1) hue-rotate(180deg) ";
    site.style.filter = filterValue.trim() || "none";

    if (!isInverted) {
      site.querySelectorAll("img").forEach((img) => {
        img.style.filter = "";
      });
    }
  };

  const resetAccessibility = () => {
    currentFontSize = 1;
    site.style.fontSize = "1em";
    isGrayscale = false;
    isHighContrast = false;
    isInverted = false;
    isLightBg = false;
    linksHighlighted = false;
    isReadableFont = false;

    site.style.filter = "none";
    site.classList.remove("high-contrast");
    site.style.backgroundColor = "";
    site.style.color = "";
    site.style.fontFamily = "";

    site.querySelectorAll("img").forEach((img) => {
      img.style.filter = "";
    });

    site.querySelectorAll("*").forEach((el) => {
  el.style.backgroundColor = "";
  el.style.color = "";
});


    site.querySelectorAll("a").forEach((link) => {
      link.style.outline = "";
      link.style.backgroundColor = "";
    });

    updateAccessButtonBackground(false);
  };

  function isAnyAccessibilityActive() {
    return (
      currentFontSize !== 1 ||
      isGrayscale ||
      isHighContrast ||
      isInverted ||
      isLightBg ||
      linksHighlighted ||
      isReadableFont
    );
  }

  const buttons = document.querySelectorAll(".access-content button");
  if (buttons.length >= 9) {
    buttons[0].addEventListener("click", increaseText);
    buttons[1].addEventListener("click", decreaseText);
    buttons[2].addEventListener("click", toggleGrayscale);
    buttons[3].addEventListener("click", toggleHighContrast);
    buttons[4].addEventListener("click", toggleInverted);
    buttons[5].addEventListener("click", toggleLightBackground);
    buttons[6].addEventListener("click", toggleHighlightLinks);
    buttons[7].addEventListener("click", toggleReadableFont);
    buttons[8].addEventListener("click", resetAccessibility);
  } else {
    console.warn("לא נמצאו מספיק כפתורים בתפריט הנגישות");
  }
});

document.getElementById("whatsapp-btn").onclick = function () {
  const message = `שלום, הגעתי אליך דרך האתר שלך. אני מעוניין לרכוש ליקרים`;
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

// change img class for collection
document.addEventListener("DOMContentLoaded", () => {
  const liquerImg = document.querySelector(".collection-img-div");

  liquerImg.addEventListener("click", () => {
    liquerImg.classList.toggle("liquer-active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const liquerImgs = document.querySelectorAll(".liquer-img");
  const overlay = document.getElementById("overlay");

  liquerImgs.forEach((img) => {
    img.addEventListener("click", () => {
      const isExpanded = img.classList.contains("expanded");
      const expandedNow = document.querySelector(".liquer-img.expanded");

      // סגור תמונה פתוחה אחרת קודם
      if (expandedNow && expandedNow !== img) {
        expandedNow.classList.remove("expanded");
      }

      // Toggle לתמונה הנוכחית
      img.classList.toggle("expanded");

      // הצגת או הסתרת overlay
      if (img.classList.contains("expanded")) {
        overlay.style.display = "block";
      } else {
        overlay.style.display = "none";
      }
    });
  });

  // סגירה אם לוחצים על הרקע
  overlay.addEventListener("click", () => {
    document.querySelectorAll(".liquer-img.expanded").forEach((img) => {
      img.classList.remove("expanded");
    });
    overlay.style.display = "none";
  });
});
