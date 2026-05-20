import type { Metadata } from "next";
import PressHero from "@/features/landing/components/press/PressHero";
import InTheNews from "@/features/landing/components/press/InTheNews";
import PressReleases from "@/features/landing/components/press/PressReleases";

export const metadata: Metadata = {
    title: "Press and Media | VulnWatch",
    description: "Stories, assets, and contacts for journalists.",
};

export default function PressPage() {
    return (
        <main className="min-h-screen bg-white">
            <PressHero />
            <InTheNews />
            <PressReleases />
        </main>
    );
}