import React, { useState, useEffect, useRef, useCallback } from "react";

interface CardData {
  title: string;
  description: string;
}

interface HowItWorksCardProps {
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}

interface AnimationState {
  isHovered: boolean;
  borderProgress: number;
  particlesActive: boolean;
}

const cardData: CardData[] = [
  {
    title: "Connect AI:",
    description: "Send your assets to YANBOT AI Pool",
  },
  {
    title: "AI Market analysis:",
    description: "YANBOT scans the market 24/7 using advanced algorithms.",
  },
  {
    title: "Strategic Growth:",
    description: "When the time is right, it moves your tokens—automatically.",
  },
  {
    title: "Watch It Grow:",
    description: "Track performance in real-time with full transparency",
  },
];

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
  title,
  description,
  index,
  isVisible,
}) => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    isHovered: false,
    borderProgress: 0,
    particlesActive: false,
  });

  const cardRef = useRef<HTMLElement>(null);
  const borderAnimationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const animateBorder = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const progress = (elapsed % 3000) / 3000; // 3 second cycle

    setAnimationState((prev) => ({ ...prev, borderProgress: progress }));
    borderAnimationRef.current = requestAnimationFrame(animateBorder);
  }, []);

  useEffect(() => {
    if (isVisible) {
      borderAnimationRef.current = requestAnimationFrame(animateBorder);
      return () => {
        if (borderAnimationRef.current) {
          cancelAnimationFrame(borderAnimationRef.current);
        }
      };
    }
  }, [isVisible, animateBorder]);

  const handleMouseEnter = useCallback(() => {
    setAnimationState((prev) => ({
      ...prev,
      isHovered: true,
      particlesActive: true,
    }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setAnimationState((prev) => ({
      ...prev,
      isHovered: false,
      particlesActive: false,
    }));
  }, []);

  // Calculate border dash offset for animation
  const dashOffset = -animationState.borderProgress * 100;
  const glowIntensity = animationState.isHovered ? 0.3 : 0.1;

  return (
    <>
      <style>{`
        @keyframes borderFlow {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes energyPulse {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.9;
          }
        }

        @keyframes textReveal {
          0% {
            transform: translateY(20px) rotateX(-90deg);
            opacity: 0;
          }
          100% {
            transform: translateY(0) rotateX(0deg);
            opacity: 1;
          }
        }

        @keyframes particleFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) translateX(10px) rotate(90deg);
          }
          50% {
            transform: translateY(-8px) translateX(-5px) rotate(180deg);
          }
          75% {
            transform: translateY(-20px) translateX(8px) rotate(270deg);
          }
        }

        @keyframes cornerGlow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>

      <section
        ref={cardRef}
        className={`
          relative md:w-[1120px] md:h-[314px] w-full h-max 
          md:pt-[55px] pt-[23px] md:pl-[55px] pl-[28px] 
          md:pb-[46px] pb-[30px] md:pr-10 pr-4
          cursor-pointer overflow-hidden group
          transition-all duration-700 ease-out
          ${
            isVisible
              ? "opacity-100 translate-y-0 translate-x-0"
              : "opacity-0 translate-y-8 translate-x-4"
          }
          hover:scale-[1.02] hover:-translate-y-2
        `}
        style={{
          transitionDelay: `${index * 150}ms`,
          background: animationState.isHovered
            ? "linear-gradient(135deg, rgba(220,166,133,0.05) 0%, rgba(0,0,0,0.9) 100%)"
            : "rgba(0,0,0,0.2)",
          filter: animationState.isHovered
            ? "drop-shadow(0 0 30px rgba(220,166,133,0.15))"
            : "none",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Animated SVG Border */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <defs>
            <linearGradient
              id={`borderGradient-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#737272" stopOpacity="0.6" />
              <stop offset="30%" stopColor="#DCA685" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#DCA685" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#737272" stopOpacity="0.6" />
            </linearGradient>

            <filter id={`glow-${index}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke={`url(#borderGradient-${index})`}
            strokeWidth="2"
            strokeDasharray="20 10"
            strokeDashoffset={dashOffset}
            filter={`url(#glow-${index})`}
            opacity={isVisible ? 1 : 0}
            style={{
              transition: "opacity 0.5s ease-out",
              transitionDelay: `${index * 200}ms`,
            }}
          />

          {/* Corner energy points */}
          {animationState.isHovered && (
            <>
              <circle
                cx="0"
                cy="0"
                r="4"
                fill="#DCA685"
                opacity="0.8"
                style={{ animation: "cornerGlow 2s ease-in-out infinite" }}
              />
              <circle
                cx="100%"
                cy="0"
                r="4"
                fill="#DCA685"
                opacity="0.8"
                style={{ animation: "cornerGlow 2s ease-in-out infinite 0.5s" }}
              />
              <circle
                cx="100%"
                cy="100%"
                r="4"
                fill="#DCA685"
                opacity="0.8"
                style={{ animation: "cornerGlow 2s ease-in-out infinite 1s" }}
              />
              <circle
                cx="0"
                cy="100%"
                r="4"
                fill="#DCA685"
                opacity="0.8"
                style={{ animation: "cornerGlow 2s ease-in-out infinite 1.5s" }}
              />
            </>
          )}
        </svg>

        {/* Dynamic background glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at ${
              50 + Math.sin(animationState.borderProgress * Math.PI * 2) * 20
            }% ${
              50 + Math.cos(animationState.borderProgress * Math.PI * 2) * 20
            }%, rgba(220,166,133,${glowIntensity}) 0%, transparent 70%)`,
            opacity: isVisible ? 1 : 0,
          }}
        />

        {/* Enhanced scanning line */}
        <div
          className="absolute top-0 left-0 w-full h-[3px] overflow-hidden"
          style={{ zIndex: 2 }}
        >
          <div
            className={`
              h-full bg-gradient-to-r from-transparent via-[#DCA685] to-transparent
              transform transition-transform duration-2000 ease-in-out
              ${isVisible ? "translate-x-0" : "-translate-x-full"}
            `}
            style={{
              transitionDelay: `${index * 200 + 500}ms`,
              boxShadow: "0 0 20px rgba(220,166,133,0.8)",
            }}
          />
        </div>

        {/* Enhanced floating particles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-2 h-2 bg-[#DCA685] rounded-full opacity-0
              transition-opacity duration-1000
              ${animationState.particlesActive ? "opacity-60" : "opacity-0"}
            `}
            style={{
              left: `${15 + i * 18}%`,
              top: `${25 + i * 15}%`,
              animation: animationState.particlesActive
                ? `particleFloat ${3 + i * 0.5}s ease-in-out infinite`
                : "none",
              animationDelay: `${i * 0.3}s`,
              filter: "drop-shadow(0 0 8px rgba(220,166,133,0.6))",
              zIndex: 3,
            }}
          />
        ))}

        {/* Enhanced title with character animation */}
        <h3
          className={`
            text-[#e4e3e3] md:font-[275] font-[300] md:text-[66px] text-[24px] 
            md:leading-[110%] leading-[140%] relative z-10
            transition-all duration-700 ease-out transform
            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }
            group-hover:text-[#DCA685]
          `}
          style={{
            transitionDelay: `${index * 150 + 200}ms`,
            textShadow: animationState.isHovered
              ? "0 0 20px rgba(220,166,133,0.4)"
              : "none",
            animation: isVisible ? "textReveal 0.8s ease-out" : "none",
            animationDelay: `${index * 150 + 400}ms`,
            animationFillMode: "both",
          }}
        >
          {title.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-300 ease-out hover:scale-110 hover:text-[#f0c896]"
              style={{
                transitionDelay: `${i * 30}ms`,
                transform: animationState.isHovered
                  ? `translateY(${
                      Math.sin(Date.now() * 0.001 + i * 0.5) * 2
                    }px)`
                  : "translateY(0)",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h3>

        {/* Enhanced description */}
        <p
          className={`
            md:mt-6 mt-3 md:mb-10 mb-4 md:text-[24px] text-[15px] font-[275]
            transition-all duration-800 ease-out transform relative z-10
            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }
            group-hover:text-[#f0f0f0]
          `}
          style={{
            transitionDelay: `${index * 150 + 600}ms`,
            textShadow: animationState.isHovered
              ? "0 2px 8px rgba(0,0,0,0.8)"
              : "none",
          }}
        >
          {description}
        </p>

        {/* Enhanced decorative triangle with energy effect */}
        <div className="absolute -right-[2px] -top-[2px] md:w-[72px] w-[42px] md:h-[39px] h-[21px] overflow-hidden group z-10">
          <div
            className="absolute inset-0 bg-[#737272] transition-all duration-500"
            style={{
              clipPath: "polygon(0 100%, 0 0, 100% 100%)",
              background: animationState.isHovered
                ? "linear-gradient(45deg, #DCA685, #f0c896)"
                : "#737272",
              filter: animationState.isHovered
                ? "drop-shadow(0 0 15px rgba(220,166,133,0.6))"
                : "none",
            }}
          />
          <div
            className="absolute inset-0 bg-[#000000] transition-all duration-500"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%)",
              background: animationState.isHovered ? "#0a0a0a" : "#000000",
            }}
          />

          {/* Energy pulse effect */}
          {animationState.isHovered && (
            <div
              className="absolute inset-0 bg-[#DCA685] opacity-60"
              style={{
                clipPath: "polygon(0 100%, 0 0, 100% 100%)",
                animation: "energyPulse 1.5s ease-in-out infinite",
              }}
            />
          )}
        </div>

        {/* Enhanced progress indicator */}
        <div
          className={`
            absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#DCA685] via-[#f0c896] to-[#DCA685]
            transition-all duration-1200 ease-out
            ${isVisible ? "w-full" : "w-0"}
          `}
          style={{
            transitionDelay: `${index * 150 + 800}ms`,
            boxShadow: isVisible ? "0 0 10px rgba(220,166,133,0.5)" : "none",
          }}
        />

        {/* Connection point for lines */}
        <div
          className={`
            absolute right-4 bottom-4 w-3 h-3 bg-[#DCA685] rounded-full
            transition-all duration-500 z-20
            ${isVisible ? "opacity-80 scale-100" : "opacity-0 scale-0"}
          `}
          style={{
            transitionDelay: `${index * 150 + 1000}ms`,
            filter: "drop-shadow(0 0 8px rgba(220,166,133,0.8))",
            animation: animationState.isHovered
              ? "energyPulse 2s ease-in-out infinite"
              : "none",
          }}
        />
      </section>
    </>
  );
};

const HowItWorks: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(cardData.length).fill(false)
  );
  const [headerVisible, setHeaderVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeaderVisible(true);
            // Stagger card animations with improved timing
            cardData.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 300 + 400); // Increased delay for more dramatic effect
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative" ref={sectionRef} id="how-it-works">
      <div className="relative w-base md:mt-[540px] mt-[220px]">
        <div className="w-full md:flex">
          <div className="relative overflow-hidden">
            {/* Enhanced animated background element */}
            <div
              className={`
                absolute -left-4 -top-4 w-3 h-32 
                bg-gradient-to-b from-[#DCA685] via-[#f0c896] to-transparent
                transition-all duration-1200 ease-out transform
                ${
                  headerVisible
                    ? "opacity-80 translate-x-0 scale-y-100"
                    : "opacity-0 -translate-x-8 scale-y-0"
                }
              `}
              style={{
                filter: "drop-shadow(0 0 10px rgba(220,166,133,0.6))",
              }}
            />

            <h3
              className={`
                md:text-[90px] text-[32px] md:font-[275] font-[300] 
                md:leading-[110%] leading-[130%] text-[#E4E3E3]
                transition-all duration-1000 ease-out transform relative
                ${
                  headerVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }
              `}
              style={{
                textShadow: headerVisible
                  ? "0 0 30px rgba(220,166,133,0.3)"
                  : "none",
              }}
            >
              <span className="relative inline-block">
                How it works
                {/* Enhanced shimmer effect */}
                <div
                  className={`
                    absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(220,166,133,0.4)] to-transparent
                    ${headerVisible ? "animate-pulse" : "opacity-0"}
                  `}
                  style={{
                    animationDelay: "1.5s",
                    animationDuration: "3s",
                    animationIterationCount: "infinite",
                  }}
                />
              </span>
            </h3>

            <p
              className={`
                md:text-[24px] text-base font-[275] leading-[150%] 
                md:mt-8 mt-4 md:mb-[70px] mb-10
                transition-all duration-1000 ease-out transform
                ${
                  headerVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
              `}
              style={{
                transitionDelay: "500ms",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              Just connect your wallet and deposit your YAN tokens — that's it.
              <br />
              YANBOT monitors the market in real time and moves when growth is
              <br />
              most likely.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end sm:gap-20 gap-8 relative">
          {/* Enhanced connection lines between cards */}
          {cardData.map(
            (_, index) =>
              index < cardData.length - 1 && (
                <div
                  key={`line-${index}`}
                  className={`
                    absolute right-6 w-[3px] 
                    bg-gradient-to-b from-[#DCA685] via-[#f0c896] to-[rgba(220,166,133,0.3)]
                    transition-all duration-1200 ease-out
                    ${
                      visibleCards[index] && visibleCards[index + 1]
                        ? "opacity-60 h-20"
                        : "opacity-0 h-0"
                    }
                  `}
                  style={{
                    top: `${(index + 1) * 394 - 100}px`,
                    transitionDelay: `${index * 150 + 1200}ms`,
                    filter: "drop-shadow(0 0 8px rgba(220,166,133,0.5))",
                  }}
                />
              )
          )}

          {cardData.map((card, index) => (
            <HowItWorksCard
              key={index}
              title={card.title}
              description={card.description}
              index={index}
              isVisible={visibleCards[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
