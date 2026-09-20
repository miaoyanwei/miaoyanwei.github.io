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
 *   [[video: url]]                 -> video embed (YouTube/Vimeo link or direct file)
 *   [[file: label | url]]          -> downloadable file card
 *   [label](url)                   -> link card
 *   bare https://...                -> link card (auto-labelled)
 * See BUBBLE_SPLIT_PATTERN below for splitting one answer into
 * multiple bubbles, and /data/sample-qna.json for worked examples.
 */
export const RICH_PATTERN =
  /!\[([^\]]*)\]\(([^)]+)\)|\[\[video:\s*([^\]]+?)\s*\]\]|\[\[file:\s*([^|]+?)\s*\|\s*([^\]]+?)\]\]|\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s)\]]+)/g;

/** Marks the end of an answer with a row of follow-up chips: [[suggest: A | B | C]] */
export const SUGGEST_PATTERN = /\[\[suggest:\s*([^\]]+)\]\]/i;

/** Splits an answer into separate consecutive bubbles: [[bubble]] on
 *  its own, anywhere in the text. Each side becomes its own message
 *  bubble, rendered together as one grouped reply (one sound, one set
 *  of trailing suggestion chips on the last bubble). */
export const BUBBLE_SPLIT_PATTERN = /\s*\[\[bubble\]\]\s*/gi;
