import { Check } from "lucide-react";

const items = [
  {
    title: "Built for non-technical users",
    body: "VulnWatch AI is designed for real business teams who need clear answers, not confusing technical reports.",
  },
  {
    title: "AI-powered risk explanations",
    body: "We don't just flag issues, we explain what they mean, why they matter, and what to do next in plain English.",
  },
  {
    title: "Clear prioritization",
    body: "Not every issue deserves the same attention. We help users focus on the highest-impact risks first.",
  },
];

/** Renders the "What makes us different?" section highlighting VulnWatch AI's key differentiators. */
const Different = () => {
  return (
    <section className="bg-white px-5 py-16 md:px-20 md:py-24">
      <div className="mx-auto max-w-300">
        <h2 tabIndex={0} className="font-geist text-header/90 text-center text-2xl font-semibold tracking-[-0.02em] md:text-4xl outline-none focus-visible:ring-2 focus-visible:ring-[#072E28] focus-visible:ring-offset-2 rounded">
          What makes us different?
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-14 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center rounded-xl border border-[#EFEFEF] px-6 py-8 text-center"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#072E28]">
                <Check className="h-5 w-5 text-white" strokeWidth={3} />
              </div>
              <h3 className="font-geist text-header mt-5 text-base font-semibold md:text-lg">
                {item.title}
              </h3>
              <p className="font-inter text-body mt-3 text-sm leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Different;
