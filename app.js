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
  const SVG1 = `<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1207_187)">
      <path d="M99.569 40C100.34 40.0134 101.026 40.0316 101.576 40.0615C104.76 40.7543 107.443 41.8809 111.23 44.7516C113.236 46.6829 117.326 50.6113 123.023 59.0727C125.927 63.3865 130.626 70.559 133.424 75.1267C136.22 79.6894 137.133 81.4755 138.015 84.503C139.099 88.2209 140.006 91.4085 140.65 94.0588C141.3 96.7275 141.662 98.7653 141.694 100.213C141.808 105.266 142.015 110.611 140.504 114.883C139.11 118.822 137.465 122.627 135.581 125.802C133.687 128.995 131.611 131.447 129.401 132.808C126.263 134.739 122.389 136.708 116.556 137.824C112.784 138.546 107.473 139.308 99.5765 139.691C91.6592 140.075 81.4653 140.08 75.2065 139.822C68.9333 139.563 66.7627 139.128 65.3521 138.67C63.094 137.936 59.8067 136.225 54.6571 131.281C51.4543 128.206 47.345 123.934 45.0373 121.182C41.8697 117.405 40.5622 115.388 39.8278 113.339C39.1149 111.351 38.2072 108.365 38.0925 100.739C38.006 94.9854 37.7778 85.9703 38.6471 79.6863C40.0519 69.5326 41.5018 63.8692 43.5643 60.5597C45.5594 57.3583 48.1843 53.6825 52.3283 49.936C57.0395 45.6768 61.0253 41.9606 69.268 41.2246C75.9998 40.6237 87.3718 40.4039 93.1223 40.2936C98.8371 40.184 98.8869 40.1844 98.9103 40.1844C99.1512 40.1842 99.3764 40.1156 99.569 40ZM102.397 104.719C101.689 104.762 101.15 105.371 101.193 106.079C101.246 106.949 101.221 107.584 101.144 108.149C100.921 109.251 100.67 110.051 100.427 110.614C99.5772 111.659 98.6227 112.844 97.5815 113.878C96.4779 114.974 95.4082 115.764 94.4285 116.063C92.8902 116.533 91.2865 116.69 89.4022 115.868C86.9386 114.792 84.9965 113.776 84.0195 112.034C83.7938 111.632 83.5757 110.755 83.4261 109.657C83.2844 108.617 83.2291 107.582 83.2291 107.017C83.2286 106.308 82.6533 105.733 81.9443 105.732C81.2351 105.733 80.6599 106.308 80.6594 107.017C80.6594 107.702 80.7234 108.854 80.8803 110.005C81.0293 111.098 81.2896 112.418 81.7786 113.29C83.234 115.886 86.0005 117.186 88.3746 118.223C90.9837 119.362 93.2515 119.109 95.18 118.52C96.7715 118.033 98.2052 116.879 99.3921 115.701C100.596 114.505 101.684 113.141 102.53 112.102C102.598 112.019 102.656 111.926 102.701 111.829C103.078 111.012 103.405 109.948 103.673 108.608C103.678 108.584 103.682 108.56 103.686 108.535C103.795 107.756 103.819 106.938 103.757 105.923C103.714 105.215 103.105 104.676 102.397 104.719ZM77.6293 74.2999C76.9519 74.0906 76.232 74.4696 76.022 75.1468C75.1852 77.853 74.7792 80.0318 74.8 82.1781C74.8209 84.3238 75.2673 86.3554 76.0233 88.7602C76.236 89.4369 76.9576 89.8133 77.6343 89.6008C78.3108 89.3878 78.6876 88.6665 78.475 87.9898C77.755 85.6996 77.387 83.9405 77.3696 82.153C77.3523 80.3661 77.6846 78.4673 78.4762 75.9071C78.6855 75.2297 78.3064 74.5099 77.6293 74.2999ZM100.582 75.5433C99.8814 75.43 99.221 75.9059 99.1073 76.606C98.358 81.2295 98.2572 83.649 99.1248 87.3813C99.2856 88.0721 99.9759 88.5015 100.667 88.3411C101.358 88.1801 101.787 87.49 101.627 86.7991C100.863 83.5158 100.924 81.464 101.644 77.0175C101.758 76.3175 101.281 75.6571 100.582 75.5433Z" fill="#B1D5E5"/>
    </g>
    <defs>
      <clipPath id="clip0_1207_187"><rect width="180" height="180" fill="white"/></clipPath>
    </defs>
  </svg>`;
 
  const SVG2 = `<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1207_237)">
      <path d="M99.5676 40C100.339 40.0134 101.026 40.0319 101.576 40.0618C104.76 40.7547 107.443 41.8819 111.229 44.7523L111.249 44.77C113.262 46.7078 117.343 50.6384 123.022 59.0729C125.926 63.3867 130.626 70.5589 133.424 75.1266C136.219 79.6886 137.131 81.4752 138.014 84.5023C139.098 88.2199 140.005 91.408 140.65 94.0581C141.299 96.7267 141.659 98.7655 141.692 100.213C141.697 100.457 141.704 100.702 141.71 100.946C141.823 105.779 141.94 110.817 140.501 114.882C139.107 118.821 137.463 122.627 135.579 125.802C133.685 128.995 131.61 131.448 129.4 132.808C126.262 134.739 122.388 136.707 116.556 137.824C112.783 138.546 107.471 139.308 99.5747 139.691C91.6578 140.075 81.4655 140.08 75.2071 139.822C68.9343 139.563 66.7632 139.128 65.3526 138.67C63.0945 137.936 59.8066 136.225 54.6573 131.282C51.4545 128.207 47.3455 123.933 45.0378 121.182C41.8706 117.405 40.5623 115.388 39.8279 113.34C39.115 111.351 38.2077 108.363 38.093 100.738C38.0863 100.291 38.0779 99.8225 38.0701 99.3387C37.9769 93.5987 37.8462 85.4812 38.6478 79.6863C40.0524 69.5337 41.5023 63.8701 43.5644 60.5604C45.5594 57.3592 48.1849 53.6822 52.3288 49.9357C52.4052 49.8666 52.4824 49.7978 52.5585 49.729C57.1708 45.5574 61.1597 41.9484 69.2676 41.2243C75.9989 40.6235 87.3702 40.4036 93.1211 40.2933C98.7302 40.1857 98.8829 40.1855 98.9087 40.1855C99.1495 40.1854 99.375 40.1154 99.5676 40ZM102.396 104.718C101.688 104.761 101.149 105.371 101.191 106.079C101.244 106.945 101.22 107.579 101.144 108.142C100.92 109.249 100.665 110.052 100.421 110.617C99.5719 111.66 98.6197 112.846 97.5801 113.878C96.4768 114.974 95.4061 115.764 94.4266 116.064C92.8888 116.533 91.286 116.69 89.4023 115.868C86.9384 114.792 84.9963 113.776 84.0192 112.034C83.7936 111.631 83.5752 110.755 83.4256 109.658C83.284 108.619 83.2278 107.584 83.2278 107.018C83.2275 106.309 82.6526 105.733 81.9434 105.732C81.2342 105.732 80.6593 106.309 80.659 107.018C80.6591 107.703 80.7231 108.854 80.8799 110.004C81.0288 111.097 81.2886 112.418 81.7773 113.29C83.2327 115.885 86 117.186 88.374 118.223C90.983 119.362 93.2507 119.109 95.1792 118.519C96.7702 118.033 98.2044 116.88 99.391 115.702C100.595 114.506 101.682 113.139 102.529 112.101C102.596 112.018 102.655 111.926 102.7 111.829C103.077 111.012 103.403 109.948 103.672 108.608C103.676 108.585 103.681 108.56 103.684 108.536C103.794 107.757 103.818 106.937 103.756 105.923C103.713 105.215 103.104 104.676 102.396 104.718ZM78.1751 81.5025C77.6691 81.3309 77.21 81.5039 76.9367 81.7268C76.7214 81.9029 76.618 82.1041 76.5816 82.1791C76.5004 82.3467 76.4655 82.5054 76.4526 82.5695C76.4202 82.731 76.4007 82.9236 76.3872 83.1172L76.3855 83.1561C76.3762 83.3916 76.373 83.7742 76.419 84.1012C76.447 84.2994 76.4983 84.5124 76.6045 84.739C76.7017 84.946 76.8229 85.1177 76.9261 85.2531C77.356 85.817 78.162 85.9262 78.7263 85.4969C79.2901 85.0668 79.3997 84.2609 78.9701 83.6967C78.966 83.6913 78.9613 83.6855 78.9577 83.6808C78.9504 83.5826 78.9452 83.4325 78.9507 83.278C78.954 83.232 78.9602 83.194 78.963 83.1649C78.9672 83.154 78.975 83.1425 78.9789 83.1313C79.2062 82.4599 78.8463 81.7306 78.1751 81.5025ZM102.14 81.9424C101.45 82.0053 100.758 82.0174 100.386 82.0236C100.201 82.0267 100.106 82.0282 100.057 82.0289H100.018C99.3091 82.0296 98.7338 82.6059 98.7338 83.3151C98.7345 84.0236 99.3096 84.5988 100.018 84.5994C100.041 84.5994 100.07 84.5984 100.43 84.5924C100.801 84.5861 101.579 84.5731 102.375 84.5005C103.081 84.4357 103.601 83.8109 103.537 83.1048C103.473 82.3982 102.847 81.8778 102.14 81.9424ZM78.0426 83.9705C77.9927 83.9819 77.942 83.9882 77.8924 83.9935C77.9498 83.9875 78.0064 83.9769 78.062 83.9634C78.0557 83.9651 78.049 83.969 78.0426 83.9705Z" fill="#B1D5E5"/>  
    </g>
    <defs>
      <clipPath id="clip0_1207_237"><rect width="180" height="180" fill="white"/></clipPath>
    </defs>
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