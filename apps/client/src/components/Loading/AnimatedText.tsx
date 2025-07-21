import * as React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  textClassName?: string;
  underlineClassName?: string;
  underlinePath?: string;
  underlineHoverPath?: string;
  underlineDuration?: number;
}

const blinkAnimation = {
  opacity: [1, 0, 1],
  transition: {
    repeat: Infinity,
    duration: 1,
    ease: "easeInOut",
  },
};

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      textClassName,
      underlineClassName,
      underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
      underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
      underlineDuration = 1.5,
      ...props
    },
    ref
  ) => {
    const pathVariants: Variants = {
      hidden: {
        pathLength: 0,
        opacity: 0,
      },
      visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: underlineDuration,
          ease: "easeInOut",
        },
      },
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-2 bg-transparent",
          props.className
        )}
      >
        <div className="relative">
          <motion.h1
            className={cn(
              "text-4xl font-bold text-center text-white",
              textClassName
            )}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2 }}
            // @ts-ignore
            whileInView={blinkAnimation}
          >
            {text}
          </motion.h1>

          <motion.svg
            width="100%"
            height="20"
            viewBox="0 0 300 20"
            className={cn("absolute -bottom-4 left-0", underlineClassName)}
          >
            <motion.path
              d={underlinePath}
              stroke="white"
              strokeWidth="2"
              fill="none"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                d: underlineHoverPath,
                transition: { duration: 0.8 },
              }}
              // @ts-ignore
              whileInView={blinkAnimation}
            />
          </motion.svg>
        </div>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
