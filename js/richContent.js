/* =========================================================
   richContent.js — turns the markdown-ish syntax used in
   answer strings (images, file cards, link cards, bare URLs,
   suggestion chips) into DOM. See /data/sample-qna.json for
   one worked example of each syntax.
   ========================================================= */

import { RICH_PATTERN, SUGGEST_PATTERN } from "./config.js";

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

function deriveLinkLabel(url){
  try{
    const u = new URL(url);
    const segments = u.pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    if(last){
      return decodeURIComponent(last).replace(/[-_]+/g, " ").replace(/\.\w+$/, "");
    }
    return u.hostname.replace(/^www\./, "");
  }catch{
    return url;
  }
}

function buildLinkCard(label, url){
  const card = document.createElement("a");
  card.className = "file-card";
  card.href = url;
  card.target = "_blank";
  card.rel = "noopener noreferrer";

  card.innerHTML = `
    <span class="file-card-icon"><i data-lucide="link"></i></span>
    <span class="file-card-label"></span>
    <span class="file-card-download"><i data-lucide="arrow-up-right"></i></span>
  `;
  card.querySelector(".file-card-label").textContent = label;

  return card;
}

/** Parses `text` for embedded rich content and appends the resulting
 *  DOM (text spans, images, file cards, link cards) into `container`. */
export function renderRichContent(container, text){
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
    } else if(match[3] !== undefined){
      // file match: [[file: label | url]]
      const label = match[3].trim();
      const url = match[4].trim();
      container.appendChild(buildFileCard(label, url));
    } else if(match[5] !== undefined){
      // plain link match: [label](url)
      const label = match[5].trim();
      const url = match[6].trim();
      container.appendChild(buildLinkCard(label, url));
    } else if(match[7] !== undefined){
      // bare URL, no markdown wrapping — strip trailing sentence punctuation
      const rawUrl = match[7].replace(/[.,;:!?]+$/, "");
      container.appendChild(buildLinkCard(deriveLinkLabel(rawUrl), rawUrl));
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

/** Splits a trailing `[[suggest: A | B | C]]` tag off an answer string.
 *  Returns the cleaned text plus the list of suggested follow-up questions. */
export function extractSuggestions(text){
  const match = text.match(SUGGEST_PATTERN);
  if(!match) return { text, suggestions: [] };

  const suggestions = match[1].split("|").map(s => s.trim()).filter(Boolean);
  const cleanText = (text.slice(0, match.index) + text.slice(match.index + match[0].length)).trim();
  return { text: cleanText, suggestions };
}
