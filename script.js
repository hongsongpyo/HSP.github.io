const header = document.querySelector(".site-header");
const reveals = document.querySelectorAll(".reveal");
const slides = document.querySelectorAll(".hero-slide");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.16 });

reveals.forEach((item) => observer.observe(item));

if (slides.length > 0) {
  let current = 0;

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 5000);
}


const tocLinks = document.querySelectorAll(".research-toc a");
const researchSections = document.querySelectorAll(".research-section[id]");

if (tocLinks.length && researchSections.length) {
  const activateTocLink = (id) => {
    tocLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length > 0) {
        activateTocLink(visibleSections[0].target.id);
      }
    },
    {
      root: null,
      rootMargin: "-35% 0px -35% 0px",
      threshold: [0.2, 0.35, 0.5, 0.65]
    }
  );

  researchSections.forEach((section) => observer.observe(section));
}