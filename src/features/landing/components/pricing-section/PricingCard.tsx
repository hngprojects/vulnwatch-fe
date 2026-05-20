import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { Plan } from "./types";

interface PricingCardProps {
  plan: Plan;
  index: number;
}

const PricingCard = ({ plan, index }: PricingCardProps) => {
  return (
    <div
      key={`${plan.name}-${index}`}
      className={cn(
        "bg-cards relative flex flex-col overflow-hidden rounded-xl border md:min-h-[416px]",
        "transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer",
        plan.featured ? "border-primary border-2" : "border-border border",
      )}
    >
      {/* Featured Banner */}
      {plan.featured && (
        <div className="bg-primary text-primary-foreground py-3 text-center text-sm font-medium tracking-wide">
          Most Popular
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 pt-7">
        {/* Plan Name */}
        <h3 className="text-header mb-3 text-[15px] font-medium">
          {plan.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span
            className={cn(
              "text-[2.5rem] leading-none font-[400]",
              plan.featured ? "text-primary" : "text-[#2E251C]",
            )}
          >
            ${plan.price}
          </span>
          <span className="text-body text-[13px]">/mo (billed annually)</span>
        </div>

        {/* Features */}
        <div className="mt-auto">
          <p
            className={cn(
              "text-header mb-3 text-sm font-semibold",
              plan.featured ? "pt-10" : "pt-8 md:pt-0",
            )}
          >
            Features:
          </p>
          <ul className="space-y-3">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="text-muted-foreground flex items-start gap-2.5 text-sm"
              >
                <Image
                  src="/images/checkbox-circle-line.jpg"
                  alt=""
                  width={16}
                  height={16}
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <Link
            href={ROUTES.REGISTER}
            className="group/btn bg-primary text-primary-foreground relative block w-full overflow-hidden rounded-xl py-3.5 text-center text-sm font-semibold transition-colors hover:bg-[#0a3d36]"
          >
            <span className="relative">
              Try Demo
              <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover/btn:w-full" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
