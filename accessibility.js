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

      // בנוסף, נשנה את הפונט של כל ה-a בתוך site
      site.querySelectorAll("a").forEach((a) => {
        a.style.fontSize = currentFontSize + "em";
      });

      updateAccessButtonBackground(true);
    }
  };

  const decreaseText = () => {
    if (currentFontSize > 0.6) {
      currentFontSize -= 0.1;
      site.style.fontSize = currentFontSize + "em";

      // בנוסף, נשנה את הפונט של כל ה-a בתוך site
      site.querySelectorAll("a").forEach((a) => {
        a.style.fontSize = currentFontSize + "em";
      });

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
      link.style.fontSize = ""; // איפוס גודל הפונט של הקישורים
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

  function updateAccessButtonBackground(active) {
    if (active) {
      accessToggleButton.style.backgroundColor = "#ccc";
    } else {
      accessToggleButton.style.backgroundColor = "";
    }
  }
});
