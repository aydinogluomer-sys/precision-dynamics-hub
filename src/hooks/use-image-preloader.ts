import { useEffect, useRef, useState } from "react";

interface UseImagePreloaderOptions {
  basePath: string;
  totalFrames: number;
  filePrefix?: string;
  eagerCount?: number;
}

export function useImagePreloader({
  basePath,
  totalFrames,
  filePrefix = "frame_",
  eagerCount = 10,
}: UseImagePreloaderOptions) {
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const images: (HTMLImageElement | null)[] = new Array(totalFrames).fill(null);
    let loaded = 0;

    const framePath = (i: number) => {
      const num = String(i + 1).padStart(4, "0");
      return `${basePath}/${filePrefix}${num}.webp`;
    };

    const onLoad = () => {
      loaded++;
      setLoadedCount(loaded);
      if (loaded >= eagerCount) setReady(true);
    };

    const loadFrame = (i: number) => {
      const img = new Image();
      img.src = framePath(i);
      img.onload = onLoad;
      img.onerror = () => {
        images[i] = null;
        onLoad();
      };
      images[i] = img;
    };

    // Eager: first N frames immediately
    for (let i = 0; i < Math.min(eagerCount, totalFrames); i++) {
      loadFrame(i);
    }

    // Lazy: remaining frames via requestIdleCallback
    const loadRemaining = () => {
      let idx = eagerCount;
      const loadNext = (deadline?: IdleDeadline) => {
        while (idx < totalFrames && (!deadline || deadline.timeRemaining() > 2)) {
          loadFrame(idx);
          idx++;
        }
        if (idx < totalFrames) {
          if ("requestIdleCallback" in window) {
            window.requestIdleCallback(loadNext);
          } else {
            setTimeout(() => loadNext(), 16);
          }
        }
      };
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(loadNext);
      } else {
        setTimeout(() => loadNext(), 100);
      }
    };

    loadRemaining();
    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, [basePath, totalFrames, filePrefix, eagerCount]);

  return { images: imagesRef, loadedCount, ready, totalFrames };
}
