// this is just a demo page
import { TourProvider } from "@/features/dashboard/components/tour/TourProvider";

export default function TourDemoPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <TourProvider />
            <div className="flex-1 p-8">
                <h1 className="text-2xl font-bold mb-6">Dashboard Content</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100" data-tour="step-2">
                        <h3 className="text-lg font-semibold mb-2">Widget 1</h3>
                        <p className="text-gray-600">Some quick stats or information.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100" data-tour="step-3">
                        <h3 className="text-lg font-semibold mb-2">Widget 2</h3>
                        <p className="text-gray-600">More insights here.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100" data-tour="step-4">
                        <h3 className="text-lg font-semibold mb-2">Widget 3</h3>
                        <p className="text-gray-600">Even more details.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}