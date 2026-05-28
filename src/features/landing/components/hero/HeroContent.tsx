"use client";

import { motion } from "motion/react";
import { HeroHeadline } from "./HeroHeadline";
import { HeroDescription } from "./HeroDescription";
import { HeroScanForm } from "./HeroScanForm";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

export function HeroContent() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <motion.div {...fadeUp(0)}>
        <HeroHeadline />
      </motion.div>
      <motion.div {...fadeUp(0.15)}>
        <HeroDescription />
      </motion.div>
      <motion.div {...fadeUp(0.3)}>
        <HeroScanForm />
      </motion.div>
    </div>
  );
}
