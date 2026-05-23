"use client";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQType } from "../../types";

interface FaqAccordionProperties {
  faqs: FAQType[];
  containerClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

const FaqAccordion = ({
  faqs,
  triggerClassName,
  contentClassName,
  containerClassName,
}: FaqAccordionProperties) => {
  return (
    <div
      role="region"
      className={cn(
        "inline-flex w-full flex-col items-start justify-start rounded-xl",
        containerClassName,
      )}
    >
      <Accordion
        type="single"
        collapsible
        defaultValue="item-0"
        className="w-full space-y-4"
      >
        {faqs?.map((faq, index) => {
          const isClickable = !!faq.question && !!faq.answer;

          return (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger
                className={cn(
                  "text-md text-left font-geist font-semibold text-[#2B2B2B] [&>svg]:text-[#2B2B2B] hover:no-underline",
                  isClickable
                    ? "cursor-pointer"
                    : "pointer-events-none opacity-30",
                  triggerClassName,
                )}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent
                className={cn(
                  "text-sm text-[16px] leading-relaxed text-[#666666] font-geist font-normal",
                  contentClassName,
                )}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default FaqAccordion;
