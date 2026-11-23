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

const sections = [...document.querySelectorAll(".case-study > section")];
if(sections.length){
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let lastSnapWheel = -Infinity;

  window.addEventListener("wheel", event=>{
    if(event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
    if(event.timeStamp - lastSnapWheel < 180){
      event.preventDefault();
      lastSnapWheel = event.timeStamp;
      return;
    }

    const index = sections.findLastIndex(section => section.offsetTop <= window.scrollY + 1);
    const section = sections[index];
    const direction = Math.sign(event.deltaY);
    const next = sections[index + direction];
    if(!section || !next) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight - window.innerHeight;
    // Let readers scroll through a section that is taller than the viewport.
    if(direction > 0 && window.scrollY < bottom - 1) return;
    if(direction < 0 && window.scrollY > top + 1) return;

    event.preventDefault();
    lastSnapWheel = event.timeStamp;
    window.scrollTo({top:next.offsetTop, behavior:reducedMotion.matches ? "instant" : "smooth"});
  }, {passive:false});
}
