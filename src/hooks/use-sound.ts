import { useCallback, useRef, useMemo } from "react";

/**
 * Lightweight Web Audio sound engine — generates UI sounds via oscillators.
 * No audio files needed.
 */
export function useSoundEngine() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (type: "tick" | "click" | "whoosh") => {
      try {
        const ctx = getCtx();
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const gain = ctx.createGain();
        gain.connect(ctx.destination);

        if (type === "tick") {
          const osc = ctx.createOscillator();
          osc.type = "square";
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          gain.gain.setValueAtTime(0.03, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
          osc.connect(gain);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.03);
        } else if (type === "click") {
          const osc = ctx.createOscillator();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(400, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);
          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
          osc.connect(gain);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.05);
        } else if (type === "whoosh") {
          const bufferSize = ctx.sampleRate * 0.15;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.5;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          gain.gain.setValueAtTime(0.02, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
          noise.connect(gain);
          noise.start(ctx.currentTime);
        }
      } catch {
        // Silently fail — sound is non-critical
      }
    },
    [getCtx],
  );

  return useMemo(() => ({ play }), [play]);
}
