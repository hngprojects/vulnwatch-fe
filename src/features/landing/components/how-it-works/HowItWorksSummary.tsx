import Link from "next/link";

export default function HowItWorksSummary() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f9f9f9] via-[#f5ffe8] to-[#eefad9] opacity-50" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6">
        <h2 className="text-[32px] font-bold tracking-tight text-[#111] md:text-[48px]">
          How It Works
        </h2>
        
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#666] md:text-xl">
          Get started with VulnWatch AI in minutes. No complex installations or agent setups required. 
          Our non-intrusive scanning process ensures your security without affecting your performance.
        </p>
        
        <div className="mt-10">
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center rounded-full bg-[#163F36] px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[#0d2a24] hover:shadow-lg"
          >
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}
