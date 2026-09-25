/* =========================================================
   richContent.js — turns the markdown-ish syntax used in
   answer strings (images, file cards, link cards, bare URLs,
   suggestion chips) into DOM. See /data/sample-qna.json for
   one worked example of each syntax.
   ========================================================= */

import { RICH_PATTERN, SUGGEST_PATTERN, BUBBLE_SPLIT_PATTERN } from "./config.js";

/** Matches youtube.com/watch?v=ID, youtu.be/ID, and youtube.com/embed/ID. */
const YOUTUBE_RE = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/i;
/** Matches vimeo.com/ID (and player.vimeo.com/video/ID). */
const VIMEO_RE = /vimeo\.com\/(?:video\/)?(\d+)/i;

/** Builds a video embed for `url`: a responsive iframe for
 *  recognised YouTube/Vimeo links, or a native <video> player
 *  for anything else (assumed to be a direct video file). */
function buildVideoEmbed(url){
  const youtube = url.match(YOUTUBE_RE);
  const vimeo = url.match(VIMEO_RE);

  if(youtube || vimeo){
    const wrap = document.createElement("div");
    wrap.className = "video-embed";
    const iframe = document.createElement("iframe");
    iframe.src = youtube
      ? `https://www.youtube.com/embed/${youtube[1]}`
      : `https://player.vimeo.com/video/${vimeo[1]}`;
    iframe.title = "Embedded video";
    iframe.loading = "lazy";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.setAttribute("frameborder", "0");
    wrap.appendChild(iframe);
    return wrap;
  }

  const video = document.createElement("video");
  video.className = "bubble-video";
  video.controls = true;
  video.preload = "metadata";
  video.src = url;
  return video;
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
      // video match: [[video: url]]
      container.appendChild(buildVideoEmbed(match[3].trim()));
    } else if(match[4] !== undefined){
      // file match: [[file: label | url]]
      const label = match[4].trim();
      const url = match[5].trim();
      container.appendChild(buildFileCard(label, url));
    } else if(match[6] !== undefined){
      // plain link match: [label](url)
      const label = match[6].trim();
      const url = match[7].trim();
      container.appendChild(buildLinkCard(label, url));
    } else if(match[8] !== undefined){
      // bare URL, no markdown wrapping — strip trailing sentence punctuation
      const rawUrl = match[8].replace(/[.,;:!?]+$/, "");
      container.appendChild(buildLinkCard(deriveLinkLabel(rawUrl), rawUrl));
    } else if(match[9] !== undefined){
      // [svg] token -> inline signature mark
      container.appendChild(buildSignatureSvg());
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

/** Splits an answer on `[[bubble]]` into the text for each separate
 *  reply bubble. With no marker, returns the whole text as one bubble.
 *  Empty segments (e.g. a stray marker at the very start/end) are
 *  dropped so no blank bubble ever renders. */
export function splitBubbles(text){
  return text
    .split(BUBBLE_SPLIT_PATTERN)
    .map(part => part.trim())
    .filter(Boolean);
}

/** The signature-scribble mark, inserted wherever an answer string
 *  contains the literal token [svg]. Built with createElementNS
 *  (not innerHTML) so it's real, static, trusted markup — never
 *  parsed out of untrusted text. */
function buildSignatureSvg(){
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 122 20");
  svg.setAttribute("fill", "none");
  svg.classList.add("bubble-signature");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("d",
    "M13.653 14.5596C13.6611 13.1969 13.7735 10.0403 14.332 8.52602C14.6595 7.63826 15.3721 7.35447 16.0799 7.07258L16.1026 7.06355C16.4026 6.94403 16.7579 6.9677 17.1138 6.99901C17.7579 7.0557 18.3891 7.96003 19.5298 9.8757C20.1471 11.7564 20.2459 13.032 20.3264 14.1358C20.343 14.3572 20.3556 14.5821 20.3685 14.8137M30.9934 6.8291C30.0351 6.8291 27.9864 6.92245 27.7174 7.15869C26.8485 7.92184 26.5108 9.36223 26.3759 10.2049C26.2428 11.0372 26.4177 11.7274 26.574 12.0313C26.9341 12.7316 28.3096 12.99 29.3874 13.1593C30.3407 13.3091 31.1027 13.1233 31.4222 12.9779C32.253 12.5999 32.6622 11.6397 33.0596 10.3028C33.263 9.6187 33.0948 9.10116 32.9894 8.8235C32.5608 8.21053 31.869 7.54673 31.1454 7.35613C30.9326 7.32365 30.7009 7.29639 30.4622 7.26831M40.319 3.56299C40.319 3.56983 40.3236 4.62809 40.349 6.48705M40.349 6.48705C40.3608 7.34695 40.377 8.37816 40.3993 9.55589C40.4592 12.7241 41.3036 13.7744 41.7544 14.1383C42.0513 14.2589 42.9418 14.314 44.1438 14.3105C44.6188 14.3045 44.82 14.2899 44.9593 13.9888M40.349 6.48705C39.7215 6.49127 39.1908 6.49127 38.7846 6.49127H37.444M40.349 6.48705C41.7444 6.47768 43.6185 6.44748 45.667 6.3501M59.1387 6.1889C59.1387 6.17854 59.1292 8.25736 59.1357 11.5308C59.1385 12.9524 59.261 13.3204 59.3397 13.4344C60.0034 14.3962 60.3068 10.1121 61.0634 8.58827C61.6698 7.36686 62.7429 6.52412 64.1001 5.5321C64.4389 5.32448 64.7631 5.16488 64.9968 5.07205C65.2305 4.97922 65.3639 4.958 65.5254 4.91992M70.5737 10.4603C71.0277 10.4551 72.5082 10.2441 73.6514 9.48318C74.3793 8.99873 74.7276 8.19157 74.9062 7.31827C75.087 6.43374 74.8642 5.74179 74.708 5.52112C74.5446 5.29038 74.2283 5.23294 73.9239 5.19957C73.207 5.121 72.5704 5.53102 71.5138 6.14665C70.7576 6.58732 69.7081 9.07454 69.0616 11.2297C68.7219 12.3617 69.0505 13.257 69.1327 13.5289C69.4432 14.0214 70.2703 14.7123 71.6623 15.3154C72.125 15.448 72.7315 15.5862 73.7313 15.7124M85.1219 7.0249C84.2677 7.03146 81.4309 7.31187 80.4147 7.67987C79.6105 7.97112 79.4474 9.38935 79.3171 10.3584C79.215 11.118 79.4129 11.7822 79.663 12.1513C80.0515 12.7245 80.7991 12.8046 81.6413 12.8222C83.1694 12.8541 84.3549 10.6644 84.7791 9.74914C85.0762 9.1081 85.0018 8.22994 85.0597 7.73274C85.1175 7.66915 85.2327 7.9887 85.6909 8.89085C86.1491 9.793 86.9468 11.2681 87.7848 12.8746M91.6959 1.84424C91.6959 1.865 91.6959 4.54729 91.7208 8.73375C91.7458 10.2486 91.7956 10.5258 91.8223 10.9164C91.849 11.307 91.8511 11.8025 91.8532 12.3131M96.8873 0.5C96.8873 0.560907 96.8873 3.05312 96.9297 6.9893C97.0569 8.87992 97.1917 9.57632 97.2765 10.4004C97.3139 10.9559 97.3398 11.7902 97.3666 12.6499M102.387 5.23785C102.387 6.83003 102.593 10.2861 103.056 10.6484C103.267 10.814 103.616 10.5861 103.88 10.3367C105.505 8.8052 106.385 5.40412 106.926 4.35211C107.713 2.82363 109.017 9.66157 109.462 12.6888C109.773 14.8061 109.324 16.2717 108.875 16.672C107.596 17.4551 106.526 17.7926 105.888 17.7837C105.552 17.7443 105.19 17.6343 104.817 17.5209M5.22327 6.02218C4.87444 6.02218 3.75708 6.28441 2.90573 6.99129C1.53346 8.13069 0.961294 10.2372 0.659123 12.0864C0.117705 15.3996 1.06494 16.6406 1.89538 17.7285L1.89691 17.7305C2.12355 17.9469 2.34097 18.1098 2.55153 18.2745C2.7621 18.4391 2.95923 18.6005 3.63948 19.1687M115.47 2.85736C116.304 2.77438 118.516 2.90396 119.506 3.71512C120.495 4.52463 120.82 6.4676 121.181 9.08107C121.646 12.4547 120.454 13.8481 119.643 14.9964C119.444 15.2272 119.261 15.3847 119.078 15.5524C118.894 15.7201 118.718 15.8933 118.195 16.0855"
  );
  path.setAttribute("stroke", "var(--text)");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  svg.appendChild(path);

  return svg;
}

