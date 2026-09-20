/* =========================================================
   intro.js — the one-off opening animation: a ~400px smiley
   bounces up from below the viewport, overshoots so 80% of
   its height clears the bottom edge, holds with a quick blink,
   then shrinks and springs down into the real #smiley's exact
   size and position. Runs once on boot; see main.js.
   ========================================================= */

import { SMILEY_SVG, SMILEY_SVG_BLINK } from "./smiley.js";

const RISE_DURATION = 750;     // bounce up from off-screen to the overshoot peak
const HOLD_BEFORE_BLINK = 600; // pause at the peak before the blink
const BLINK_DURATION = 200;    // how long the blink frame is shown
const HOLD_AFTER_BLINK = 600;  // pause again after blinking back, before settling
const SETTLE_DURATION = 850;   // shrink + spring down into place

const BIG_SIZE = 400; // "around 400 x 400 pixel"

// "Back"-style eases: the y-control-points outside 0–1 are what
// produce the overshoot, giving both phases a springy, lively feel.
const RISE_EASING = "cubic-bezier(0.22, 1.6, 0.36, 1)";
const SETTLE_EASING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** True when the visitor has asked the OS/browser for less motion. */
export function prefersReducedMotion(){
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Plays the intro in `overlayEl` (a fixed, full-viewport layer) and
 * lands it exactly on `targetEl`'s current size/position. Resolves
 * once the animation completes, at which point `overlayEl` is hidden
 * again and `targetEl` is ready to receive the idle-loop content.
 */
export async function playIntroAnimation(overlayEl, targetEl){
  // Clamped only as a safety net on very narrow viewports, so the
  // ~400px smiley never overflows a phone screen horizontally.
  const bigSize = Math.min(BIG_SIZE, window.innerWidth * 0.9);
  const startY = window.innerHeight; // fully below the fold
  // Peak: rises just enough that 80% of its height clears the bottom
  // edge of the screen — a small hop, not a trip to the top. The
  // remaining 20% still hangs below the fold at the peak.
  const peakY = window.innerHeight - bigSize * 0.8;

  const targetRect = targetEl.getBoundingClientRect();

  overlayEl.innerHTML = SMILEY_SVG;
  overlayEl.style.width = `${bigSize}px`;
  overlayEl.style.height = `${bigSize}px`;
  overlayEl.style.transform = `translate(-50%, ${startY}px)`;
  overlayEl.hidden = false;

  // Phase 1 — bounce up from the bottom edge to the overshoot peak.
  const rise = overlayEl.animate(
    [
      { transform: `translate(-50%, ${startY}px)` },
      { transform: `translate(-50%, ${peakY}px)` }
    ],
    { duration: RISE_DURATION, easing: RISE_EASING, fill: "forwards" }
  );
  await rise.finished;

  // Phase 2 — hold at the peak, with an instant blink partway through:
  // wait, snap to the blink frame, wait again, snap back, then hold
  // once more before settling — no easing on the swaps themselves,
  // just a quick frame swap, like the idle loop's own blink.
  await sleep(HOLD_BEFORE_BLINK);
  overlayEl.innerHTML = SMILEY_SVG_BLINK;
  await sleep(BLINK_DURATION);
  overlayEl.innerHTML = SMILEY_SVG;
  await sleep(HOLD_AFTER_BLINK);

  // Phase 3 — shrink and spring down into the real smiley's spot.
  const settle = overlayEl.animate(
    [
      { transform: `translate(-50%, ${peakY}px)`, width: `${bigSize}px`, height: `${bigSize}px` },
      { transform: `translate(-50%, ${targetRect.top}px)`, width: `${targetRect.width}px`, height: `${targetRect.height}px` }
    ],
    { duration: SETTLE_DURATION, easing: SETTLE_EASING, fill: "forwards" }
  );
  await settle.finished;

  overlayEl.hidden = true;
  overlayEl.innerHTML = "";
}

