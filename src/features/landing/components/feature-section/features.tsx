"use client";

import { motion, type Variants } from "motion/react";
import Image from 'next/image';
import { FeaturesData } from '@/features/landing/constants/featureSection';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Features() {
  return (
    <div className='bg-white py-10 sm:py-24'>
      <div className='mx-auto max-w-300'>
        <motion.div
          className='flex flex-col items-center py-5 text-center'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className='mb-3 rounded-md bg-[#FAFAFA] px-4 py-2.5 sm:mb-4 md:mb-5'>
            Features
          </span>
          <h2 className='mb-4 text-center text-2xl font-medium sm:mb-6 md:mb-8 md:text-5xl md:leading-13.75'>
            Everything you need to{' '}
            <span className='text-[#072E28]'>
              {' '}
              stay <br /> protected{' '}
            </span>
          </h2>
          <p className='px-5 text-center text-base font-normal text-[#666666] sm:mb-6 md:mb-10 md:text-xl'>
            One platform with everything. Every layer of your webstack{' '}
            <br className='hidden sm:block' /> backed up by real-time threat
            intelligence
          </p>
        </motion.div>

        <motion.div
          className='mx-auto md:mx-0 grid w-full gap-6 sm:w-full sm:grid-cols-2 md:grid-cols-3'
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {FeaturesData.map(({ image, title, description }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className='flex flex-col gap-4 rounded-lg border-2 border-[#EFEFEF] bg-white p-6
                transition-all duration-200 hover:border-primary hover:shadow-md'
            >
              <div className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-[#F4F8F5]'>
                <Image
                  src={image}
                  alt={title}
                  width={48}
                  height={48}
                  className='h-full w-full object-cover'
                />
              </div>
              <h3 className='text-lg font-semibold text-[#2B2B2B]'>{title}</h3>
              <p className='text-sm leading-relaxed font-normal text-[#666666]'>
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
