import { motion, useTransform } from "framer-motion";

const charVariants = {
  enter: (i: number) => ({
    y: 0,
    opacity: 1,
    scaleY: 1,
    rotateX: 0,
    transition: { delay: i * 0.035, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
  initial: { y: "-120%", opacity: 0, scaleY: 0.8, rotateX: 40 },
  exit: (i: number) => ({
    y: "120%",
    opacity: 0,
    scaleY: 0.8,
    rotateX: -40,
    transition: { delay: i * 0.02, duration: 0.4, ease: "easeIn" as const },
  }),
};

interface HeadlineStaggerProps {
  text: string;
  scrollRotateX?: ReturnType<typeof useTransform>;
}

export const HeadlineStagger = ({ text, scrollRotateX }: HeadlineStaggerProps) => {
  const allWords = text.replace(/\n/g, " ").split(" ");
  const staggerWords = allWords.slice(0, 2);
  const restWords = allWords.slice(2);

  let charIndex = 0;

  return (
    <motion.div
      className="flex flex-col items-center"
      style={{
        perspective: 800,
        transformStyle: "preserve-3d" as const,
        rotateX: scrollRotateX,
      }}
    >
      <span className="inline-flex flex-wrap justify-center gap-x-[0.3em]">
        {staggerWords.map((word, wi) => (
          <span key={wi} className="inline-flex whitespace-nowrap">
            {word.split("").map((char) => {
              const i = charIndex++;
              return (
                <motion.span
                  key={`${char}-${i}`}
                  custom={i}
                  variants={charVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="inline-block font-extrabold uppercase"
                  style={{
                    fontSize: "clamp(3.5rem, 9vw, 8.75rem)",
                    color: "white",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </span>
      {restWords.length > 0 && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ delay: charIndex * 0.02 + 0.1, duration: 0.4 }}
          className="font-extrabold uppercase whitespace-pre-line text-center"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 8.75rem)",
            color: "white",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          {restWords.join(" ")}
        </motion.span>
      )}
    </motion.div>
  );
};
