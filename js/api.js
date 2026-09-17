/* =========================================================
   api.js — talks to the FAQ backend. The chat/UI layer never
   touches fetch() directly; it just calls handleUserInput().
   ========================================================= */

import { API_URL } from "./config.js";
import { addUserMessage, addTypingIndicator, removeTypingIndicator, addBotMessage } from "./chat.js";

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

/** Sends a question to the backend and renders the exchange (or a
 *  friendly failure message) into the chat. This is the one entry
 *  point the composer, quick-start chips, and suggestion chips all call. */
export async function handleUserInput(text){
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
