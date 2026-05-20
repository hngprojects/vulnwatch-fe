import { ExternalLink } from "lucide-react";
import { newsItems } from "../../constants/press";

export default function InTheNews() {
    return (
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <h2 className="mb-8 text-[20px] font-bold text-[#000000] md:text-[24px]">
                In the news
            </h2>

            <ul className="divide-y divide-gray-200">
                {newsItems.map((item) => (
                    <li key={item.headline}>
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start justify-between gap-6 py-6"
                        >
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                                    <span className="text-[15px] font-semibold text-header md:text-base">
                                        {item.source}
                                    </span>
                                    <span className="text-xs text-gray-500 md:text-sm">
                                        {item.date}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-gray-800 transition group-hover:text-gray-600 md:text-base">
                                    {item.headline}
                                </p>
                            </div>

                            <ExternalLink
                                className="mt-1 h-5 w-5 shrink-0 text-gray-400 transition group-hover:text-header"
                                strokeWidth={1.75}
                            />
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}