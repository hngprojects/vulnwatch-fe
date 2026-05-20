import { pressHero } from "../../constants/press";

export default function PressHero() {
    return (
        <section
            className="relative px-6 pt-24 pb-24 md:pt-32 md:pb-10 bg-linear-to-b from-white via-[#F5FFF0] to-[#E4FFD8]"
        >
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-3xl font-[700] tracking-tight text-[#1F2937] md:text-5xl lg:text-6xl">
                    {pressHero.title}
                </h1>

                <p className="mt-5 text-base text-gray-600 md:text-lg">
                    {pressHero.subtitle}
                </p>

                <div className="mt-8 flex items-center justify-center gap-2 md:gap-3">
                    <a
                        href={`mailto:${pressHero.email}`}
                        className="inline-flex items-center gap-1.5 md:gap-2 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm text-gray-900 shadow-sm transition hover:shadow-md"
                    >
                        <img
                            src="/icons/icon-message.svg"
                            alt=""
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0"
                        />
                        {pressHero.email}
                    </a>

                    <a
                        href={pressHero.brandKitUrl}
                        className="inline-flex items-center gap-1.5 md:gap-2 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm text-gray-900 shadow-sm transition hover:shadow-md"
                    >
                        <img
                            src="/icons/icon-download.svg"
                            alt=""
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0"
                        />
                        Download Brand kit
                    </a>
                </div>
            </div>
        </section>
    );
}