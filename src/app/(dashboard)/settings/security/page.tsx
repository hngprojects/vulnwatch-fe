import Settings from "@/features/dashboard/components/settings/Settings";

export default function SecuritySettingsPage() {
  return (
    <div className="px-4 md:px-6 py-6">
      <Settings initialTab="security" securityDetail />
    </div>
  );
}
