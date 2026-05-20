import DomainVerifiedPage from "@/features/domain/components/DomainVerifiedPage";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ domain?: string; verifiedAt?: string }>;
}) {
  const { id } = await params;
  const { domain, verifiedAt } = await searchParams;

  return (
    <DomainVerifiedPage
      domain={domain ?? id}
      verifiedAt={verifiedAt}
    />
  );
}
