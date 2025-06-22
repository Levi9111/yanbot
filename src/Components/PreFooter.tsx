import { useState, useEffect, useRef } from "react";

const PreFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mouse tracking for parallax effects
  useEffect(() => {
    interface MouseEventWithClient extends MouseEvent {
      clientX: number;
      clientY: number;
    }

    const handleMouseMove = (e: MouseEventWithClient) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        setMousePosition({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Generate random stars
  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleDelay: Math.random() * 3,
    }));
  };

  const stars = generateStars(30);

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes borderFlow {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes cornerGlow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        
        @keyframes energyPulse {
          0%, 100% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes quantumShimmer {
          0% {
            transform: translateX(-100%) skewX(-15deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(400%) skewX(-15deg);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(180deg);
          }
        }
        
        @keyframes hologramFlicker {
          0%, 100% {
            opacity: 0.1;
          }
          10%, 90% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>

      <section
        className="relative md:mt-[520px] mt-14 overflow-hidden"
        ref={sectionRef}
      >
        <div className="w-full">
          <div
            ref={containerRef}
            className={`
              max-w-[1360px] w-[98%] mx-auto md:h-[512px] h-[208px] 
              relative flex flex-col items-center justify-center text-center px-4
              overflow-hidden group
              transition-all duration-1000 ease-out
              ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }
            `}
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(220,166,133,0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(138,43,226,0.03) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(25,25,112,0.02) 0%, transparent 70%)
              `,
            }}
          >
            {/* Advanced Border System */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ filter: "drop-shadow(0 0 8px rgba(220,166,133,0.3))" }}
            >
              <defs>
                <linearGradient
                  id="borderGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#737272" stopOpacity="0.8" />
                  <stop offset="25%" stopColor="#DCA685" stopOpacity="1" />
                  <stop offset="50%" stopColor="#737272" stopOpacity="0.6" />
                  <stop offset="75%" stopColor="#DCA685" stopOpacity="1" />
                  <stop offset="100%" stopColor="#737272" stopOpacity="0.8" />
                </linearGradient>

                <linearGradient
                  id="energyGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="20%" stopColor="rgba(220,166,133,0.8)" />
                  <stop offset="50%" stopColor="rgba(220,166,133,1)" />
                  <stop offset="80%" stopColor="rgba(220,166,133,0.8)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>

                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Main border rectangle */}
              <rect
                x="2"
                y="2"
                width="calc(100% - 4px)"
                height="calc(100% - 4px)"
                fill="none"
                stroke="url(#borderGradient)"
                strokeWidth="1"
                strokeDasharray="20 10"
                className="group-hover:stroke-[#DCA685] transition-all duration-500"
                style={{
                  animation: isVisible
                    ? "borderFlow 3s linear infinite"
                    : "none",
                  filter: "url(#glow)",
                }}
              />

              {/* Energy pulse lines */}
              <rect
                x="0"
                y="0"
                width="100%"
                height="2"
                fill="url(#energyGradient)"
                style={{
                  animation: isVisible
                    ? "energyPulse 4s ease-in-out infinite"
                    : "none",
                  animationDelay: "1s",
                }}
              />
              <rect
                x="0"
                y="calc(100% - 2px)"
                width="100%"
                height="2"
                fill="url(#energyGradient)"
                style={{
                  animation: isVisible
                    ? "energyPulse 4s ease-in-out infinite"
                    : "none",
                  animationDelay: "2.5s",
                }}
              />
            </svg>

            {/* Corner accent elements */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top-left corner */}
              <div className="absolute top-0 left-0 w-16 h-16">
                <div
                  className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-[#DCA685]"
                  style={{
                    animation: isVisible
                      ? "cornerGlow 2s ease-in-out infinite"
                      : "none",
                    filter: "drop-shadow(0 0 4px rgba(220,166,133,0.6))",
                  }}
                />
                <div
                  className="absolute top-1 left-1 w-1 h-1 bg-[#DCA685] rounded-full"
                  style={{
                    animation: isVisible
                      ? "twinkle 3s ease-in-out infinite"
                      : "none",
                    animationDelay: "0.5s",
                  }}
                />
              </div>

              {/* Top-right corner */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div
                  className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-[#DCA685]"
                  style={{
                    animation: isVisible
                      ? "cornerGlow 2s ease-in-out infinite"
                      : "none",
                    animationDelay: "0.7s",
                    filter: "drop-shadow(0 0 4px rgba(220,166,133,0.6))",
                  }}
                />
              </div>

              {/* Bottom-left corner */}
              <div className="absolute bottom-0 left-0 w-16 h-16">
                <div
                  className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-[#DCA685]"
                  style={{
                    animation: isVisible
                      ? "cornerGlow 2s ease-in-out infinite"
                      : "none",
                    animationDelay: "1.4s",
                    filter: "drop-shadow(0 0 4px rgba(220,166,133,0.6))",
                  }}
                />
              </div>

              {/* Bottom-right corner */}
              <div className="absolute bottom-0 right-0 w-16 h-16">
                <div
                  className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-[#DCA685]"
                  style={{
                    animation: isVisible
                      ? "cornerGlow 2s ease-in-out infinite"
                      : "none",
                    animationDelay: "2.1s",
                    filter: "drop-shadow(0 0 4px rgba(220,166,133,0.6))",
                  }}
                />
                <div
                  className="absolute bottom-1 right-1 w-1 h-1 bg-[#DCA685] rounded-full"
                  style={{
                    animation: isVisible
                      ? "twinkle 2.5s ease-in-out infinite"
                      : "none",
                    animationDelay: "1s",
                  }}
                />
              </div>
            </div>

            {/* Animated Space Background */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Holographic scan lines */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 4px,
                    rgba(220,166,133,0.1) 4px,
                    rgba(220,166,133,0.1) 5px
                  )`,
                  animation: "hologramFlicker 4s ease-in-out infinite",
                }}
              />

              {/* Stars */}
              {stars.map((star) => (
                <div
                  key={`star-${star.id}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    animation: `twinkle ${
                      2 + Math.random() * 3
                    }s ease-in-out infinite`,
                    animationDelay: `${star.twinkleDelay}s`,
                    transform: `translate(${mousePosition.x * 5}px, ${
                      mousePosition.y * 5
                    }px)`,
                    transition: "transform 0.1s ease-out",
                  }}
                />
              ))}

              {/* Quantum energy shimmer */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DCA685]/20 to-transparent"
                style={{
                  animation: isVisible
                    ? "quantumShimmer 6s ease-in-out infinite"
                    : "none",
                  animationDelay: "3s",
                }}
              />
            </div>

            {/* Enhanced Triangle Decorator */}
            <div className="absolute -right-[2px] -top-[2px] md:w-[72px] w-[42px] md:h-[39px] h-[21px] overflow-hidden group">
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#DCA685] to-[#737272] transition-all duration-500"
                style={{
                  clipPath: "polygon(0 100%, 0 0, 100% 100%)",
                  filter: "drop-shadow(0 0 8px rgba(220,166,133,0.4))",
                  animation: isVisible
                    ? "cornerGlow 3s ease-in-out infinite"
                    : "none",
                  animationDelay: "2s",
                }}
              />
              <div
                className="absolute inset-0 bg-[#000000] transition-all duration-500"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
              />

              {/* Floating star near triangle */}
              <div
                className="absolute -top-2 -right-2 w-1 h-1 bg-[#DCA685] rounded-full"
                style={{
                  animation: "float 2s ease-in-out infinite",
                  animationDelay: "1s",
                  filter: "drop-shadow(0 0 4px rgba(220,166,133,0.8))",
                }}
              />
            </div>

            {/* Enhanced Text Content */}
            <h3
              className={`
                font-poppins font-[275] sm:text-[72px] text-[24px] sm:leading-[110%] leading-[130%] text-white
                transition-all duration-1000 ease-out transform relative z-10
                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
                group-hover:text-[#f8f8f8] group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]
              `}
              style={{
                transitionDelay: "300ms",
                textShadow: "0 0 20px rgba(255,255,255,0.1)",
                transform: `translate(${mousePosition.x * 2}px, ${
                  mousePosition.y * 2
                }px)`,
              }}
            >
              <span className="relative inline-block">
                AI-Powered Finance.
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DCA685] to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ filter: "blur(10px)" }}
                />
              </span>
              <span className="block" />
              <span className="relative inline-block">Made Effortless.</span>
            </h3>

            <p
              className={`
                font-poppins font-[275] sm:text-[24px] text-[15px] md:leading-[150%] leading-[130%] 
                text-[#dcdcdc] md:mt-6 mt-[7px] max-w-[950px] relative z-10
                transition-all duration-1000 ease-out transform
                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }
                group-hover:text-[#f0f0f0]
              `}
              style={{
                transitionDelay: "500ms",
                transform: `translate(${mousePosition.x * 1}px, ${
                  mousePosition.y * 1
                }px)`,
              }}
            >
              You don't need to be a trader. Let YANBOT do the hard work
              <span className="md:block" /> while you stay in control.
            </p>

            <a
              href="https://t.me/tokenyan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className={`
                  md:mt-10 mt-4 font-[275] md:w-[204px] w-[104px] h-[34px] md:h-[66px] 
                  rounded-full md:text-lg text-[13px] border border-white text-white 
                  relative overflow-hidden group/btn z-10
                  transition-all duration-500 ease-out transform
                  ${
                    isVisible
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-8 opacity-0 scale-95"
                  }
                  hover:bg-[#DCA685]/20 hover:text-[#DCA685] hover:border-[#DCA685]
                  hover:scale-105 hover:shadow-[0_0_30px_rgba(220,166,133,0.4)]
                `}
                style={{
                  transitionDelay: "700ms",
                  transform: `translate(${mousePosition.x * 0.5}px, ${
                    mousePosition.y * 0.5
                  }px) scale(${isVisible ? 1 : 0.95})`,
                }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#DCA685]/0 via-[#DCA685]/10 to-[#DCA685]/0 
                             opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
                />

                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                             -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"
                />

                <span className="relative z-10">Learn How</span>

                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-[#DCA685] rounded-full opacity-0 group-hover/btn:opacity-60 transition-opacity duration-500"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${20 + i * 20}%`,
                      animation: `float 2s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default PreFooter;
