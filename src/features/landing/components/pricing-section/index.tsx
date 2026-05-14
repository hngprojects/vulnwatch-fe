import PricingHeader from "./PricingHeader";
import PricingCard from "./PricingCard";
import { plans } from "./constants";

const PricingSection = () => {
  const cardLayoutClasses = [
    "md:order-1",
    "md:order-3 md:col-span-2 md:mx-auto md:w-full md:max-w-[430px] lg:order-2 lg:col-span-1 lg:max-w-none",
    "md:order-2",
  ];

  return (
    <section className="mx-auto w-full bg-[#F1FCEA] px-4 py-20 lg:px-15">
      <div className="mx-auto w-full max-w-[1280px]">
        <PricingHeader />

        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {plans.map((plan, index) => (
            <div
              key={`${plan.name}-${index}`}
              className={cardLayoutClasses[index] ?? ""}
            >
              <PricingCard plan={plan} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
