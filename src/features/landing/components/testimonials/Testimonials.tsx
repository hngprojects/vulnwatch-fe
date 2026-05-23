import { Card } from "@/components/ui/card";

import { TESTIMONIALS } from "../../constants/testimonials";
import ScrollingRow from "./ScrollingRow";

// Rotate row 2 so both rows show different cards simultaneously.
const row2Testimonials = [
  ...TESTIMONIALS.slice(4),
  ...TESTIMONIALS.slice(0, 4),
];

const Testimonials = () => {
  return (
    <section className="space-y-12 overflow-x-hidden bg-white py-12 md:py-24">
      <div className="mx-auto max-w-xl space-y-4 px-5 text-center">
        <Card
          variant="neutral"
          className="inline-block rounded-lg px-4 py-1.5 text-sm font-medium text-neutral-900"
        >
          Testimonials
        </Card>
        <h2 className="text-4xl font-semibold text-[#2b2b2b]">
          Trusted by over 12,000+ teams worldwide
        </h2>
        <p className="text-muted-foreground">
          Loved by website security teams. Doubt us? Here&apos;s what our
          amazing users say.
        </p>
      </div>

      {/* Row 1 scrolls left. Row 2 starts with a different set of cards and
          scrolls right, creating a staggered, bidirectional visual effect. */}
      <div className="space-y-5 pb-2">
        <ScrollingRow testimonials={TESTIMONIALS} direction="left" />
        <ScrollingRow testimonials={row2Testimonials} direction="right" />
      </div>
    </section>
  );
};

export default Testimonials;
