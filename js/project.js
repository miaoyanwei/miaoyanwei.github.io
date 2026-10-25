/* =========================================================
   project.js — reveal-on-scroll for project detail pages
   (projects/*.html). Each [data-reveal] element fades up as
   it enters the viewport; elements arriving together are
   staggered in document order. See css/project.css.
   ========================================================= */

const STAGGER_LIMIT = 6; // caps the delay so long groups don't lag

const items = document.querySelectorAll("[data-reveal]");

if(!("IntersectionObserver" in window)){
  items.forEach(el => el.classList.add("is-visible"));
}else{
  const observer = new IntersectionObserver((entries)=>{
    entries
      .filter(entry => entry.isIntersecting)
      .forEach((entry, index)=>{
        entry.target.style.setProperty("--reveal-index", Math.min(index, STAGGER_LIMIT));
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
  }, { rootMargin:"0px 0px -10% 0px" });

  items.forEach(el => observer.observe(el));
}
