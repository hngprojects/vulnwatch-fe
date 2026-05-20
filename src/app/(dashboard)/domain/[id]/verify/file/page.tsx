import VerifyFileUploadPage from "@/features/domain/components/VerifyFileUploadPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <VerifyFileUploadPage domainId={id} />;
}
