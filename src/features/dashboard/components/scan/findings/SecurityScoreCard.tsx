type SecurityScoreCardProps = {
  score: number;
  label?: string;
};

export function SecurityScoreCard({
  score,
  label = 'Your domain is at risk',
}: SecurityScoreCardProps) {
  return (
    <section className='rounded-xl border border-[#E5E7EB] bg-white p-5 md:p-5'>
      <h2 className='text-sm font-semibold text-[#111827]'>
        Your security score:
      </h2>

      <div className='mt-5 flex flex-col items-center md:mt-6'>
        <div
          className='grid h-36 w-36 place-items-center rounded-full md:h-40 md:w-40'
          style={{
            background: `conic-gradient(#EF233C 0deg ${
              score * 3.6
            }deg, #EFEFEF ${score * 3.6}deg 360deg)`,
          }}
          aria-label={`Security score ${score} out of 100`}
          role='img'
        >
          <div className='grid h-24 w-24 place-items-center rounded-full bg-white text-center md:h-28 md:w-28'>
            <div>
              <p className='text-3xl font-semibold leading-none text-[#EF233C]'>
                {score}
              </p>
              <p className='text-sm text-[#6B7280]'>/100</p>
            </div>
          </div>
        </div>

        <p className='mt-5 w-full rounded-full bg-[#FFE8EC] px-4 py-2 text-center text-sm font-semibold text-[#CF1F3A]'>
          {label}
        </p>
      </div>
    </section>
  );
}
