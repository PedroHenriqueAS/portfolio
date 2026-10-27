export type StudioSound = "key" | "switch" | "screen" | "done" | "cup" | "purr";
export interface StudioAudio {
  context: AudioContext;
  master: GainNode;
  noise: AudioBuffer;
  voices: Set<AudioScheduledSourceNode>;
}

export function createStudioAudio(): StudioAudio {
  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = 0;
  master.connect(context.destination);
  const noise = context.createBuffer(
    1,
    Math.ceil(context.sampleRate * 0.12),
    context.sampleRate,
  );
  const samples = noise.getChannelData(0);
  for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
  return {
    context,
    master,
    noise,
    voices: new Set<AudioScheduledSourceNode>(),
  };
}

export function stopStudioAudio(engine: StudioAudio) {
  engine.voices.forEach((source) => source.stop());
  engine.voices.clear();
}

export function playStudioAudio(engine: StudioAudio, sound: StudioSound) {
  const { context, master, noise, voices } = engine;
  const now = context.currentTime;

  if (sound === "purr") {
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const pulse = context.createOscillator();
    const depth = context.createGain();
    const texture = context.createGain();
    const envelope = context.createGain();
    source.buffer = noise;
    source.loop = true;
    filter.type = "lowpass";
    filter.frequency.value = 430;
    filter.Q.value = 0.8;
    pulse.frequency.value = 26;
    texture.gain.value = 0.32;
    depth.gain.value = 0.22;
    pulse.connect(depth).connect(texture.gain);
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(0.8, now + 0.3);
    envelope.gain.linearRampToValueAtTime(0.55, now + 1.2);
    envelope.gain.linearRampToValueAtTime(0.75, now + 1.8);
    envelope.gain.linearRampToValueAtTime(0, now + 2.8);
    source.connect(filter).connect(texture).connect(envelope).connect(master);
    [source, pulse].forEach((node) => {
      voices.add(node);
      node.start(now);
      node.stop(now + 2.85);
    });
    source.onended = () => {
      voices.delete(source);
      source.disconnect();
      filter.disconnect();
      texture.disconnect();
      envelope.disconnect();
    };
    pulse.onended = () => {
      voices.delete(pulse);
      pulse.disconnect();
      depth.disconnect();
    };
    return () => {
      envelope.gain.cancelScheduledValues(context.currentTime);
      envelope.gain.setValueAtTime(0, context.currentTime);
      [source, pulse].forEach((node) => {
        if (voices.delete(node)) node.stop();
      });
    };
  }

  if (sound === "key" || sound === "switch") {
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const envelope = context.createGain();
    const duration = sound === "key" ? 0.045 : 0.075;
    source.buffer = noise;
    source.playbackRate.value = 0.8 + Math.random() * 0.4;
    filter.type = "bandpass";
    filter.frequency.value = sound === "key" ? 1400 + Math.random() * 900 : 750;
    filter.Q.value = 0.65;
    envelope.gain.setValueAtTime(sound === "key" ? 0.22 : 0.3, now);
    envelope.gain.exponentialRampToValueAtTime(0.001, now + duration);
    source.connect(filter).connect(envelope).connect(master);
    voices.add(source);
    source.start(now);
    source.stop(now + duration);
    source.onended = () => {
      voices.delete(source);
      source.disconnect();
      filter.disconnect();
      envelope.disconnect();
    };
    return;
  }

  const notes =
    sound === "cup"
      ? [1680, 2530, 3640]
      : sound === "done"
        ? [523.25, 783.99]
        : [440];
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const start = now + (sound === "cup" ? 0 : index * 0.1);
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    envelope.gain.setValueAtTime(0, start);
    envelope.gain.linearRampToValueAtTime(
      sound === "cup" ? 0.055 / (index + 1) : 0.09,
      start + 0.012,
    );
    envelope.gain.exponentialRampToValueAtTime(
      0.001,
      start + (sound === "cup" ? 0.28 : 0.16),
    );
    oscillator.connect(envelope).connect(master);
    voices.add(oscillator);
    oscillator.start(start);
    oscillator.stop(start + (sound === "cup" ? 0.3 : 0.18));
    oscillator.onended = () => {
      voices.delete(oscillator);
      oscillator.disconnect();
      envelope.disconnect();
    };
  });
}
