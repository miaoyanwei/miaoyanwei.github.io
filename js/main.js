/* =========================================================
   main.js — the only module that wires everything else
   together. Adding a new feature module? Import and call its
   init here rather than reaching into other modules directly.
   ========================================================= */

import { initSmiley } from "./smiley.js";
import { playIntroAnimation, prefersReducedMotion } from "./intro.js";
import { addBotMessage, addQuickStartChips, setSuggestionHandler } from "./chat.js";
import { handleUserInput } from "./api.js";
import { getAudioContext } from "./audioEngine.js";
import { initLightbox } from "./lightbox.js";
import { initProjectOverlay } from "./projectOverlay.js";

window.lucide?.createIcons();

/** Every user turn (composer, quick-start and suggestion chips) goes
 *  through here: the idle smiley is removed on the first one, then
 *  the question is handed to the API. */
function onUserInput(text){
  document.getElementById("smiley")?.remove();
  handleUserInput(text);
}

setSuggestionHandler(onUserInput);

/* ---------- opening animation ---------- */
// Plays the big-smiley bounce-in once, then starts the normal idle
// loop in place. Skipped (going straight to the idle loop) for
// visitors who've asked for reduced motion. Everything else in the
// page (see .pre-intro in css/intro.css) stays hidden — only the
// header shows — until this resolves, then eases in. Fire-and-forget:
// nothing else in boot needs to wait on it.
(async function bootSmiley(){
  const smileyEl = document.getElementById("smiley");
  const introEl = document.getElementById("smileyIntro");

  if(introEl && !prefersReducedMotion()){
    await playIntroAnimation(introEl, smileyEl);
  }
  initSmiley(smileyEl);
  document.body.classList.remove("pre-intro");
})();

initLightbox();
initProjectOverlay();

/* ---------- composer ---------- */
function submitComposer(){
  getAudioContext(); // unlock audio on the user gesture
  const input = document.getElementById("composerInput");
  const text = input.value;
  if(!text.trim()) return;
  input.value = "";
  onUserInput(text);
}

document.getElementById("sendBtn").addEventListener("click", submitComposer);
document.getElementById("composerInput").addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){
    e.preventDefault();
    submitComposer();
  }
});

/* ---------- boot ---------- */
addBotMessage(
  "Hi, I'm Miáo [svg], a User Experience Designer. Ask anything about me, my work, and my design philosophy!"
);
addQuickStartChips();
