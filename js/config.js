/* =========================================================
   config.js — single place to tweak behaviour without
   touching logic elsewhere. Add new constants here as the
   project grows instead of scattering literals through the
   other modules.
   ========================================================= */

/** Backend that answers chat questions. */
export const API_URL = "https://r.eaglegang.de/faq/2/ask";

/**
 * Shown as clickable suggestions on first load. Purely a UI
 * hint — not tied to any backend data, safe to edit freely.
 */
export const QUICK_START = [
  "Who the hell are you?",
  "What have you been working on?",
  "Show me your doggo!"
];

/**
 * Recognises rich content embedded in an answer string:
 *   ![alt](url)                    -> image
 *   [[file: label | url]]          -> downloadable file card
 *   [label](url)                   -> link card
 *   bare https://...                -> link card (auto-labelled)
 * See /data/sample-qna.json for worked examples of each.
 */
export const RICH_PATTERN =
  /!\[([^\]]*)\]\(([^)]+)\)|\[\[file:\s*([^|]+?)\s*\|\s*([^\]]+?)\]\]|\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s)\]]+)/g;

/** Marks the end of an answer with a row of follow-up chips: [[suggest: A | B | C]] */
export const SUGGEST_PATTERN = /\[\[suggest:\s*([^\]]+)\]\]/i;
