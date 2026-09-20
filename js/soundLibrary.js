/* =========================================================
   soundLibrary.js — sound "recipes" consumed by audioEngine.js.
   Add new named recipes here as more UI events get sounds
   (e.g. sendMessage, errorChime) — nothing else needs to change.
   ========================================================= */

export const notification9agj9 = {
  layers: [
    {
      source: {
        type: "sine",
        frequency: 468.9940465507974
      },
      envelope: {
        attack: 0.002,
        decay: 0.07017779551071761,
        sustain: 0,
        release: 0.004
      },
      gain: 0.089
    },
    {
      source: {
        type: "sine",
        frequency: 496.88498037976524
      },
      envelope: {
        attack: 0.002,
        decay: 0.055639215491910754,
        sustain: 0,
        release: 0.004
      },
      gain: 0.089,
      delay: 0.09091679323440625
    }
  ]
};
