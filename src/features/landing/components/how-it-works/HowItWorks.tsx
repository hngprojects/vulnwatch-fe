import Image from "next/image";

export default function HowItWorks() {
  return (
    <main className="bg-white text-[#111]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f9f9f9] via-[#f5ffe8] to-[#eefad9]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-14 md:py-24">
          <h1 className="mx-auto text-[36px] font-semibold leading-[24px] tracking-[-0.02em] text-[#2B2B2BE5] max-w-[350px] md:max-w-none md:text-[64px] md:font-bold md:leading-[72px] md:tracking-[-2px]">
            How It Works
          </h1>

          <p className="mx-auto mt-3 max-w-[328px] text-[16px] font-normal leading-none text-[#666666] md:max-w-[555px] md:text-[20px] md:leading-[32px] md:tracking-[-1px] md:text-[#2F2F2F] sm:mt-4">
            No installs, no agents, no access to your hosting account. Just a
            domain and a minute of your time.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 md:py-24">
        <div className="mb-10 text-center md:mb-24">
          <h2 className="mx-auto max-w-[309px] text-[24px] font-semibold leading-[48px] tracking-[-1.5px] md:max-w-none md:text-[40px]">
            Three (3) steps from{" "}
            <span className="text-[#163F36]">Curious to Confident</span>
          </h2>
        </div>

        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-2 text-[16px] font-bold uppercase tracking-[0.2em] text-[#163F36] leading-[24px] md:text-[28px] md:leading-[36px]">
              STEP 1
            </p>

            <h3 className="text-[48px] font-semibold leading-[56px] text-[#2C2C2C] md:text-[72px] md:leading-[64px]">
              01
            </h3>

            <h4 className="mt-2 text-[24px] font-semibold leading-tight text-black/90 md:mt-3 md:text-[32px] md:leading-none">
              Add Your Domain
            </h4>

            <p className="mt-3 max-w-xl text-[16px] font-normal leading-[24px] tracking-normal text-black md:mt-4 md:max-w-[365px] md:text-[20px] md:leading-[40px] md:tracking-[-1px] lg:max-w-xl">
              Enter your domain name and verify ownership to begin the security
              process. Users can choose from multiple verification methods,
              including DNS verification, Email verification, or File Upload
              verification.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative h-[222px] w-[264.86px] overflow-hidden rounded-[13.3px] border-[2.77px] border-[#072E28] bg-[#f7f7f7] shadow-lg md:h-[351px] md:w-[419px] md:rounded-[24px] md:border-[5px] md:shadow-xl">
              <Image
                src="/images/landing-page/01.png"
                alt="Dashboard preview"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 340px, (max-width: 768px) 420px, 520px"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 grid items-center gap-6 md:mt-32 md:grid-cols-2 md:gap-16">
          <div className="order-2 flex justify-center md:order-1">
            <div className="relative h-[222px] w-[264.86px] overflow-hidden rounded-[13.3px] border-[2.77px] border-[#072E28] bg-[#f7f7f7] shadow-lg md:h-[351px] md:w-[419px] md:rounded-[24px] md:border-[5px] md:shadow-xl">
              <Image
                src="/images/landing-page/02.png"
                alt="Website scan preview"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 340px, (max-width: 768px) 420px, 520px"
              />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="mb-2 text-[16px] font-bold uppercase tracking-[0.2em] text-[#163F36] leading-[24px] md:text-[28px] md:leading-[36px]">
              STEP 2
            </p>

            <h3 className="text-[48px] font-semibold leading-[56px] text-[#2C2C2C] md:text-[72px] md:leading-[64px]">
              02
            </h3>

            <h4 className="mt-2 text-[24px] font-semibold leading-tight text-black/90 md:mt-3 md:text-[32px] md:leading-none">
              Scan Your Website
            </h4>

            <p className="mt-3 max-w-xl text-[16px] font-normal leading-[24px] tracking-normal text-black md:mt-4 md:max-w-[365px] md:text-[20px] md:leading-[40px] md:tracking-[-1px] lg:max-w-xl">
              Scan your website to detect potential attacks, vulnerabilities,
              and security threats. This stage provides access to advanced
              features such as security settings, detailed reports, and
              role-based configurations.
            </p>
          </div>
        </div>

        <div className="mt-12 grid items-center gap-6 md:mt-32 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-2 text-[16px] font-bold uppercase tracking-[0.2em] text-[#163F36] leading-[24px] md:text-[28px] md:leading-[36px]">
              STEP 3
            </p>

            <h3 className="text-[48px] font-semibold leading-[56px] text-[#2C2C2C] md:text-[72px] md:leading-[64px]">
              03
            </h3>

            <h4 className="mt-2 text-[24px] font-semibold leading-tight text-black/90 md:mt-3 md:text-[32px] md:leading-none">
              Generate Report
            </h4>

            <p className="mt-3 max-w-xl text-[16px] font-normal leading-[24px] tracking-normal text-black md:mt-4 md:max-w-[365px] md:text-[20px] md:leading-[40px] md:tracking-[-1px] lg:max-w-xl">
              Expired SSL certificates, misconfigured DNS records, exposed admin panels,
              and unresolved security vulnerabilities can leave your website vulnerable
              to attacks, service disruptions, data breaches, and loss of customer trust — potentially
              impacting your business reputation and operations overnight.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative h-[222px] w-[264.86px] overflow-hidden rounded-[13.3px] border-[2.77px] border-[#072E28] bg-[#f7f7f7] shadow-lg md:h-[351px] md:w-[419px] md:rounded-[24px] md:border-[5px] md:shadow-xl">
              <Image
                src="/images/landing-page/03.png"
                alt="Generated report preview"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 340px, (max-width: 768px) 420px, 520px"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
