"use client";

import { motion } from "motion/react";
import Image from 'next/image';

export function HeroDashboardPreview() {
  return (
    <motion.div
      className='relative mx-auto mt-12 w-full overflow-hidden md:mt-20'
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
    >
      {/* Desktop Image */}
      <Image
        src='/images/hero-section-desktop.png'
        alt='VulnWatch AI Dashboard Preview'
        width={1440}
        height={760}
        className='hidden h-auto w-full object-cover object-top md:block'
        priority
      />

      {/* Mobile Image */}
      <Image
        src='/images/hero-section-mobile.png'
        alt='VulnWatch AI Mobile Dashboard Preview'
        width={390}
        height={340}
        className='block h-auto w-full object-cover object-top md:hidden'
        priority
      />
    </motion.div>
  );
}
