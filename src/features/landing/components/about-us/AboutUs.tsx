import Image from "next/image";
import Different from "./different";

const sections = [
  {
    id: "who-we-are",
    heading: "Who we are",
    body: "VulnWatch AI is a surface intelligence and website security platform built to help businesses identify visible security weaknesses before attackers exploit them. We simplify complex cybersecurity signals into clear, practical actions.",
    image: "/images/landing-page/Rectangle 34624202.jpg",
    alt: "Who we are",
    imageLeft: true,
  },
  {
    id: "our-mission",
    heading: "Our mission",
    body: "Our mission is to make cybersecurity understandable and actionable for every business, not just security professionals. We believe teams should be able to identify and fix critical web risks without needing a dedicated security staff.",
    image: "/images/landing-page/Rectangle 34624202 (1).jpg",
    alt: "Our mission",
    imageLeft: false,
  },
];

const AboutUs = () => {
  return (
    <main>
      <div
        className="px-5 py-16 text-center md:px-20 md:py-24"
        style={{
          background:
            "linear-gradient(179.2deg, #FFFFFF 53.96%, #A0E870 176.19%, #A0E870 267.79%)",
        }}
      >
        <div className="mx-auto max-w-[1440px]">
          <h1 className="font-geist text-header/90 text-4xl leading-tight font-bold tracking-[-0.125rem] md:text-[64px] md:leading-18">
            About us
          </h1>
          <p className="font-inter text-body mx-auto mt-6 max-w-[780px] text-base leading-7 font-normal tracking-[-0.0625rem] md:text-xl md:leading-8">
            Most website security tools overwhelm people with technical jargon,
            fragmented reports, and unclear priorities.{" "}
            <span className="text-header font-semibold">VulnWatch AI</span> was
            created to change that. We turn complex surface-level security
            checks into clear, actionable insights businesses can actually
            understand and fix without needing a cybersecurity team.
          </p>
        </div>
      </div>

      <div className="bg-primary h-px" />

      <div className="bg-cards">
        {sections.map((section) => (
          <div key={section.id} className="py-12 md:py-20">
            <div className="mx-auto max-w-[1440px] px-5 md:px-20">
              <div
                className={`flex flex-col items-center gap-10 md:gap-12 ${
                  section.imageLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="relative h-64 w-full shrink-0 overflow-hidden rounded-3xl md:h-103.75 md:w-151.5">
                  <Image
                    src={section.image}
                    alt={section.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 606px"
                  />
                </div>
                <div className="max-w-full md:max-w-157.5">
                  <h2 className="font-geist text-header/90 text-3xl leading-tight font-semibold tracking-[0.01em] md:text-[40px] md:leading-[70px]">
                    {section.heading}
                  </h2>
                  <p className="text-body mt-4 text-base leading-relaxed font-normal">
                    {section.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Different />
    </main>
  );
};

export default AboutUs;
