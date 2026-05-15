const PricingHeader = () => {
  return (
    <div className="mx-auto mb-14 max-w-[730px] text-center">
      <span className="border-border text-header mb-6 inline-block rounded-xl border bg-[#FAFAFA] px-4 py-1.5 text-sm font-medium">
        Pricing
      </span>
      <h2 className="text-header mx-auto mb-6 text-2xl leading-tight font-bold md:text-[2.5rem]">
        Clear pricing for smarter, safer decisions
      </h2>
      <p className="text-body mx-auto max-w-md pb-5 text-sm md:text-base">
        No hidden fees. No confusion. Just the right plan for your security
        needs.
      </p>
    </div>
  );
};

export default PricingHeader;
