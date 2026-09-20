/* =========================================================
   chat.js — renders messages into the chat scroll area.
   This is the single source of truth for "what a message
   looks like" — API, boot, and chip clicks all funnel
   through addUserMessage/addBotMessage below.
   ========================================================= */

import { QUICK_START } from "./config.js";
import { renderRichContent, extractSuggestions } from "./richContent.js";
import { playSound } from "./audioEngine.js";
import { notification9agj9 } from "./soundLibrary.js";

const chatScroll = document.getElementById("chatScroll");

/** Registered by main.js once handleUserInput exists, so chips/quick-start
 *  can trigger a question without this module needing to import api.js. */
let onSuggestionClick = () => {};
export function setSuggestionHandler(handler){
  onSuggestionClick = handler;
}

function scrollToBottom(){
  chatScroll.scrollTop = chatScroll.scrollHeight;
}

export function addUserMessage(text){
  const div = document.createElement("div");
  div.className = "msg user";
  div.innerHTML = `<div class="bubble"></div>`;
  div.querySelector(".bubble").textContent = text;
  chatScroll.appendChild(div);
  scrollToBottom();
}

export function addTypingIndicator(){
  const div = document.createElement("div");
  div.className = "msg bot";
  div.id = "typingIndicator";
  div.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;
  chatScroll.appendChild(div);
  scrollToBottom();
  return div;
}

export function removeTypingIndicator(){
  const el = document.getElementById("typingIndicator");
  if(el) el.remove();
}

function buildChipsRow(questions){
  const row = document.createElement("div");
  row.className = "chips-row chips-row--inline";
  questions.forEach(question=>{
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.textContent = question;
    chip.addEventListener("click", ()=>onSuggestionClick(question));
    row.appendChild(chip);
  });
  return row;
}

export function addQuickStartChips(){
  const wrap = document.createElement("div");
  wrap.className = "msg bot";
  const box = document.createElement("div");
  box.className = "chip-box";
  const heading = document.createElement("div");
  heading.className = "chip-heading";
  heading.textContent = "For example, you can ask me:";
  box.appendChild(heading);

  const row = document.createElement("div");
  row.className = "chips-row";
  QUICK_START.forEach(question=>{
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.textContent = question;
    chip.addEventListener("click", ()=>onSuggestionClick(question));
    row.appendChild(chip);
  });
  box.appendChild(row);

  wrap.appendChild(box);
  chatScroll.appendChild(wrap);
  scrollToBottom();
}

/** Renders a bot answer, including any embedded images/file cards/link
 *  cards and a trailing row of suggested follow-up questions. */
export function addBotMessage(text){
  const { text: cleanText, suggestions } = extractSuggestions(text);

  const wrap = document.createElement("div");
  wrap.className = "msg bot";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  renderRichContent(bubble, cleanText);

  if(suggestions.length){
    bubble.appendChild(buildChipsRow(suggestions));
  }

  wrap.appendChild(bubble);
  chatScroll.appendChild(wrap);
  window.lucide?.createIcons();
  scrollToBottom();

  playSound(notification9agj9); // 🔔
}
