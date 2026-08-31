/* =========================================================
   app.js — my chatbot, API-backed
   Sends every question straight to the /ask API and renders
   whatever comes back.
   ========================================================= */

/* ---------- image-aware message rendering ---------- */
const IMAGE_MD = /!\[([^\]]*)\]\(([^)]+)\)/g;
/* ---------- rich text pattern ---------- */
const RICH_PATTERN = /!\[([^\]]*)\]\(([^)]+)\)|\[\[file:\s*([^|]+?)\s*\|\s*([^\]]+?)\]\]/g;


lucide.createIcons();

/* ---------- smiley loop ---------- */
(function(){
  const SVG1 = `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M54.9091 15.0341C59.151 14.9349 64.9693 15.0293 72.0243 15.6268C75.5348 15.9242 78.5147 16.1891 80.9325 16.4071C82.1344 16.8592 83.4088 17.4442 84.7753 18.3114C85.9446 19.0534 87.1622 19.4322 89.3085 21.162C91.4274 22.8698 94.3766 25.8584 98.6815 31.6395C100.386 33.9291 101.8 36.0028 103.055 38.7264C104.31 41.4528 105.413 44.8497 106.474 49.7841C107.06 52.5161 108.318 59.7261 107.075 69.8075C106.544 74.1138 105.752 78.3783 104.63 82.076C103.505 85.7836 102.062 88.8751 100.258 90.8778C97.8833 93.5133 91.099 100.052 81.6102 102.559C77.2832 103.703 68.462 104.507 57.412 103.866C52.7817 103.598 50.0252 103.22 46.9227 102.27C40.2249 100.221 34.9087 98.3442 31.2392 95.8007C26.3548 92.4151 22.9159 89.9363 21.2333 87.9725L21.077 87.7899C16.2426 82.1483 13.0917 78.4458 13.0292 72.0565C12.9817 67.1975 12.9695 62.6601 13.1727 58.7772C13.3766 54.8836 13.795 51.698 14.5858 49.5184C16.4201 44.4635 17.7694 41.2288 19.0477 39.5526C21.1963 36.7356 25.4866 31.1913 32.9423 25.371C36.7272 22.4163 39.848 20.076 42.2724 18.4169C43.4845 17.5873 44.5163 16.9323 45.3661 16.4569C46.2248 15.9765 46.8656 15.6977 47.3036 15.5946C48.0129 15.4277 50.6486 15.1337 54.9091 15.0341ZM54.5497 64.2362C54.2771 64.2798 54.0911 64.5368 54.1347 64.8094C54.1516 64.9153 54.2006 65.0734 54.2626 65.246C54.3292 65.4314 54.424 65.6686 54.5487 65.9471C54.7985 66.5049 55.173 67.2354 55.6933 68.0546C56.5333 69.377 57.8226 69.9527 59.287 70.5731C61.5889 71.5483 64.2691 71.3807 65.828 71.162C66.8501 71.0185 67.6578 70.4534 68.2528 69.8143C68.8471 69.176 69.2563 68.436 69.4862 67.87C69.4923 67.8549 69.4982 67.8387 69.5028 67.8231C69.5858 67.5431 69.624 67.3361 69.6435 67.0721C69.6648 66.7818 69.6605 66.3982 69.3642 65.8905C69.2249 65.652 68.9181 65.5716 68.6796 65.7108C68.4415 65.8501 68.3609 66.1561 68.4999 66.3944C68.5883 66.5459 68.6244 66.6586 68.6395 66.7421C68.6549 66.8266 68.6535 66.9025 68.6464 66.9989C68.6333 67.1769 68.61 67.309 68.5517 67.5106C68.3562 67.9864 68.0102 68.6075 67.5214 69.1327C67.0271 69.6636 66.4141 70.069 65.6884 70.1708C64.1743 70.3831 61.72 70.5179 59.6767 69.6522C58.1815 69.0188 57.1877 68.5428 56.537 67.5184C56.0443 66.7427 55.6931 66.0553 55.4618 65.5389C55.3462 65.2808 55.2611 65.067 55.204 64.9081C55.1754 64.8285 55.1547 64.7641 55.1405 64.7167C55.1282 64.6754 55.1239 64.6553 55.1229 64.6512C55.0793 64.3787 54.8223 64.1927 54.5497 64.2362ZM75.4462 51.413C75.1701 51.4131 74.9462 51.6369 74.9462 51.913V52.412C74.9462 52.8979 74.9459 53.8538 74.9042 54.8593C74.8927 55.1352 75.1078 55.3683 75.3837 55.3798C75.6593 55.3911 75.8925 55.1769 75.9042 54.9012C75.9469 53.8731 75.9462 52.8982 75.9462 52.412V51.913C75.9462 51.6368 75.7223 51.413 75.4462 51.413ZM53.119 49.7372C52.843 49.7295 52.6131 49.9475 52.6054 50.2235C52.6002 50.4075 52.529 51.1008 52.2811 51.7489C52.245 51.8252 52.2108 51.8985 52.1747 51.9725C52.1367 52.0504 52.0971 52.1303 52.0585 52.2128C51.9932 52.3523 51.9376 52.4871 51.6659 52.8876C51.5112 53.1161 51.5713 53.427 51.7997 53.5819C52.0281 53.7366 52.3391 53.6774 52.494 53.4491C52.8031 52.9936 52.8837 52.8099 52.9647 52.6366C52.9993 52.5627 53.0348 52.4896 53.0731 52.411C53.111 52.3334 53.1513 52.2498 53.1933 52.161C53.1983 52.1504 53.2036 52.1398 53.2079 52.1288C53.5131 51.342 53.5969 50.5178 53.6044 50.2509C53.6119 49.975 53.3949 49.745 53.119 49.7372Z" fill="#B1D5E5"/>
  </svg>`;
 
  const SVG2 = `<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M54.9091 15.0341C59.151 14.9349 64.9693 15.0293 72.0243 15.6268C75.5348 15.9242 78.5147 16.1891 80.9325 16.4071C82.1344 16.8592 83.4088 17.4442 84.7753 18.3114C85.9446 19.0534 87.1622 19.4322 89.3085 21.162C91.4274 22.8698 94.3766 25.8584 98.6815 31.6395C100.386 33.9291 101.8 36.0028 103.055 38.7264C104.31 41.4528 105.413 44.8497 106.474 49.7841C107.06 52.5161 108.318 59.7261 107.075 69.8075C106.544 74.1138 105.752 78.3783 104.63 82.076C103.505 85.7836 102.062 88.8751 100.258 90.8778C97.8833 93.5133 91.099 100.052 81.6102 102.559C77.2832 103.703 68.462 104.507 57.412 103.866C52.7817 103.598 50.0252 103.22 46.9227 102.27C40.2249 100.221 34.9087 98.3442 31.2392 95.8007C26.3548 92.4151 22.9159 89.9363 21.2333 87.9725L21.077 87.7899C16.2426 82.1483 13.0917 78.4458 13.0292 72.0565C12.9817 67.1975 12.9695 62.6601 13.1727 58.7772C13.3766 54.8836 13.795 51.698 14.5858 49.5184C16.4201 44.4635 17.7694 41.2288 19.0477 39.5526C21.1963 36.7356 25.4866 31.1913 32.9423 25.371C36.7272 22.4163 39.848 20.076 42.2724 18.4169C43.4845 17.5873 44.5163 16.9323 45.3661 16.4569C46.2248 15.9765 46.8656 15.6977 47.3036 15.5946C48.0129 15.4277 50.6486 15.1337 54.9091 15.0341ZM54.705 64.8485C54.4288 64.8485 54.205 65.0724 54.205 65.3485C54.205 65.3786 54.2059 65.5885 54.2518 65.9637C54.2959 66.3232 54.4745 66.6465 54.7138 66.9354C54.9537 67.225 55.2783 67.5086 55.663 67.7919C56.4314 68.3576 57.5147 68.9758 58.8417 69.6835C61.1966 70.9393 64.1488 70.8741 65.7011 70.7772C65.7525 70.774 65.8034 70.7627 65.8515 70.744C66.2351 70.5946 67.0496 70.1283 68.0448 69.5214L68.0468 69.5204C68.4591 69.266 68.6571 69.1367 69.2753 68.7968C69.5173 68.6637 69.6056 68.359 69.4726 68.1171C69.3395 67.8753 69.0357 67.787 68.7938 67.9198C68.1506 68.2735 67.9323 68.4153 67.5214 68.6688C66.5715 69.2481 65.8739 69.6421 65.5536 69.7831C63.9935 69.8755 61.3583 69.8927 59.3124 68.8016C57.9851 68.0938 56.9607 67.5053 56.2567 66.9872C55.9054 66.7285 55.6518 66.4999 55.4843 66.2977C55.3166 66.0953 55.2579 65.9466 55.245 65.8426C55.2247 65.6767 55.2147 65.5512 55.2099 65.4686C55.2075 65.4274 55.2065 65.3967 55.206 65.3768C55.2057 65.367 55.205 65.3599 55.205 65.3553C55.2049 65.351 55.205 65.3487 55.205 65.3485C55.205 65.0724 54.9811 64.8485 54.705 64.8485ZM75.3202 53.1376C75.0441 53.1376 74.8202 53.3614 74.8202 53.6376C74.8202 53.9137 75.0441 54.1376 75.3202 54.1376H75.3388C75.6148 54.1375 75.8388 53.9137 75.8388 53.6376C75.8388 53.3615 75.6148 53.1377 75.3388 53.1376H75.3202ZM52.2919 51.3055C52.0386 51.3117 51.9108 51.4899 51.8788 51.5409C51.8401 51.6026 51.8242 51.6587 51.8192 51.6766C51.8123 51.7015 51.8086 51.7226 51.8065 51.7352L51.7987 51.8016C51.7957 51.8388 51.7911 51.9077 51.7987 51.9882C51.8058 52.0632 51.8268 52.1877 51.8993 52.3114C52.074 52.6089 52.3987 52.6626 52.5751 52.6854C52.8487 52.7206 53.099 52.5273 53.1347 52.2538C53.1659 52.0124 53.0195 51.7886 52.7968 51.7147C52.7883 51.6718 52.7762 51.6288 52.7558 51.5878L52.7548 51.5858C52.7543 51.5848 52.7528 51.5829 52.7518 51.5809C52.75 51.5773 52.7464 51.5711 52.7421 51.5634C52.7367 51.5538 52.7149 51.5127 52.6757 51.4696C52.6515 51.443 52.5195 51.3 52.2919 51.3055ZM51.9599 52.1669C51.9483 52.1558 51.9397 52.1472 51.9354 52.1425C51.934 52.1409 51.9329 52.1391 51.9315 52.1376C51.9405 52.1479 51.9502 52.1574 51.9599 52.1669ZM51.8847 52.0721C51.8786 52.0625 51.8726 52.0564 51.871 52.0536C51.8664 52.0454 51.8626 52.0377 51.8612 52.035C51.8678 52.0483 51.8771 52.0598 51.8847 52.0721Z" fill="#B1D5E5"/>
  </svg>`;
 
  const stage = document.getElementById('smiley');
 
  // sequence: [which svg, flipped?, hold duration in ms]
  const sequence = [
    { svg: SVG1, flip: false, duration: 4000 },
    { svg: SVG2, flip: false, duration: 300  },
    { svg: SVG1, flip: true,  duration: 2000 },
    { svg: SVG2, flip: true,  duration: 300  }
  ];
 
  let step = 0;
 
  function render(){
    const frame = sequence[step];
    stage.innerHTML = frame.svg;
    const el = stage.querySelector('svg');
    el.style.transform = frame.flip ? 'scaleX(-1)' : 'scaleX(1)';
    setTimeout(() => {
      step = (step + 1) % sequence.length;
      render();
    }, frame.duration);
  }
 
  render();
})();

/* ---------- config ---------- */
const API_URL = "https://r.eaglegang.de/faq/2/ask";

// Shown as clickable suggestions on first load. Edit freely —
// these are just UI hints, not tied to any backend data anymore.
const QUICK_START = [
  "Who the hell are you?",
  "What have you been working on?",
  "Show me your doggo!"
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
  "Hi, I'm Miao (not really), a user experience designer with many many years of professional experience. Ask anything about me, my work, and my design philosophy!"
);
addQuickStartChips();

/* ---------- image-aware message rendering ---------- */
function renderRichContent(container, text){
  const IMAGE_MD = /!\[([^\]]*)\]\(([^)]+)\)/g; // local, fresh each call
  let lastIndex = 0;
  let match;

  while((match = IMAGE_MD.exec(text)) !== null){
    // text before the image
    const before = text.slice(lastIndex, match.index);
    if(before.trim()){
      const span = document.createElement("span");
      span.className = "bubble-text";
      span.textContent = before;
      container.appendChild(span);
    }

    // the image itself
    const img = document.createElement("img");
    img.src = match[2];
    img.alt = match[1] || "";
    img.loading = "lazy";
    img.className = "bubble-image";
    container.appendChild(img);

    lastIndex = IMAGE_MD.lastIndex;
  }

  // remaining text after the last image
  const rest = text.slice(lastIndex);
  if(rest.trim()){
    const span = document.createElement("span");
    span.className = "bubble-text";
    span.textContent = rest;
    container.appendChild(span);
  }
}

function addBotMessage(text){
  const wrap = document.createElement("div");
  wrap.className = "msg bot";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  renderRichContent(bubble, text);
  wrap.appendChild(bubble);
  chatScroll.appendChild(wrap);
  scrollToBottom();
}

/* ---------- lightbox ---------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(src, alt){
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.hidden = false;
}

function closeLightbox(){
  lightbox.hidden = true;
  lightboxImg.src = ""; // stop loading/free memory
}

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


function renderRichContent(container, text){
  const pattern = new RegExp(RICH_PATTERN.source, "g"); // fresh instance per call
  let lastIndex = 0;
  let match;

  while((match = pattern.exec(text)) !== null){
    const before = text.slice(lastIndex, match.index);
    if(before.trim()){
      const span = document.createElement("span");
      span.className = "bubble-text";
      span.textContent = before;
      container.appendChild(span);
    }

    if(match[1] !== undefined){
      // image match: ![alt](url)
      const img = document.createElement("img");
      img.src = match[2];
      img.alt = match[1] || "";
      img.loading = "lazy";
      img.className = "bubble-image";
      container.appendChild(img);
    } else {
      // file match: [[file: label | url]]
      const label = match[3].trim();
      const url = match[4].trim();
      container.appendChild(buildFileCard(label, url));
    }

    lastIndex = pattern.lastIndex;
  }

  const rest = text.slice(lastIndex);
  if(rest.trim()){
    const span = document.createElement("span");
    span.className = "bubble-text";
    span.textContent = rest;
    container.appendChild(span);
  }
}

function buildFileCard(label, url){
  const card = document.createElement("a");
  card.className = "file-card";
  card.href = url;
  card.download = label; // suggests filename, browser still respects Content-Disposition/type
  card.target = "_blank";
  card.rel = "noopener";

  card.innerHTML = `
    <span class="file-card-icon"><i data-lucide="file-text"></i></span>
    <span class="file-card-label"></span>
    <span class="file-card-download"><i data-lucide="download"></i></span>
  `;
  card.querySelector(".file-card-label").textContent = label;

  return card;
}

/* ---------- suggested follow-ups ---------- */
function extractSuggestions(text){
  const match = text.match(/\[\[suggest:\s*([^\]]+)\]\]/i);
  if(!match) return { text, suggestions: [] };

  const suggestions = match[1].split("|").map(s => s.trim()).filter(Boolean);
  const cleanText = (text.slice(0, match.index) + text.slice(match.index + match[0].length)).trim();
  return { text: cleanText, suggestions };
}

function addChipBox(heading, questions){
  const wrap = document.createElement("div");
  wrap.className = "msg bot";
  const box = document.createElement("div");
  box.className = "chip-box";

  if(heading){
    const headingEl = document.createElement("div");
    headingEl.className = "chip-heading";
    headingEl.textContent = heading;
    box.appendChild(headingEl);
  }

  const row = document.createElement("div");
  row.className = "chips-row";
  questions.forEach(question=>{
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

function addBotMessage(text){
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
  lucide.createIcons();
  scrollToBottom();
}

function buildChipsRow(questions){
  const row = document.createElement("div");
  row.className = "chips-row chips-row--inline";
  questions.forEach(question=>{
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.textContent = question;
    chip.addEventListener("click", ()=>handleUserInput(question));
    row.appendChild(chip);
  });
  return row;
}