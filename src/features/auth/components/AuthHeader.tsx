import React from "react";

export function AuthHeader() {
  return (
    <div className="mb-10 flex flex-col items-center text-center">
      <h1 className="font-geist mb-4 text-center text-[36px] leading-tight font-semibold tracking-[0.5px] text-[#000000] sm:text-[48px] sm:leading-[58px]">
        Create a new account
      </h1>
      <p className="font-geist text-center text-[18px] leading-[32px] font-normal text-[#666666] sm:text-[23px]">
        Monitor vulnerabilities, secure your accounts and stay ahead of threats
      </p>
    </div>
  );
}
