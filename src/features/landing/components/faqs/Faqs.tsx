"use client";

import { Card, CardContent } from "@/components/ui/card";
import FaqAccordion from "./FaqAccordion";
import {
  FAQ_PAGE_CATEGORIES,
  FAQ_PAGE_GROUPS,
  FAQS_DATA,
  type FaqCategoryId,
} from "@/features/landing/constants/faqs";
import { Button } from "./ui/button";
import UserAvatarCascade from "../testimonials/UserAvatarCascade";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Bell,
  ChevronDown,
  CircleQuestionMark,
  CreditCard,
  Headphones,
  LockKeyhole,
  Rocket,
  ShieldCheck,
  SquareDashed,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

type FAQsProps = {
  variant?: "section" | "page";
};

const categoryIcons: Record<FaqCategoryId, LucideIcon> = {
  "getting-started": Rocket,
  "domain-verification": ShieldCheck,
  "vulnerability-scanning": SquareDashed,
  "monitoring-alert": Bell,
  "security-privacy": LockKeyhole,
  "billing-plans": CreditCard,
  others: CircleQuestionMark,
};

const SupportCard = ({ className = "" }: { className?: string }) => (
  <aside className={cn("faq-support-card", className)}>
    <Headphones className="h-11 w-11 shrink-0 stroke-[1.5]" />
    <div className="flex-1">
      <h3 className="text-[18px] leading-6 font-semibold md:text-[18px]">
        Still Need Help?
      </h3>
      <p className="mt-2 text-[14px] leading-4.25 text-[#333333] md:text-[14px] md:leading-5">
        Can&apos;t find the answer you&apos;re looking for? Our support team is
        here to help.
      </p>
      <Link
        href="/contact"
        className="mt-2 inline-flex text-[14px] leading-4 font-medium text-[#111111] md:text-[14px]"
      >
        Contact Support
      </Link>
    </div>
  </aside>
);

const Details = "details" as const;
const Summary = "summary" as const;

const FaqQuestion = ({
  question,
  answer,
  isDefaultOpen,
}: {
  question: string;
  answer: string;
  isDefaultOpen?: boolean;
}) => (
  <Details
    className="group faq-question"
    name="faq-page-questions"
    open={isDefaultOpen}
  >
    <Summary className="faq-question-summary">
      <span className="min-w-0">{question}</span>
      <ChevronDown className="h-4 w-4 shrink-0 stroke-[2.2] transition-transform duration-200 group-open:rotate-180 xl:h-5 xl:w-5" />
    </Summary>
    <p className="faq-question-answer">{answer}</p>
  </Details>
);

const FaqPage = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);

  const handleToggleCategories = () => {
    setShowAllCategories((prev) => !prev);
  };

  // Show first 3 groups initially, all groups when expanded
  const displayedGroups = showAllCategories
    ? FAQ_PAGE_GROUPS
    : FAQ_PAGE_GROUPS.slice(0, 3);

  return (
    <main className="faq-page">
      <section className="faq-page-hero">
        <div className="faq-page-hero-inner">
          <h1 className="faq-page-title">
            Frequently Asked{" "}
            <span className="text-primary">Questions</span>
          </h1>
          <p className="faq-page-description">
            Everything you need to know about domain verification, vulnerability
            scanning, monitoring, and security reports in VulnWatch.
          </p>
        </div>
      </section>

      <section className="faq-page-content">
        <div className="faq-page-shell">
          <aside className="faq-sidebar">
            <h2 className="faq-sidebar-title">Categories</h2>

            <nav aria-label="FAQ categories" className="mt-5 lg:mt-6">
              <ul className="space-y-2 lg:space-y-3">
                {FAQ_PAGE_CATEGORIES.map(({ id, label }) => {
                  const Icon = categoryIcons[id];
                  const isActive = id === "getting-started";

                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={cn(
                          "faq-category-link",
                          isActive
                            ? "faq-category-link-active"
                            : "faq-category-link-inactive",
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0 stroke-[1.4] xl:h-6 xl:w-6" />
                        <span>{label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <SupportCard className="mt-10 hidden lg:flex" />
          </aside>

          <div className="pt-8 lg:pt-0 lg:pl-8 xl:pl-14">
            <div className="space-y-6 lg:space-y-7">
              {displayedGroups.map((group, groupIndex) => (
                <section key={group.id} id={group.id} className="scroll-mt-24">
                  <h2 className="faq-group-title">{group.title}</h2>
                  <div className="space-y-2 lg:space-y-3">
                    {group.questions.map((faq, questionIndex) => (
                      <FaqQuestion
                        key={faq.question}
                        question={faq.question}
                        answer={faq.answer}
                        isDefaultOpen={groupIndex === 0 && questionIndex === 0}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {FAQ_PAGE_GROUPS.length > 3 && (
              <button
                type="button"
                onClick={handleToggleCategories}
                className="faq-show-more-button"
              >
                {showAllCategories ? "Show less" : "Show more category"}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 stroke-2 text-[#57D132] transition-transform xl:h-5 xl:w-5",
                    showAllCategories && "rotate-180",
                  )}
                />
              </button>
            )}

            <SupportCard className="mt-5 lg:hidden" />
          </div>
        </div>
      </section>
    </main>
  );
};

const FaqSection = () => {
  return (
    <section id="faqs" className="w-full bg-white py-12 md:py-24">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid items-center gap-16 bg-[#FAFAFA] px-4 py-10 sm:px-6 md:grid-cols-[min-content_1fr] md:rounded-4xl md:p-14">
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="mb-2 text-4xl font-semibold text-[#2b2b2b] md:text-[40px]">
                Frequently asked questions
              </h1>
              <p className="text-muted-foreground">
                Have Questions? Here are quick answers to some of the most
                common queries
              </p>
            </div>
            <Card>
              <CardContent className="space-y-3">
                <div className="space-y-1 leading-tight">
                  <h3 className="text-lg font-bold text-[#2b2b2b]">
                    More questions?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    We’re always ready to help you out.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
                  <UserAvatarCascade />
                  <Button
                    className="bg-[#A0E870] px-8 text-black hover:bg-[#A0E870]"
                    href="/contact"
                  >
                    Contact support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQList */}
          <FaqAccordion faqs={FAQS_DATA} />
        </div>
      </div>
    </section>
  );
};

const FAQs = ({ variant = "section" }: FAQsProps) => {
  if (variant === "page") {
    return <FaqPage />;
  }

  return <FaqSection />;
};

export default FAQs;
