interface BrutalismBackgroundProps {
  isMobile: boolean
}

export function BrutalismBackground({ isMobile }: BrutalismBackgroundProps) {
  const size = (mobile: string, desktop: string) =>
    isMobile ? mobile : desktop

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ contain: 'layout style paint' }}>
      {/* Striped Square - Top Left */}
      <div
        className="brutalism-float-1 absolute -left-32 -top-40 h-80 w-80 border-4 border-black shadow-[24px_24px_0_0_#111] overflow-hidden"
        style={{
          background:
            'repeating-linear-gradient(45deg, #FF6F91 0px, #FF6F91 20px, #FFB6C1 20px, #FFB6C1 40px)',
          borderRadius: '2.75rem',
          willChange: 'transform',
        }}
      />

      {/* Grid Pattern Square - Bottom Right */}
      <div
        className="brutalism-float-2 absolute -bottom-44 right-[-6rem] h-[26rem] w-[26rem] border-4 border-black shadow-[28px_28px_0_0_#111]"
        style={{
          background:
            'linear-gradient(90deg, #111 2px, transparent 2px), linear-gradient(0deg, #111 2px, transparent 2px), #2EC4B6',
          backgroundSize: '40px 40px',
          borderRadius: '3rem',
          willChange: 'transform',
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        {/* Checkerboard Pattern - Top Left */}
        <div className="brutalism-float-3 absolute left-[5%] top-[15%]" style={{ willChange: 'transform' }}>
          <div
            className="border-4 border-black shadow-[16px_16px_0_0_#111] overflow-hidden"
            style={{
              width: size('140px', 'min(20vw, 12rem)'),
              height: size('140px', 'min(20vw, 12rem)'),
              background:
                'repeating-conic-gradient(#FFDF6B 0% 25%, #FCEE4B 0% 50%) 50% / 40px 40px',
              borderRadius: '2rem',
            }}
          />
        </div>

        {/* Dot Grid Circle - Top Right */}
        <div className="brutalism-float-4 absolute right-[8%] top-[20%]" style={{ willChange: 'transform' }}>
          <div
            className="rounded-full border-4 border-black shadow-[14px_14px_0_0_#111] overflow-hidden"
            style={{
              width: size('120px', 'min(18vw, 11rem)'),
              height: size('120px', 'min(18vw, 11rem)'),
              background:
                'radial-gradient(circle, #111 15%, transparent 15%), radial-gradient(circle, #111 15%, transparent 15%), #FF6F91',
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px',
            }}
          />
        </div>

        {/* Concentric Circles - Bottom Center */}
        <div className="brutalism-float-5 absolute bottom-[10%] left-1/2 -translate-x-1/2" style={{ willChange: 'transform' }}>
          <div
            className="rounded-full border-4 border-black shadow-[16px_16px_0_0_#111] relative overflow-hidden"
            style={{
              width: size('140px', 'min(22vw, 13rem)'),
              height: size('140px', 'min(22vw, 13rem)'),
              background: '#2EC4B6',
            }}>
            <div
              className="absolute inset-0"
              style={{
                background:
                  'repeating-radial-gradient(circle at center, transparent 0px, transparent 16px, #111 16px, #111 20px)',
              }}
            />
          </div>
        </div>

        {/* Striped Triangle - Left Middle */}
        <div className="brutalism-float-6 absolute left-[12%] top-[45%]" style={{ willChange: 'transform' }}>
          <div
            className="border-4 border-black shadow-[14px_16px_0_0_#111] overflow-hidden"
            style={{
              width: size('110px', 'min(18vw, 10rem)'),
              height: size('110px', 'min(18vw, 10rem)'),
              clipPath: 'polygon(50% 0%, 100% 90%, 0% 90%)',
              background:
                'repeating-linear-gradient(90deg, #FF8C42 0px, #FF8C42 16px, #FFA366 16px, #FFA366 32px)',
            }}
          />
        </div>

        {/* Patterned Circle - Right Middle */}
        <div className="brutalism-float-7 absolute right-[15%] top-[55%]" style={{ willChange: 'transform' }}>
          <div
            className="rounded-full border-4 border-black shadow-[14px_14px_0_0_#111] relative overflow-hidden"
            style={{
              width: size('120px', 'min(16vw, 11rem)'),
              height: size('120px', 'min(16vw, 11rem)'),
              background: '#FFB6C1',
            }}>
            <div className="absolute inset-[30%] rounded-full border-4 border-black bg-[#FFF7E0]" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, transparent 80deg, #111 80deg, #111 100deg, transparent 100deg, transparent 180deg, #111 180deg, #111 200deg, transparent 200deg)',
              }}
            />
          </div>
        </div>

        {/* Triangle Pattern - Top Center Right */}
        <div className="brutalism-float-8 absolute right-[20%] top-[8%]" style={{ willChange: 'transform' }}>
          <div
            className="border-4 border-black shadow-[12px_12px_0_0_#111] overflow-hidden"
            style={{
              width: size('95px', 'min(13vw, 8.5rem)'),
              height: size('95px', 'min(13vw, 8.5rem)'),
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              background:
                'repeating-linear-gradient(45deg, #2EC4B6 0px, #2EC4B6 12px, #5EDCD4 12px, #5EDCD4 24px)',
            }}
          />
        </div>

        {/* Circle with Concentric Rings - Left Bottom */}
        <div className="brutalism-float-1 absolute left-[18%] bottom-[20%]" style={{ willChange: 'transform', animationDelay: '-5s' }}>
          <div
            className="rounded-full border-4 border-black shadow-[14px_14px_0_0_#111] relative overflow-hidden"
            style={{
              width: size('110px', 'min(15vw, 9.5rem)'),
              height: size('110px', 'min(15vw, 9.5rem)'),
              background: '#FCEE4B',
            }}>
            <div
              className="absolute inset-0"
              style={{
                background:
                  'repeating-radial-gradient(circle at center, transparent 0px, transparent 8px, #111 8px, #111 12px, transparent 12px, transparent 20px, #111 20px, #111 24px)',
              }}
            />
          </div>
        </div>

        {/* Hexagon Pattern - Top Left Middle */}
        <div className="brutalism-float-3 absolute left-[25%] top-[35%]" style={{ willChange: 'transform', animationDelay: '-10s' }}>
          <div
            className="border-4 border-black shadow-[15px_15px_0_0_#111] overflow-hidden"
            style={{
              width: size('100px', 'min(14vw, 9rem)'),
              height: size('100px', 'min(14vw, 9rem)'),
              clipPath:
                'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background:
                'repeating-linear-gradient(60deg, #FF6F91 0px, #FF6F91 10px, #FFB6C1 10px, #FFB6C1 20px)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
