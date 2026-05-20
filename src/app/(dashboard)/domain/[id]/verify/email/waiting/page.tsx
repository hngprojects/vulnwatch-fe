import VerifyEmailWaitingPage from "@/features/domain/components/VerifyEmailWaitingPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <VerifyEmailWaitingPage domainId={id} />;
}
