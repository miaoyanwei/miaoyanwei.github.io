/* =========================================================
   soundLibrary.js — sound "recipes" consumed by audioEngine.js.
   Add new named recipes here as more UI events get sounds
   (e.g. sendMessage, errorChime) — nothing else needs to change.
   ========================================================= */

export const notification3xc5w = {
  source: {
    type: "sine",
    frequency: 750.7493678058958,
    fm: {
      ratio: 1.9711876048091828,
      depth: 114.7923023043059
    }
  },
  envelope: {
    attack: 0,
    decay: 0.08564809763768039,
    sustain: 0,
    release: 0.03366587994272964
  },
  gain: 0.131
};
