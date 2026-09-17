/* =========================================================
   audioEngine.js — tiny procedural sound engine (Web Audio API).
   Nothing here knows about chat/UI; it just turns a "recipe"
   object into sound. Keeping it standalone makes it reusable
   for any future UI event (errors, sends, etc.), not just the
   bot notification sound.
   ========================================================= */

let audioCtx = null;

/** Lazily creates (or resumes) the shared AudioContext. Call this
 *  from a user gesture handler the first time, per browser autoplay rules. */
export function getAudioContext(){
  if(!audioCtx){
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if(audioCtx.state === "suspended"){
    audioCtx.resume();
  }
  return audioCtx;
}

function createNoiseBuffer(ctx, color, duration){
  const sampleRate = ctx.sampleRate;
  const length = Math.max(1, Math.ceil(sampleRate * duration));
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  if(color === "pink"){
    let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
    for(let i=0;i<length;i++){
      const white = Math.random()*2-1;
      b0 = 0.99886*b0 + white*0.0555179;
      b1 = 0.99332*b1 + white*0.0750759;
      b2 = 0.96900*b2 + white*0.1538520;
      b3 = 0.86650*b3 + white*0.3104856;
      b4 = 0.55000*b4 + white*0.5329522;
      b5 = -0.7616*b5 - white*0.0168980;
      data[i] = (b0+b1+b2+b3+b4+b5+b6+white*0.5362)*0.11;
      b6 = white*0.115926;
    }
  } else if(color === "brown"){
    let last = 0;
    for(let i=0;i<length;i++){
      const white = Math.random()*2-1;
      last = (last + 0.02*white) / 1.02;
      data[i] = last*3.5;
    }
  } else {
    for(let i=0;i<length;i++){
      data[i] = Math.random()*2-1; // white
    }
  }
  return buffer;
}

// AD(S)R envelope, "ramp" = linear. Sustain is a level, held for zero
// duration here since these are one-shot UI sounds with no note-off.
function applyEnvelope(gainNode, startTime, env, peak){
  const g = gainNode.gain;
  const attack = env.attack ?? 0.001;
  const decay = env.decay ?? 0.05;
  const sustain = env.sustain ?? 0;
  const release = env.release ?? 0.05;
  const sustainLevel = Math.max(peak * sustain, 0.0001);

  g.cancelScheduledValues(startTime);
  g.setValueAtTime(0.0001, startTime);
  g.linearRampToValueAtTime(peak, startTime + attack);
  g.linearRampToValueAtTime(sustainLevel, startTime + attack + decay);
  g.linearRampToValueAtTime(0.0001, startTime + attack + decay + release);

  return startTime + attack + decay + release;
}

function playLayer(ctx, master, layer, now){
  const delay = layer.delay || 0;
  const startTime = now + delay;
  const env = layer.envelope || {};
  const estDuration = (env.attack||0) + (env.decay||0) + (env.release||0);

  const src = layer.source || {};
  let sourceNode;

  if(src.type === "noise"){
    sourceNode = ctx.createBufferSource();
    sourceNode.buffer = createNoiseBuffer(ctx, src.color || "white", estDuration + 0.1);
  } else {
    sourceNode = ctx.createOscillator();
    sourceNode.type = src.type || "sine";
    sourceNode.frequency.value = src.frequency || 440;

    if(src.fm){
      // simple FM: a modulator oscillator drives the carrier's frequency
      const modOsc = ctx.createOscillator();
      modOsc.type = "sine";
      modOsc.frequency.value = (src.frequency || 440) * (src.fm.ratio ?? 1);

      const modGain = ctx.createGain();
      modGain.gain.value = src.fm.depth ?? 0;

      modOsc.connect(modGain).connect(sourceNode.frequency);
      modOsc.start(startTime);
      modOsc.stop(startTime + estDuration + 0.15);
    }
  }

  let lastNode = sourceNode;

  if(layer.filter){
    const filterNode = ctx.createBiquadFilter();
    filterNode.type = layer.filter.type || "lowpass";
    filterNode.frequency.value = layer.filter.frequency || 1000;
    filterNode.Q.value = layer.filter.Q ?? 1;
    lastNode.connect(filterNode);
    lastNode = filterNode;
  }

  const gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  lastNode.connect(gainNode).connect(master);

  const endTime = applyEnvelope(gainNode, startTime, env, layer.gain ?? 1);

  sourceNode.start(startTime);
  sourceNode.stop(endTime + 0.05);
}

/**
 * Plays a sound "recipe" — either a single flat layer
 * ({source, envelope, gain, ...}) or a multi-layer one
 * ({layers: [...]}). See soundLibrary.js for examples.
 */
export function playSound(recipe){
  if(!recipe) return;
  const layers = Array.isArray(recipe.layers) ? recipe.layers : [recipe];

  const ctx = getAudioContext();
  const master = ctx.createGain();
  master.gain.value = 1;
  master.connect(ctx.destination);
  const now = ctx.currentTime;
  layers.forEach(layer => playLayer(ctx, master, layer, now));
}
