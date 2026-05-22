import VerifyMethodPage from "@/features/domain/components/VerifyMethodPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <VerifyMethodPage domainId={id} />;
}
