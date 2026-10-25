/* =========================================================
   projectOverlay.js — opens links to projects/*.html in a
   panel that slides up over the landing page, below the
   shared close button (.lightbox-close). Uses event
   delegation, so it catches cards added after page load.
   ========================================================= */

const overlay = document.getElementById("projectOverlay");
const panel = overlay.querySelector(".project-overlay-panel");
const closeBtn = document.getElementById("projectOverlayClose");
const app = document.querySelector(".app");

const PROJECT_PAGE_RE = /\/projects\/[^/]+\.html$/;

let opener = null; // the link that opened the overlay, refocused on close

function isProjectLink(link){
  return link.origin === location.origin && PROJECT_PAGE_RE.test(link.pathname);
}

function openProject(url, title){
  // a fresh iframe per opening: its first load replaces the blank page
  // instead of adding a history entry, so one back() closes the overlay
  const frame = document.createElement("iframe");
  frame.title = title || "Project";
  frame.src = url;
  // Escape inside the (same-origin) project page closes it too
  frame.addEventListener("load", ()=>{
    try{ frame.contentWindow.addEventListener("keydown", onKeydown); }catch{}
  });
  panel.replaceChildren(frame);

  overlay.hidden = false;
  overlay.offsetHeight; // reflow so the slide-up transition runs
  overlay.classList.add("is-open");
  app.inert = true;
  closeBtn.focus();
  // a history entry of its own, so the back button/gesture closes the overlay
  history.pushState({ projectOverlay: true }, "");
}

async function closeProject(){
  if(overlay.hidden) return;
  overlay.classList.remove("is-open");
  app.inert = false;
  opener?.focus();
  opener = null;

  // wait for the slide-down (resolves at once when reduced motion disables it)
  await Promise.all(panel.getAnimations().map(a => a.finished)).catch(()=>{});
  if(overlay.classList.contains("is-open")) return; // reopened meanwhile
  overlay.hidden = true;
  panel.replaceChildren(); // drop the iframe: stops the page and frees memory
}

/** Close via history when we pushed an entry, so back/forward stay in sync. */
function requestClose(){
  if(history.state?.projectOverlay) history.back();
  else closeProject();
}

function onKeydown(e){
  if(e.key === "Escape" && !overlay.hidden) requestClose();
}

/** Wires up all project-overlay listeners. Call once on boot. */
export function initProjectOverlay(){
  closeBtn.addEventListener("click", requestClose);
  overlay.addEventListener("click", (e)=>{
    if(e.target === overlay) requestClose(); // click on the backdrop also closes
  });
  document.addEventListener("keydown", onKeydown);
  window.addEventListener("popstate", closeProject);

  document.addEventListener("click", (e)=>{
    // let ctrl/cmd/shift/middle-click open the page normally
    if(e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = e.target.closest("a[href]");
    if(!link || !isProjectLink(link)) return;
    e.preventDefault();
    opener = link;
    openProject(link.href, link.textContent.trim());
  });
}
