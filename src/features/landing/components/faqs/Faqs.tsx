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
  <aside
    className={`flex items-center gap-5 rounded-[18px] border border-[#E8E8E8] bg-[#F7F7F7] px-5 py-6 text-[#2B2B2B] ${className}`}
  >
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

const FaqQuestion = ({
  question,
  answer,
  isDefaultOpen,
}: {
  question: string;
  answer: string;
  isDefaultOpen?: boolean;
}) => (
  <details
    className="group rounded-md border border-[#E7E7E7] bg-white open:bg-[#F7F7F7]"
    open={isDefaultOpen}
  >
    <summary className="flex min-h-11.25 cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-left text-[14px] leading-5 font-medium text-[#111111] [&::-webkit-details-marker]:hi
      <span className="min-w-0">{question}</span>
      <ChevronDown className="h-4 w-4 shrink-0 stroke-[2.2] transition-transform duration-200 group-open:rotate-180 xl:h-5 xl:w-5" />
    </summary>
    <p className="px-4 pb-5 text-[14px] leading-5.25 text-black md:text-[14px] md:leading-6 lg:px-5 xl:px-6 xl:pb-6 xl:text-[15px] xl:leading-7">
      {answer}
    </p>
  </details>
);

const FaqPage = () => (
  <main className="bg-white text-[#2B2B2B]">
    <section className="bg-[linear-gradient(180deg,#FFFFFF_0%,#FFFFFF_45%,#E4FFD8_100%)] px-4 py-8 text-center sm:py-12 md:py-16 lg:py-20 xl:py-23">
      <div className="mx-auto max-w-215">
        <h1 className="text-[22px] leading-5.5 font-semibold text-[#3A3A3A] sm:text-[32px] sm:leading-10 md:text-[44px] md:leading-13.5 lg:text-[56px] lg:leading-16.5 lg:font-bold xl:text-[64px] xl:le
          Frequently Asked{" "}
          <span className="text-primary">Questions</span>
        </h1>
        <p className="mx-auto mt-3 max-w-155 text-[16px] leading-5.5 text-[#666666] md:mt-5 md:text-[16px] md:leading-7 lg:mt-6 lg:text-[18px] lg:leading-8">
          Everything you need to know about domain verification, vulnerability
          scanning, monitoring, and security reports in VulnWatch.
        </p>
      </div>
    </section>

    <section className="px-3.25 py-8 sm:px-6 md:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[7px] border border-[#D9D9D9] bg-white lg:grid lg:grid-cols-[280px_1fr] lg:rounded-xl lg:px-6 lg:py-8 xl:grid-cols-[390px_1fr] xl:px-10 xl:py-10">
        <aside className="lg:border-r lg:border-[#E5E5E5] lg:pr-8 xl:pr-14">
          <h2 className="px-2 pt-3 text-[15px] leading-6 font-medium text-[#222222] md:text-[20px] md:leading-7 lg:px-0 lg:pt-0 lg:text-[22px] lg:font-semibold xl:text-[24px] xl:leading-8">
            Categories
          </h2>

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
                        "flex min-h-9.75 w-full items-center gap-4 rounded-md border border-[#EFEFEF] px-5 text-[14px] leading-5 transition-colors sm:min-h-12 md:text-[15px] lg:min-h-14 lg:px-6",
                        isActive
                          ? "border-primary bg-primary text-white"
                          : "bg-white text-[#222222] hover:border-[#D9D9D9]",
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
            {FAQ_PAGE_GROUPS.map((group, groupIndex) => (
              <section key={group.id} id={group.id} className="scroll-mt-24">
                <h2 className="mb-3 text-[17px] leading-6 font-semibold text-[#222222] md:text-[20px] md:leading-7 lg:mb-4 lg:text-[22px] xl:text-[24px] xl:leading-8">
                  {group.title}
                </h2>
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

          <button
            type="button"
            className="mt-11 flex min-h-14.25 w-full items-center justify-center gap-2 rounded-md border border-[#E7E7E7] bg-white px-4 text-[16px] leading-6 font-semibold text-[#222222] lg:mt-12 lg:m
          >
            Show more category
            <ChevronDown className="h-4 w-4 stroke-2 text-[#57D132] xl:h-5 xl:w-5" />
          </button>

          <SupportCard className="mt-5 lg:hidden" />
        </div>
      </div>
    </section>
  </main>
);

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
