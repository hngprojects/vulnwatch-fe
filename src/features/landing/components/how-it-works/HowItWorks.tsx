import Image from "next/image";

export default function HowItWorks() {
  return (
    <main className="bg-white text-[#111]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f9f9f9] via-[#f5ffe8] to-[#eefad9]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-14 md:py-24">
          <h1 className="text-[2.5rem] leading-[1.1] font-bold tracking-tight sm:text-4xl md:text-[3.5rem]">
            How It Works
          </h1>

          <p className="mx-auto mt-3 max-w-[300px] text-sm leading-6 text-[#2F2F2F] sm:mt-4 sm:max-w-2xl md:max-w-[420px] md:text-[13px] md:leading-5">
            No installs, no agents, no access to your hosting account. Just a
            domain and a minute of your time.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 md:py-24">
        <div className="mb-10 text-center md:mb-24">
          <h2 className="mx-auto max-w-[300px] text-[1.75rem] font-semibold leading-tight tracking-tight sm:max-w-[520px] sm:text-4xl md:max-w-none md:text-[2.25rem]">
            Three (3) steps from{" "}
            <span className="text-[#163F36]">Curious to Confident</span>
          </h2>
        </div>

        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-2 text-[28px] font-bold uppercase tracking-[0.2em] text-[#163F36] leading-[36px]">
              STEP 1
            </p>

            <h3 className="text-[72px] font-semibold leading-[64px] text-[#2C2C2C]">
              01
            </h3>

            <h4 className="mt-2 text-[32px] font-semibold leading-none text-black/90 md:mt-3">
              Add Your Domain
            </h4>

            <p className="mt-3 max-w-xl text-[20px] font-normal leading-[40px] tracking-[-1px] text-black md:mt-4 md:max-w-[365px] lg:max-w-xl">
              Enter your domain name and verify ownership to begin the security
              process. Users can choose from multiple verification methods,
              including DNS verification, Email verification, or File Upload
              verification.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative aspect-[13/8] w-full max-w-[340px] overflow-hidden rounded-[18px] border-[3px] border-[#163f36] bg-[#f7f7f7] shadow-lg sm:max-w-[420px] sm:rounded-2xl sm:border-4 md:max-w-[520px] md:rounded-[32px] md:border-[6px] md:shadow-xl">
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
            <div className="relative aspect-[13/8] w-full max-w-[340px] overflow-hidden rounded-[18px] border-[3px] border-[#163f36] bg-[#f7f7f7] shadow-lg sm:max-w-[420px] sm:rounded-2xl sm:border-4 md:max-w-[520px] md:rounded-[32px] md:border-[6px] md:shadow-xl">
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
            <p className="mb-2 text-[28px] font-bold uppercase tracking-[0.2em] text-[#163F36] leading-[36px]">
              STEP 2
            </p>

            <h3 className="text-[72px] font-semibold leading-[64px] text-[#2C2C2C]">
              02
            </h3>

            <h4 className="mt-2 text-[32px] font-semibold leading-none text-black/90 md:mt-3">
              Scan Your Website
            </h4>

            <p className="mt-3 max-w-xl text-[20px] font-normal leading-[40px] tracking-[-1px] text-black md:mt-4 md:max-w-[365px] lg:max-w-xl">
              Scan your website to detect potential attacks, vulnerabilities,
              and security threats. This stage provides access to advanced
              features such as security settings, detailed reports, and
              role-based configurations.
            </p>
          </div>
        </div>

        <div className="mt-12 grid items-center gap-6 md:mt-32 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-2 text-[28px] font-bold uppercase tracking-[0.2em] text-[#163F36] leading-[36px]">
              STEP 3
            </p>

            <h3 className="text-[72px] font-semibold leading-[64px] text-[#2C2C2C]">
              03
            </h3>

            <h4 className="mt-2 text-[32px] font-semibold leading-none text-black/90 md:mt-3">
              Generate Report
            </h4>

            <p className="mt-3 max-w-xl text-[20px] font-normal leading-[40px] tracking-[-1px] text-black md:mt-4 md:max-w-[365px] lg:max-w-xl">
              Expired SSL certificates, misconfigured DNS records, exposed admin
              panels, and unresolved security vulnerabilities can leave your
              website vulnerable to attacks and service disruptions.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative aspect-[13/8] w-full max-w-[340px] overflow-hidden rounded-[18px] border-[3px] border-[#163f36] bg-[#f7f7f7] shadow-lg sm:max-w-[420px] sm:rounded-2xl sm:border-4 md:max-w-[520px] md:rounded-[32px] md:border-[6px] md:shadow-xl">
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
