/* =========================================================
   project.js — reveal-on-scroll for project detail pages
   (projects/*.html). Each .t-stagger-line rises and sharpens as
   it enters the viewport; elements arriving together are
   staggered in document order. See css/project.css.
   ========================================================= */

const STAGGER_LIMIT = 6; // caps the delay so long groups don't lag

const items = document.querySelectorAll(".t-stagger-line");

if("IntersectionObserver" in window){
  const observer = new IntersectionObserver((entries)=>{
    entries
      .filter(entry => entry.isIntersecting)
      .forEach((entry, index)=>{
        entry.target.style.setProperty("--reveal-index", Math.min(index, STAGGER_LIMIT));
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
  });

  items.forEach(el => observer.observe(el));
  document.documentElement.classList.add("js");
}
