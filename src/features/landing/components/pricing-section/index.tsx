"use client";

import { motion } from "motion/react";
import PricingHeader from "./PricingHeader";
import PricingCard from "./PricingCard";
import { plans } from "./constants";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const PricingSection = () => {
  const cardLayoutClasses = [
    "md:order-1",
    "md:order-3 md:col-span-2 md:mx-auto md:w-full md:max-w-[430px] lg:order-2 lg:col-span-1 lg:max-w-none",
    "md:order-2",
  ];

  return (
    <section className="mx-auto w-full bg-[#F1FCEA] px-4 py-20 lg:px-15">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <PricingHeader />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3 lg:px-10"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={`${plan.name}-${index}`}
              variants={cardVariants}
              className={cardLayoutClasses[index] ?? ""}
            >
              <PricingCard plan={plan} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
