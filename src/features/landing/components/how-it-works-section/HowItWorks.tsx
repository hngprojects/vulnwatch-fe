import Image from "next/image";

const steps = [
  {
    id: "01",
    title: "Add Your Domain",
    description: "Add your domain and verify ownership in seconds to securely initiate a deep scanning sequence.",
    image: "/images/landing-page/how-it-work-1.png",
    imageLeft: true,
  },
  {
    id: "02",
    title: "Scan Your Website",
    description: "Identify vulnerabilities and DNS misconfigurations, automatically prioritizing critical threats by severity levels.",
    image: "/images/landing-page/how-it-work-2.png",
    imageLeft: false,
  },
  {
    id: "03",
    title: "Get Report",
    description: "Instantly produce and export a comprehensive remediation report with actionable steps to patch security gaps.",
    image: "/images/landing-page/how-it-work-3.png",
    imageLeft: true,
  },
];

const HowItWorks = () => {
  return (
    <section className="overflow-hidden bg-brand-mint">
      <div className="bg-brand-mint md:py-14">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="mx-auto max-w-2xl px-8 py-10 text-center md:border-0 md:bg-transparent md:px-0 md:py-0">
            <span className="mb-6 inline-block rounded-lg border border-brand-border-gray bg-brand-bg-light px-5 py-2 text-sm text-header">
              How It Works
            </span>
            <h2 className="font-geist font-semibold text-brand-dark text-center mt-4 text-3xl sm:text-4xl md:text-5xl">
              Three (3) steps
              <br className="hidden md:block" /> from Curious to Confident
            </h2>
            <p className="font-geist font-normal text-brand-gray text-center mt-4 text-lg md:text-xl">
              No installs, no agents, no access to your hosting account.
              <br className="hidden md:block" /> Just a domain and a minute of your time.
            </p>
          </div>
        </div>
      </div>

      <div className="pb-0 bg-brand-mint">
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-0">
          <div className="flex flex-col gap-y-6 md:gap-y-0">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              // Mobile: all boxes get left-side radius. Desktop: alternates left/right.
              const mobileRadius = "rounded-tl-[20px] rounded-bl-[20px] rounded-tr-none rounded-br-none";
              const desktopRadius = isEven
                ? "md:rounded-tl-none md:rounded-bl-none md:rounded-tr-[40px] md:rounded-br-[40px]"
                : "md:rounded-tl-[40px] md:rounded-bl-[40px] md:rounded-tr-none md:rounded-br-none";
              const radiusClass = `${mobileRadius} ${desktopRadius}`;

              let translateClass = "translate-x-12.5";
              if (index === 0) {
                translateClass = "translate-x-12.5 md:translate-x-25";
              } else if (index === 1) {
                translateClass = "translate-x-12.5 md:-translate-x-25";
              } else if (index === 2) {
                translateClass = "translate-x-12.5 translate-y-5 md:translate-x-25 md:translate-y-16";
              }

              return (
                <div
                  key={step.id}
                  className={`flex w-full flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center md:items-end overflow-hidden`}
                >
                  {/* Image container */}
                  <div className={`w-full md:w-1/2 h-62.5 md:h-88.75 relative z-[1] ${translateClass}`}>
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain object-right-bottom md:object-bottom"
                      sizes="(max-width: 768px) 100vw, 580px"
                    />
                  </div>

                  {/* Text card */}
                  <div className={`relative z-[2] bg-secondary flex flex-col justify-center gap-6 p-12 w-full md:w-1/2 md:h-88.75 text-left items-start ${radiusClass}`}>
                    <div className={`flex flex-col gap-6 ${index === 1 ? "md:pl-15" : ""}`}>
                      <div>
                        <h3 className="text-black/90 font-inter mb-2 text-2xl font-semibold">
                          {step.title}
                        </h3>
                        <p className="text-black font-geist max-w-95 text-base leading-relaxed font-normal">
                          {step.description}
                        </p>
                      </div>
                      <span className="text-black font-geist block text-40px md:text-7xl leading-none font-semibold">
                        {step.id}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;