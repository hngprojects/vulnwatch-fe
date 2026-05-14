import { Card, CardContent } from "@/components/ui/card";
import FaqAccordion from "./FaqAccordion";
import { FAQS_DATA } from "@/features/landing/constants/faqs";
import { Button } from "./ui/button";
import UserAvatarCascade from "../testimonials/UserAvatarCascade";

const FAQs = () => {
  return (
    <section id="faqs" className="w-full bg-white py-12 md:py-24">
      <div className="mx-auto max-w-[1280px] md:px-6 lg:px-8">
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

export default FAQs;
