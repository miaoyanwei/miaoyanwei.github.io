/* =========================================================
   app.js — my chatbot, API-backed
   Sends every question straight to the /ask API and renders
   whatever comes back.
   ========================================================= */

lucide.createIcons();

/* ---------- config ---------- */
const API_URL = "https://r.eaglegang.de/faq/2/ask";

// Shown as clickable suggestions on first load. Edit freely —
// these are just UI hints, not tied to any backend data anymore.
const QUICK_START = [
  "Who the hell are you?",
  "What have you been working on?",
  "Why are you a designer?",
  "Show me your doggy!"
];

/* ---------- chat rendering ---------- */
const chatScroll = document.getElementById("chatScroll");

function addUserMessage(text){
  const div = document.createElement("div");
  div.className = "msg user";
  div.innerHTML = `<div class="bubble"></div>`;
  div.querySelector(".bubble").textContent = text;
  chatScroll.appendChild(div);
  scrollToBottom();
}

function addTypingIndicator(){
  const div = document.createElement("div");
  div.className = "msg bot";
  div.id = "typingIndicator";
  div.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;
  chatScroll.appendChild(div);
  scrollToBottom();
  return div;
}

function removeTypingIndicator(){
  const el = document.getElementById("typingIndicator");
  if(el) el.remove();
}

function addBotMessage(text){
  const wrap = document.createElement("div");
  wrap.className = "msg bot";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  wrap.appendChild(bubble);
  chatScroll.appendChild(wrap);
  scrollToBottom();
}

function addQuickStartChips(){
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
    chip.addEventListener("click", ()=>handleUserInput(question));
    row.appendChild(chip);
  });
  box.appendChild(row);
  wrap.appendChild(box);
  chatScroll.appendChild(wrap);
  scrollToBottom();
}

function scrollToBottom(){
  chatScroll.scrollTop = chatScroll.scrollHeight;
}

/* ---------- API call ---------- */
async function askAPI(question){
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });

  if(!res.ok){
    throw new Error(`API returned HTTP ${res.status}`);
  }

  const data = await res.json();

  // NOTE: adjust this once you've confirmed the real field name your
  // API returns — this tries a few common ones and falls back to the
  // raw JSON so nothing silently disappears during testing.
  if(typeof data === "string") return data;
  return data.answer ?? data.response ?? data.text ?? data.result ?? JSON.stringify(data);
}

async function handleUserInput(text){
  if(!text.trim()) return;
  addUserMessage(text);
  addTypingIndicator();

  try{
    const answer = await askAPI(text);
    removeTypingIndicator();
    addBotMessage(answer);
  }catch(err){
    removeTypingIndicator();
    addBotMessage("Ops, I'm afraid my brain is not braining right now, ask me again later.");
    console.error("askAPI failed:", err);
  }
}

/* ---------- composer ---------- */
function submitComposer(){
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
  "Hi, I'm Miao (not really), a user experience designer, ask anything about me, my work, and my design philosophy!"
);
addQuickStartChips();