import Image from "next/image";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "01",
    title: "Add Your Domain",
    description:
      "Generate daily/weekly sales and profit reports. Export to CSV/PDF with one click",
    image: "/images/landing-page/how-it-work-1.png",
    alt: "VulnWatch Dashboard",
    imageLeft: true,
  },
  {
    id: "02",
    title: "Scan Your Website",
    description:
      "Full access to settings, reports, and tax configurations between Admin and Users",
    image: "/images/landing-page/how-it-work-2.png",
    alt: "Scan Your Website",
    imageLeft: false,
  },
  {
    id: "03",
    title: "Get Report",
    description:
      "Expiring SSL certificate, misconfigured DNS and exposed admin pages can break your site & lead to loss of customer trust overnight.",
    image: "/images/landing-page/how-it-work-3.png",
    alt: "SSL Expiry Email Report",
    imageLeft: true,
  },
];

const HowItWorks = () => {
  return (
    <section className="overflow-x-hidden bg-[#F1FCEA]">
      <div className="bg-[#F1FCEA] md:py-14">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="mx-auto max-w-2xl px-8 py-10 text-center md:border-0 md:bg-transparent md:px-0 md:py-0">
            <span className="mb-6 inline-block rounded-lg border border-[#E0E0E0] bg-[#FAFAFA] px-5 py-2 text-sm font-bold text-header">
              How It Works
            </span>
            <h2 className="font-geist font-semibold text-[#2B2B2B] text-center mt-4 max-w-154.25 text-3xl sm:text-4xl md:text-[48px]">
              Three (3) steps
              <br className="hidden md:block" /> from Curious to Confident
            </h2>
            <p className="font-geist font-normal text-[#666666] text-center mt-4 max-w-138.75 text-lg md:text-xl">
              No installs, no agents, no access to your hosting account.
              <br className="hidden md:block" /> Just a domain and a minute of your time.
            </p>
          </div>
        </div>
      </div>

      <div className="pb-0 bg-[#F1FCEA]">
        <div className="mx-auto max-w-[1440px] px-3 md:px-0">
          <div className="rounded-3xl bg-[#F1FCEA] pt-10 pb-0 md:border-0">
            <div className="mx-auto max-w-275 md:px-20">
              <div className="flex flex-col gap-6 md:gap-0">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={cn(
                      "flex justify-center",
                      index === 1 && "md:-translate-x-39",
                    )}
                  >
                    <div className="w-full md:hidden">
                      <div className="border-[#072E28] bg-cards relative z-10 ml-14 h-48 overflow-hidden rounded-tl-3xl border-t-[5px]">
                        <Image
                          src={step.image}
                          alt={step.alt}
                          fill
                          className="object-cover object-top"
                          sizes="100vw"
                        />
                      </div>
                      <div className="bg-secondary relative z-20 -mt-6 flex flex-col gap-3 rounded-tl-[20px] px-6 pt-8 pb-8">
                        <h3 className="text-[#000000E5] font-inter text-lg font-semibold">
                          {step.title}
                        </h3>
                        <p className="text-[#000000] font-geist text-sm leading-relaxed font-normal">
                          {step.description}
                        </p>
                        <span className="text-[#000000] font-geist mt-2 text-4xl leading-none font-semibold">
                          {step.id}
                        </span>
                      </div>
                    </div>

                    <div className="hidden items-end md:flex">
                      {step.imageLeft ? (
                        <>
                          <div className="border-[#072E28] bg-cards relative z-0 -mr-3.75 h-82.5 w-110 shrink-0 self-end overflow-hidden rounded-tl-3xl border-t-[5px] border-l-[5px]">
                            <Image
                              src={step.image}
                              alt={step.alt}
                              fill
                              className="object-cover object-top"
                              sizes="440px"
                            />
                          </div>
                          <div className="bg-secondary relative z-10 flex h-92.5 w-145 shrink-0 flex-col justify-center gap-6 rounded-tr-[40px] rounded-br-[40px] p-12">
                            <div>
                              <h3 className="text-[#000000E5] font-inter mb-2 text-2xl font-semibold">
                                {step.title}
                              </h3>
                              <p className="text-[#000000] font-geist max-w-95 text-base leading-relaxed font-normal">
                                {step.description}
                              </p>
                            </div>
                            <span className="text-[#000000] font-geist block text-7xl leading-none font-semibold">
                              {step.id}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-secondary relative z-10 flex h-92.5 w-145 shrink-0 flex-col justify-center gap-6 rounded-tl-[40px] rounded-bl-[40px] p-12">
                            <div>
                              <h3 className="text-[#000000E5] font-inter mb-2 text-2xl font-semibold">
                                {step.title}
                              </h3>
                              <p className="text-[#000000] font-geist max-w-95 text-base leading-relaxed font-normal">
                                {step.description}
                              </p>
                            </div>
                            <span className="text-[#000000] font-geist block text-7xl leading-none font-semibold">
                              {step.id}
                            </span>
                          </div>
                          <div className="border-[#072E28] bg-cards relative z-0 -ml-3.75 h-82.5 w-110 shrink-0 self-end overflow-hidden rounded-tr-3xl border-t-[5px] border-r-[5px]">
                            <Image
                              src={step.image}
                              alt={step.alt}
                              fill
                              className="object-cover object-top"
                              sizes="440px"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
