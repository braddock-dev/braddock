import { motion, useInView, Variants } from "framer-motion";
import styles from "./AnimatedText.module.scss";
import { useRef } from "react";

const DefaultAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

interface IAnimatedTextProps {
  text: string[];
  element: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
}
export default function AnimatedText({
  text,
  element: WrapperElement = "p",
  className,
  ...props
}: IAnimatedTextProps) {
  const textRef = useRef(null);
  const isInViewport = useInView(textRef, { once: props.once, amount: 0.5 });

  return (
    <WrapperElement className={className}>
      <motion.span
        ref={textRef}
        initial={"hidden"}
        animate={isInViewport ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.1 }}
      >
        {text.map((line, lineIndex) => (
          <span className={styles.line} key={lineIndex}>
            {line.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className={styles.character}>
                {word.split("").map((char, index) => (
                  <motion.span
                    className={styles.character}
                    variants={DefaultAnimation}
                    key={index}
                  >
                    {char}
                  </motion.span>
                ))}
                <span className={styles.character}>&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </WrapperElement>
  );
}
