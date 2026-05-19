import { HeroContent } from './HeroContent';
import { HeroDashboardPreview } from './HeroDashboardPreview';
import { HeroBackgroundGlow } from './HeroBackgroundGlow';
import { HERO_ARIA } from '../../constants/hero-content';

export function Hero() {
  return (
    <section
      aria-label={HERO_ARIA.section}
      className='relative w-full overflow-hidden bg-white'
    >
      <div
        className='absolute inset-0 z-0 hidden md:block'
        style={{
          background:
            'linear-gradient(180.52deg, #FFFFFF 54.04%, #A0E870 106.46%)',
        }}
        aria-hidden='true'
      />

      <HeroBackgroundGlow />

      <div
        className='absolute right-0 bottom-0 left-0 z-0 block md:hidden'
        aria-hidden='true'
      >
        <svg
          width='390'
          height='243'
          viewBox='0 0 390 243'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-full'
          preserveAspectRatio='none'
        >
          <path
            d='M-8.85791 43.0656C-26.5933 47.9925 -43.2788 95.732 -43.2788 95.732L-47 273.321L488.106 266.577V43.0656C488.106 43.0656 470.928 12.5557 456.662 3.56581C420.108 -19.4681 404.496 88.089 360.5 43.0656C316.503 31.4656 125.99 2.345 72.2837 12.6648C33.9845 20.6942 9.68174 36.1232 -8.85791 43.0656Z'
            fill='url(#paint0_linear_4803_20143)'
            stroke='#E9EFFD'
            strokeWidth='0.640845'
          />
          <defs>
            <linearGradient
              id='paint0_linear_4803_20143'
              x1='-135.5'
              y1='-27.6794'
              x2='220.553'
              y2='273.321'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#A0E870' />
              <stop offset='1' stopColor='white' />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className='relative z-10 mx-auto max-w-7xl px-5 pt-20 pb-16 md:px-8 md:pt-24 lg:pt-28'>
        <HeroContent />
      </div>

      <div className='relative z-10 pb-0'>
        <HeroDashboardPreview />
      </div>
    </section>
  );
}