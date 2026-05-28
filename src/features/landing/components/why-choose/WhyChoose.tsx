"use client";

import React from "react";
import { motion, type Variants } from "motion/react";

interface BenefitCard {
  title: string;
  description: string;
}

const WhyChoose: React.FC = () => {
  const benefits: BenefitCard[] = [
    {
      title: "Catch Problems Before Customers Do",
      description:
        "Expiring SSL certificate, misconfigured DNS and exposed admin pages can break your site & lead to loss of customer trust overnight. Vulnwatch flags these before they become incidents.",
    },
    {
      title: "Prioritize the Risks That Matter",
      description:
        "VulnWatch AI helps teams cut through noisy scan results by highlighting the vulnerabilities most likely to affect real users and critical systems.",
    },
    {
      title: "Move Faster With AI-Assisted Triage",
      description:
        "Get clearer explanations, severity context, and suggested next steps so developers can understand security issues quickly and fix them with less back-and-forth.",
    },
    {
      title: "Stay Ahead of Emerging Threats",
      description:
        "Track new vulnerabilities and security signals in one place, helping your team respond early before small issues become production incidents.",
    },
  ];

  return (
    <section className="relative z-[2] bg-white w-full py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-6 flex flex-col items-center justify-center text-center md:mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="mb-6 w-fit rounded-xl border border-[#E0E0E0] bg-[#FAFAFA] px-4 py-2 text-[0.9rem] font-geist font-medium tracking-wide text-[#2B2B2B] sm:text-[1.1rem]">
            Why Choose VulnWatch AI
          </span>
          <h2 className="mb-4 w-[95%] text-2xl leading-snug font-bold text-[#072e28] sm:w-full sm:text-3xl md:text-4xl lg:text-5xl">
            See risks clearly, fix them faster,
            <br className="hidden sm:block" />
            and stay ahead of threats
          </h2>
          <p className="mx-auto max-w-120 text-center text-[0.95rem] leading-relaxed text-[#666] sm:text-base md:max-w-xl md:text-lg">
            No installs, no agents, no access to your hosting accounts. Just a
            domain and a minute of your time.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-14"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
              } as Variants}
              className={`mt-4 border-l-[6px] border-t-transparent border-r-transparent border-b-transparent px-6 py-2 shadow-sm md:mt-8 md:px-8 md:py-2 ${
                index === 0 || index === 3
                  ? "border-[#a0e870]"
                  : "border-[#072e28]"
              } transition-shadow duration-200 hover:shadow-md`}
            >
              <h3 className="mb-3 text-base font-semibold text-[#2b2b2b] sm:text-xl md:text-2xl">
                {benefit.title}
              </h3>
              <p className="text-[0.9rem] leading-relaxed text-[#666] sm:text-base md:text-[1.05rem] md:leading-7">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;
