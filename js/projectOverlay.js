/* =========================================================
   projectOverlay.js — opens links to projects/*.html in a
   panel that slides up over the landing page, below the
   shared close button (.lightbox-close). Uses event
   delegation, so it catches cards added after page load.
   ========================================================= */

const overlay = document.getElementById("projectOverlay");
const panel = overlay.querySelector(".project-overlay-panel");
const frame = document.getElementById("projectOverlayFrame");
const closeBtn = document.getElementById("projectOverlayClose");
const app = document.querySelector(".app");

const PROJECT_PAGE_RE = /\/projects\/[^/]+\.html$/;

let opener = null; // the link that opened the overlay, refocused on close

function isProjectLink(link){
  return link.origin === location.origin && PROJECT_PAGE_RE.test(link.pathname);
}

function openProject(url, title){
  frame.src = url;
  frame.title = title || "Project";
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
  frame.src = "about:blank"; // stop the page and free memory
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

  // Escape inside the (same-origin) project page closes it too
  frame.addEventListener("load", ()=>{
    try{ frame.contentWindow.addEventListener("keydown", onKeydown); }catch{}
  });

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
