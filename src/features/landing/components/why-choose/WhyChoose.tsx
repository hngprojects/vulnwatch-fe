import React from "react";

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
    <section className="w-full py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col items-center justify-center text-center md:mb-10">
          <p className="mb-6 w-fit rounded-xl border-2 bg-[#fafafa] p-2 text-[0.9rem] font-medium tracking-wide text-[#2b2b2b] sm:text-[1.1rem]">
            Why Choose VulnWatch AI
          </p>
          <h2 className="mb-4 w-[95%] text-2xl leading-relaxed font-bold text-[#072e28] sm:w-full sm:text-3xl md:text-4xl lg:text-5xl">
            See risks clearly, fix them faster,
            <br className="hidden sm:block" />
            and stay ahead of threats
          </h2>
          <p className="mx-auto max-w-120 text-center text-[0.95rem] leading-relaxed text-[#666] sm:text-base md:max-w-xl md:text-lg">
            No installs, no agents, no access to your hosting accounts. Just a
            domain and a minute of your time.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-14">
          {benefits.map((benefit, index) => (
            <div
              key={index}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
