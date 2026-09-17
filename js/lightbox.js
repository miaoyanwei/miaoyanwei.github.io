/* =========================================================
   lightbox.js — click-to-enlarge for images posted in the chat.
   Uses event delegation on the chat scroll container so it
   keeps working for images added long after page load.
   ========================================================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const chatScroll = document.getElementById("chatScroll");

function openLightbox(src, alt){
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.hidden = false;
}

function closeLightbox(){
  lightbox.hidden = true;
  lightboxImg.src = ""; // stop loading/free memory
}

/** Wires up all lightbox listeners. Call once on boot. */
export function initLightbox(){
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e)=>{
    if(e.target === lightbox) closeLightbox(); // click outside image also closes
  });
  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  // event delegation: catches images even though they're added dynamically
  chatScroll.addEventListener("click", (e)=>{
    const img = e.target.closest(".bubble-image");
    if(img) openLightbox(img.src, img.alt);
  });
}
