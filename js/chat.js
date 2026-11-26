/* =========================================================
   chat.js — renders messages into the chat scroll area.
   This is the single source of truth for "what a message
   looks like" — API, boot, and chip clicks all funnel
   through addUserMessage/addBotMessage below.
   ========================================================= */

import { renderRichContent, extractSuggestions, splitBubbles } from "./richContent.js";
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

function prepareReplyStream(bubble, step){
  for(const child of bubble.children){
    if(child.classList.contains("bubble-text")){
      const parts = child.textContent.split(/(\S+)/);
      child.replaceChildren(...parts.map((part, index)=>{
        if(index % 2 === 0) return part;
        const word = document.createElement("span");
        word.className = "t-stream-w";
        word.style.setProperty("--stream-index", ++step);
        word.textContent = part;
        return word;
      }));
      continue;
    }

    const items = child.matches(".project-card-row, .chips-row, .bubble-list") ? child.children : [child];
    for(const item of items){
      // Give each rich item a slightly longer beat than a word.
      step += step < 0 ? 1 : 3;
      item.classList.add("t-stream-item");
      item.style.setProperty("--stream-index", step);
    }
  }
  return step;
}

function followReplyStream(replies, lastStep){
  if(lastStep < 0) return;
  const { paddingTop, paddingBottom } = getComputedStyle(chatScroll);
  const topInset = parseFloat(paddingTop);
  const bottomInset = parseFloat(paddingBottom);
  let lastScrollTop = chatScroll.scrollTop;
  const listeners = new AbortController();
  for(const reply of replies){
    reply.addEventListener("animationstart", event=>{
      if(event.animationName !== "t-stream-resolve" && event.animationName !== "t-stream-appear") return;
      if(Math.abs(chatScroll.scrollTop - lastScrollTop) > 1){
        listeners.abort();
        return;
      }

      const viewport = chatScroll.getBoundingClientRect();
      const item = event.target.getBoundingClientRect();
      const bottomGap = item.bottom - (viewport.bottom - bottomInset);
      const topGap = item.top - (viewport.top + topInset);
      const distance = Math.min(bottomGap, topGap);
      if(distance > 0){
        chatScroll.scrollTop += distance;
        lastScrollTop = chatScroll.scrollTop;
      }
      if(Number(event.target.style.getPropertyValue("--stream-index")) === lastStep) listeners.abort();
    }, { signal:listeners.signal });
  }
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
    chip.dataset.variant = "tertiary";
    const label = document.createElement("span");
    label.className = "chip-label";
    label.textContent = question;
    chip.appendChild(label);
    chip.addEventListener("click", ()=>onSuggestionClick(question));
    row.appendChild(chip);
  });
  return row;
}

/** Renders a bot answer as one or more consecutive bubbles — split the
 *  text with `[[bubble]]` to send it as two (or more) grouped replies,
 *  the way a person might follow up with a second message right after
 *  the first. Bubbles share the same spacing as any other message
 *  (see .chat-scroll's gap in css/layout.css) — no special tightened
 *  gap between them. Each bubble gets its own rich content (images/
 *  file cards/link cards); the trailing row of suggested follow-up
 *  questions, if any, lands on the last bubble only. One notification
 *  sound plays for the whole answer, not per bubble. */
export function addBotMessage(text, fallbackSuggestions = []){
  const { text: cleanText, suggestions: embeddedSuggestions } = extractSuggestions(text);
  const suggestions = embeddedSuggestions.length ? embeddedSuggestions : fallbackSuggestions;
  const bubbleTexts = splitBubbles(cleanText);
  const shouldStream = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lastStep = -1;

  const replies = bubbleTexts.map((bubbleText, index)=>{
    const isLast = index === bubbleTexts.length - 1;

    const wrap = document.createElement("div");
    wrap.className = "msg bot";
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    renderRichContent(bubble, bubbleText);

    if(isLast && suggestions.length){
      bubble.appendChild(buildChipsRow(suggestions));
    }
    if(shouldStream) lastStep = prepareReplyStream(bubble, lastStep);

    wrap.appendChild(bubble);
    return wrap;
  });

  for(const reply of replies){
    reply.style.setProperty("--stream-steps", Math.max(1, lastStep));
    chatScroll.appendChild(reply);
  }

  window.lucide?.createIcons();
  if(shouldStream) followReplyStream(replies, lastStep);
  else scrollToBottom();

  playSound(notification9agj9); // 🔔
}
