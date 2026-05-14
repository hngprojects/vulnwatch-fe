import Image from "next/image";

import { Card } from "@/components/ui/card";
import { TestimonialType } from "../../types";

// Exported so other components can derive layout values (e.g. half-card offsets)
// from the same source of truth as the w-72 class below.
export const CARD_WIDTH_PX = 288;

interface TestimonialCardProps {
  testimonial: TestimonialType;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const { name, role, company, quote, avatarUrl } = testimonial;

  return (
    <Card className="flex w-72 flex-none flex-col gap-4 p-5">
      <div className="flex items-center gap-3">
        <Image
          src={avatarUrl}
          alt={name}
          width={40}
          height={40}
          className="rounded-full object-cover"
          draggable={false}
        />
        <div>
          <p className="text-sm font-semibold text-neutral-900">{name}</p>
          <p className="text-muted-foreground text-xs">
            {role} · {company}
          </p>
        </div>
      </div>
      <p className="line-clamp-4 text-sm leading-relaxed text-neutral-600">
        &ldquo;{quote}&rdquo;
      </p>
    </Card>
  );
};

export default TestimonialCard;
