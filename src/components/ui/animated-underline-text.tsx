import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  textClassName?: string;
  underlineClassName?: string;
  underlinePath?: string;
  underlineHoverPath?: string;
  underlineDuration?: number;
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      textClassName,
      underlineClassName,
      underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
      underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
      underlineDuration = 1.5,
      className,
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
      <div ref={ref} className={cn("relative inline-block", className)} {...props}>
        <motion.div
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="relative"
        >
          <span className={cn("relative z-10", textClassName)}>
            {text}
          </span>

          <motion.svg
            className={cn(
              "absolute -bottom-1 left-0 w-full h-4 overflow-visible",
              underlineClassName
            )}
            viewBox="0 0 300 20"
            preserveAspectRatio="none"
          >
            <motion.path
              d={underlinePath}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                d: underlineHoverPath,
              }}
              transition={{
                duration: 0.3,
              }}
            />
          </motion.svg>
        </motion.div>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
