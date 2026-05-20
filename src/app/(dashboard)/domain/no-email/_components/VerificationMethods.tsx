import Link from "next/link";
import { Database, FileUp, ExternalLink } from "lucide-react";

interface VerificationMethodsProps {
  domainName: string;
}

export default function VerificationMethods({ domainName }: VerificationMethodsProps) {
  return (
    <div className="w-full space-y-4 pt-2 border-t border-[#E5E7EB]/50">
      {/* Section label */}
      <p className="font-geist font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#666666]">
        Alternative Verification Methods
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Option 1: DNS TXT Record */}
        <div className="border border-[#072E28] rounded-lg p-4 bg-white transition duration-200">
          <div className="flex gap-3 items-start">
            <div className="w-9 h-9 rounded-lg bg-[#A0E870] flex items-center justify-center shrink-0">
              <Database size={18} className="text-[#072E28]" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-geist font-normal text-[16px] leading-[24px] tracking-[0px] text-[#2B2B2B]">
                Use DNS TXT Record
              </h3>
              <p className="font-geist font-normal text-[12px] leading-[16px] tracking-[0px] text-[#666666]">
                Add a TXT record to your domain&apos;s DNS settings.
              </p>
              <Link
                href={`/domain/no-email?method=dns&domain=${domainName}`}
                className="font-geist font-normal text-[12px] leading-[16px] tracking-[0px] text-[#072E28] hover:underline flex items-center gap-1 mt-2 cursor-pointer"
              >
                Use this method &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Option 2: File Upload */}
        <div className="border border-[#072E28] rounded-lg p-4 bg-white transition duration-200">
          <div className="flex gap-3 items-start">
            <div className="w-9 h-9 rounded-lg bg-[#A0E870] flex items-center justify-center shrink-0">
              <FileUp size={18} className="text-[#072E28]" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-geist font-normal text-[16px] leading-[24px] tracking-[0px] text-[#2B2B2B]">
                Use File Upload
              </h3>
              <p className="font-geist font-normal text-[12px] leading-[16px] tracking-[0px] text-[#666666]">
                Upload a verification file to your website&apos;s root directory.
              </p>
              <Link
                href={`/domain/no-email?method=file&domain=${domainName}`}
                className="font-geist font-normal text-[12px] leading-[16px] tracking-[0px] text-[#072E28] hover:underline flex items-center gap-1 mt-2 cursor-pointer"
              >
                Use this method &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: help link — desktop only */}
      <div className="hidden sm:flex items-center gap-1 pt-2 border-t border-[#E5E7EB]/50 w-full justify-center">
        <span className="font-geist font-normal text-[12px] leading-[16px] tracking-[0px] text-center text-[#666666]">
          Not sure which to choose?
        </span>
        <Link
          href="/docs"
          target="_blank"
          className="font-geist font-normal text-[12px] leading-[16px] tracking-[0px] text-center text-[#666666] underline decoration-dotted flex items-center gap-0.5"
        >
          View help documentation
          <ExternalLink size={12} className="text-[#666666]" />
        </Link>
      </div>
    </div>
  );
}
