import { ReactNode } from "react";

export default function PageHeader({
  title,
  description,
  className,
}: {
  title: string;
  description?: string | ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-1 ${className}`}>
      <h1 className="font-bold text-3xl md:text-4xl text-neutral-900 tracking-[-0.033em]">
        {title}
      </h1>
      {description && (
        <div className="text-neutral-600 leading-loose">{description}</div>
      )}
    </div>
  );
}
