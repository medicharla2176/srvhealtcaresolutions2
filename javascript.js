// --- Unified Carousel with autoplay + arrows + text animation ---
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const slides   = Array.from(document.querySelectorAll(".slide"));
  const prevBtn  = document.getElementById("prev");
  const nextBtn  = document.getElementById("next");
  const wrapper  = document.querySelector(".wrapper");

  let index = 0;
  let timer;
  const AUTO_DELAY = 4000;

  function setActive() {
    slides.forEach((s, i) => {
      const active = i === index;
      s.classList.toggle("active", active);

      const text = s.querySelector(".banner-text");
      if (text) {
        text.classList.remove("animate");
        if (active) {
          setTimeout(() => text.classList.add("animate"), 50);
        }
      }
    });
  }

  function goToSlide(i) {
    index = (i + slides.length) % slides.length;
    carousel.style.transform = `translateX(-${index * 100}%)`;
    setActive();
  }

  function next() { goToSlide(index + 1); }
  function prev() { goToSlide(index - 1); }

  function startAuto() { stopAuto(); timer = setInterval(next, AUTO_DELAY); }
  function stopAuto()  { if (timer) { clearInterval(timer); timer = null; } }

  nextBtn.addEventListener("click", () => { stopAuto(); next(); startAuto(); });
  prevBtn.addEventListener("click", () => { stopAuto(); prev(); startAuto(); });

  // --- IntersectionObserver: only autoplay when visible ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startAuto();   // start when visible
      } else {
        stopAuto();    // pause when out of view
      }
    });
  }, { threshold: 0.5 }); // 50% visible

  observer.observe(wrapper);

  goToSlide(0);
});





function showMenu() {
  document.getElementById("navLinks").style.right = "0";
}

function hideMenu() {
  document.getElementById("navLinks").style.right = "-290px"; // match CSS width
}

// Run once on load
revealOnScroll();

document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector("a");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (link && menu) {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Close other open dropdowns
        document.querySelectorAll(".dropdown-menu.show").forEach(openMenu => {
          if (openMenu !== menu) {
            openMenu.classList.remove("show");
          }
        });

        // Toggle this one
        menu.classList.toggle("show");
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Mark the current page's link as active
  const links = document.querySelectorAll('.nav-links a[href]');
  // Normalize current file (treat "" or "/" as index.html)
  let file = location.pathname.split('/').pop() || 'index.html';

  let matchedLink = null;
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href === '#' || href.startsWith('javascript:')) return;
    const hrefFile = href.split('/').pop();
    if (hrefFile === file) matchedLink = a;
  });

  if (matchedLink) {
    matchedLink.classList.add('active');

    // If it's inside a dropdown, also highlight the parent tab
    const dd = matchedLink.closest('.dropdown');
    if (dd) {
      const parentLink = dd.querySelector(':scope > a');
      if (parentLink) parentLink.classList.add('active-parent');
    }
  }
});





// 🔥 Scroll Reveal Function
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let elementVisible = 100; // adjust if needed

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } 
    // 👉 if you want animation ONLY first time, remove the "else"
    // else {
    //   reveals[i].classList.remove("active");
    // }
  }
}

window.addEventListener("scroll", revealOnScroll);

// Run once on load
revealOnScroll();


// --- Course cards horizontal scroll arrows in home page responisive mobe---
// --- Course cards horizontal scroll (mobile) ---
document.addEventListener("DOMContentLoaded", function () {
  const courseNav = document.getElementById("courseNav");
  const leftBtn   = document.querySelector(".scroll-btn.left");
  const rightBtn  = document.querySelector(".scroll-btn.right");
  if (!courseNav || !leftBtn || !rightBtn) return;

  const cards = Array.from(courseNav.querySelectorAll(".course-card"));
  if (!cards.length) return;

  // Use real card-to-card distance
  function getStep() {
    if (cards.length < 2) {
      return cards[0]?.getBoundingClientRect().width || 0;
    }
    return cards[1].offsetLeft - cards[0].offsetLeft;
  }

  // ✅ Updated centerCard with highlight
  function centerCard(card) {
    const targetLeft = card.offsetLeft - (courseNav.clientWidth - card.clientWidth) / 2;
    courseNav.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });

    // highlight active
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
  }

  function centerClosest() {
    const navRect = courseNav.getBoundingClientRect();
    const navCenter = navRect.left + navRect.width / 2;
    let closest = cards[0];
    let best = Infinity;

    for (const c of cards) {
      const r = c.getBoundingClientRect();
      const cCenter = r.left + r.width / 2;
      const d = Math.abs(cCenter - navCenter);
      if (d < best) { best = d; closest = c; }
    }
    centerCard(closest);
  }

  function scrollByStep(dir) {
    const step = getStep();
    courseNav.scrollBy({ left: dir * step, behavior: "smooth" });
    setTimeout(centerClosest, 350);
  }

  leftBtn.addEventListener("click",  () => scrollByStep(-1));
  rightBtn.addEventListener("click", () => scrollByStep( 1));

  cards.forEach(c => c.addEventListener("click", () => centerCard(c)));

  // highlight & center first card on load
  centerCard(cards[0]);
});



// loader


// ===============================
// 🌐 Global Loader Functionality
// ===============================
window.addEventListener("load", function() {
  const loader = document.getElementById("global-loader");
  setTimeout(() => loader.classList.add("hidden"), 600);
});

document.addEventListener("click", function(e) {
  const btn = e.target.closest("button, a"); // covers both buttons and links
  if (btn) {
    const loader = document.getElementById("global-loader");
    loader.classList.remove("hidden");
    setTimeout(() => loader.classList.add("hidden"), 1500);
  }
});




// Test monials

// testimonials.js
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".testimonial-track");
  const cards = Array.from(document.querySelectorAll(".testimonial-card"));
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  let autoScroll = null;

  const getVisibleCount = () => (window.innerWidth >= 992 ? 3 : 1);
  const getMaxIndex = () => Math.max(0, cards.length - getVisibleCount());

  function moveTo(index, highlightIndex = null) {
    const visible = getVisibleCount();
    const maxIndex = getMaxIndex();
    currentIndex = Math.max(0, Math.min(index, maxIndex));

    const movePercent = (100 / visible) * currentIndex;
    track.style.transform = `translateX(-${movePercent}%)`;

    cards.forEach((c, i) => c.classList.toggle("active", i === (highlightIndex ?? currentIndex)));
    updateDots();
  }

  function updateDots() {
    dots.forEach(d => d.classList.remove("active"));
    const max = getMaxIndex();
    if (currentIndex === 0) dots[0].classList.add("active");
    else if (currentIndex >= max) dots[2].classList.add("active");
    else dots[1].classList.add("active");
  }

  // Dot button actions
  dots[0].addEventListener("click", () => {
    moveTo(currentIndex - 1);
    resetAutoScroll();
  });
  dots[1].addEventListener("click", () => resetAutoScroll());
  dots[2].addEventListener("click", () => {
    moveTo(currentIndex + 1);
    resetAutoScroll();
  });

  // Card click highlight and scroll
  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      const visible = getVisibleCount();
      const leftIndex = visible === 1 ? i : Math.max(0, Math.min(i - Math.floor(visible / 2), getMaxIndex()));
      moveTo(leftIndex, i);
      resetAutoScroll();
    });
  });

  // Auto scroll
  function startAutoScroll() {
    stopAutoScroll();
    autoScroll = setInterval(() => {
      if (currentIndex < getMaxIndex()) moveTo(currentIndex + 1);
      else moveTo(0);
    }, 5000);
  }

  function stopAutoScroll() {
    if (autoScroll) clearInterval(autoScroll);
  }

  function resetAutoScroll() {
    stopAutoScroll();
    startAutoScroll();
  }

  window.addEventListener("resize", () => moveTo(currentIndex));
  moveTo(0);
  startAutoScroll();
});



// contact us page sucess popup message 
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form form");
  const popup = document.getElementById("successPopup");

  if (!form || !popup) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    popup.style.display = "flex";
    form.reset();
  });
});

function closePopup() {
  const popup = document.getElementById("successPopup");
  popup.style.display = "none";
}


// take the message 
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const result = document.getElementById("result");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      result.textContent = "Sending...";

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (response.ok && data.success) {
          result.textContent = "✅ Your message was sent successfully!";
          form.reset();
        } else {
          result.textContent = "❌ Error: " + (data.message || "Please try again.");
        }
      } catch (error) {
        result.textContent = "⚠️ Network error. Please try again.";
      }
    });
  }
});
