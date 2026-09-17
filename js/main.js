/* =========================================================
   main.js — the only module that wires everything else
   together. Adding a new feature module? Import and call its
   init here rather than reaching into other modules directly.
   ========================================================= */

import { initSmiley } from "./smiley.js";
import { addBotMessage, addQuickStartChips, setSuggestionHandler } from "./chat.js";
import { handleUserInput } from "./api.js";
import { getAudioContext } from "./audioEngine.js";
import { initLightbox } from "./lightbox.js";

window.lucide?.createIcons();

// chips (quick-start + suggested follow-ups) both funnel back through
// the same handleUserInput() the composer uses.
setSuggestionHandler(handleUserInput);

initSmiley(document.getElementById("smiley"));
initLightbox();

/* ---------- composer ---------- */
function submitComposer(){
  getAudioContext(); // unlock audio on the user gesture
  const input = document.getElementById("composerInput");
  const text = input.value;
  if(!text.trim()) return;
  input.value = "";
  handleUserInput(text);
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
  "Hi, I'm Miao (not really), a User Experience Designer. Ask anything about me, my work, and my design philosophy!"
);
addQuickStartChips();