import Image from "next/image";

export default function HowItWorks() {
  return (
    <main className="bg-white text-[#111]">
      {/* Top Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f9f9f9] via-[#f5ffe8] to-[#eefad9]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
            How It Works
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            No installs, no agents, no access to your hosting account. Just a
            domain and a minute of your time.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        {/* Heading */}
        <div className="mb-24 text-center">
          <h2 className="text-4xl font-semibold tracking-tight">
            Three (3) steps from Curious to Confident
          </h2>
        </div>

        {/* STEP 1 */}
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Left Content */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-600">
              STEP 1
            </p>

            <h3 className="text-7xl font-bold leading-none">01</h3>

            <h4 className="mt-6 text-4xl font-semibold">
              Add Your Domain
            </h4>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Enter your domain name and verify ownership to begin the security
              process. Users can choose from multiple verification methods,
              including DNS verification, Email verification, or File Upload
              verification.
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="flex justify-center">
            <div className="relative aspect-[13/8] w-full max-w-[520px] overflow-hidden rounded-[32px] border-[6px] border-[#163f36] bg-[#f7f7f7] shadow-xl">
              <Image
                src="/images/landing-page/01.png"
                alt="Dashboard preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
              />
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="mt-32 grid items-center gap-16 md:grid-cols-2">
          {/* Image Placeholder */}
          <div className="flex justify-center md:order-1">
            <div className="relative aspect-[13/8] w-full max-w-[520px] overflow-hidden rounded-[32px] border-[6px] border-[#163f36] bg-[#f7f7f7] shadow-xl">
              <Image
                src="/images/landing-page/02.png"
                alt="Website scan preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
              />
            </div>
          </div>

          {/* Text */}
          <div className="md:order-2">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-600">
              STEP 2
            </p>

            <h3 className="text-7xl font-bold leading-none">02</h3>

            <h4 className="mt-6 text-4xl font-semibold">
              Scan Your Website
            </h4>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Scan your website to detect potential attacks, vulnerabilities,
              and security threats. This stage provides access to advanced
              features such as security settings, detailed reports, and
              role-based configurations.
            </p>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="mt-32 grid items-center gap-16 md:grid-cols-2">
          {/* Left Content */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-600">
              STEP 3
            </p>

            <h3 className="text-7xl font-bold leading-none">03</h3>

            <h4 className="mt-6 text-4xl font-semibold">
              Generate Report
            </h4>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Expired SSL certificates, misconfigured DNS records, exposed admin
              panels, and unresolved security vulnerabilities can leave your
              website vulnerable to attacks and service disruptions.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative aspect-[13/8] w-full max-w-[520px] overflow-hidden rounded-[32px] border-[6px] border-[#163f36] bg-[#f7f7f7] shadow-xl">
              <Image
                src="/images/landing-page/03.png"
                alt="Generated report preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
