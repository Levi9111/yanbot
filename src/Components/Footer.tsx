import line from "../assets/line.png";
import telegram from "../assets/telegram.png";
import x from "../assets/x.png";
import social from "../assets/social.png";
import sphere from "../assets/sphere.png";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const socials = [
  { icon: telegram, path: "https://t.me/cryptoyan_chat" },
  {
    icon: social,
    path: "https://dexscreener.com/ton/eqb64hjtcadjyg0u4_ryv7owou5fynb89codcy2zj4cnn-ym",
  },
  { icon: x, path: "https://x.com/yanbot_ai" },
];

// Floating particle component
const FloatingParticle = ({ delay = 0, duration = 4 }) => (
  <motion.div
    className="absolute w-1 h-1 bg-white rounded-full opacity-30"
    initial={{
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 10,
      opacity: 0,
    }}
    animate={{
      y: -10,
      opacity: [0, 0.6, 0],
      scale: [0.5, 1, 0.5],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

// Star field background
type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  twinkleDelay: number;
};

const StarField = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          twinkleDelay: Math.random() * 3,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: star.twinkleDelay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced social button with orbital animation
type SocialButtonProps = {
  icon: { icon: string; path: string };
  path: string;
  index: number;
};

const SocialButton = ({ icon, path, index }: SocialButtonProps) => {
  return (
    <motion.a
      href={path}
      target="_blank"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.15,
        rotate: [0, -10, 10, 0],
        transition: { duration: 0.5 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative group">
        {/* Orbital ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/20"
          style={{
            width: "calc(100% + 20px)",
            height: "calc(100% + 20px)",
            left: "-10px",
            top: "-10px",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/10 blur-sm"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <button
          className="group md:w-[90px] w-10 md:h-[90px] h-10 rounded-full flex items-center justify-center cursor-pointer relative z-10"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #FFFFFF 0%, #161614 36.16%)",
          }}
        >
          <div className="md:w-[86px] w-9 md:h-[86px] h-9 bg-[#161614] rounded-full z-20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-[#1d1d1b] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            <motion.img
              src={icon.icon}
              alt="social"
              width={42}
              height={36}
              className="md:block hidden"
              whileHover={{
                rotate: [0, 10, -10, 0],
                scale: 1.1,
              }}
              transition={{ duration: 0.5 }}
            />
            <motion.img
              src={icon.icon}
              alt="social"
              width={18}
              height={16}
              className="md:hidden"
              whileHover={{
                rotate: [0, 10, -10, 0],
                scale: 1.1,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </button>
      </div>
    </motion.a>
  );
};

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <footer
      ref={footerRef}
      className="md:mt-[152px] relative overflow-hidden md:pb-10 pb-4 md:pl-0 pl-2"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(30, 30, 30, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)",
      }}
    >
      {/* Animated star field */}
      <StarField />

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <FloatingParticle
          key={i}
          delay={i * 0.5}
          duration={4 + Math.random() * 2}
        />
      ))}

      {/* Enhanced sphere with cosmic glow */}
      <motion.div
        className="absolute -left-14 top-10 md:block hidden"
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-blue-400/20 to-transparent rounded-full blur-xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: "300px",
              height: "300px",
              left: "-50px",
              top: "-50px",
            }}
          />
          <img src={sphere} alt="Sphere" className="opacity-20 relative z-10" />
        </div>
      </motion.div>

      <motion.div
        className="absolute -right-10 bottom-0 md:hidden"
        animate={{
          rotate: -360,
          y: [0, -10, 0],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-purple-400/20 to-transparent rounded-full blur-lg"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: "280px",
              height: "280px",
              left: "-30px",
              top: "-30px",
            }}
          />
          <img
            src={sphere}
            alt="Sphere"
            width={220}
            height={220}
            className="opacity-20 relative z-10"
          />
        </div>
      </motion.div>

      <div className="w-base relative z-10">
        <div className="mt-[84px] h-[250px] relative">
          <motion.div
            className="flex items-start max-w-[728px] md:absolute md:right-20"
            initial="hidden"
            animate={mainControls}
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                },
              },
            }}
          >
            <div className="text-left">
              <motion.h3
                className="font-[275] md:text-[66px] text-[32px] md:leading-[110%] leading-[130%] text-[#e4e3e3]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.span
                  className="inline-block"
                  whileHover={{
                    textShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
                    transition: { duration: 0.3 },
                  }}
                >
                  Join Us
                </motion.span>
              </motion.h3>

              <motion.p
                className="font-[275] md:text-xl text-base md:leading-[150%] leading-[170%] md:my-8 mt-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Connect with us on Telegram to get updates, ask questions, and
                see how others are growing with CryptoYan.
              </motion.p>

              <motion.a
                href="https://t.me/cryptoyan_chat"
                target="_blank"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                  type: "spring",
                  stiffness: 150,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <button className="relative border border-white rounded-full md:w-[180px] md:h-[54px] w-[101px] h-[34px] sm:text-[24px] text-[13px] sm:font-[500] font-[400] sm:leading-[140%] leading-[170%] text-white overflow-hidden uppercase group">
                  {/* Cosmic background animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Pulsing border effect */}
                  <motion.div
                    className="absolute inset-0 border border-white/50 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 5px rgba(255, 255, 255, 0.3)",
                        "0 0 20px rgba(255, 255, 255, 0.6)",
                        "0 0 5px rgba(255, 255, 255, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Let's talk
                  </span>
                </button>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="md:flex hidden absolute bottom-0 gap-[108px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {["Terms and conditions", "Privacy policy"].map((text, index) => (
              <motion.a
                key={text}
                href=""
                className="text-xl font-[275] leading-[150%] text-[#e1dfdf] relative group"
                whileHover={{
                  color: "#ffffff",
                  textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              >
                {text}
                <motion.span
                  className="block h-[1px] w-0 bg-gradient-to-r from-blue-400 to-purple-400 absolute bottom-0 left-0"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.img
          src={line}
          alt="line"
          className="mt-10 md:block hidden"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          style={{ originX: 0 }}
        />

        <motion.div
          className="flex items-center justify-between max-w-[1230px] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="flex md:gap-6 gap-4">
            {socials.map((icon, i) => (
              <SocialButton key={i} icon={icon} path={icon.path} index={i} />
            ))}
          </div>

          <motion.p
            className="font-poppins font-[275] text-[20px] leading-[150%] text-center md:block hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            © {new Date().getFullYear()} All rights reserved ||
            support@cryptoyan.org
          </motion.p>
        </motion.div>

        <motion.div
          className="relative z-30 md:hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          {["Terms and conditions", "Privacy policy"].map((text, index) => (
            <motion.a
              key={text}
              href=""
              className="text-xl font-[275] leading-[150%] text-[#e1dfdf] block mt-[30px] mb-4 relative group"
              whileHover={{
                color: "#ffffff",
                x: 10,
              }}
              transition={{ duration: 0.2 }}
            >
              {text}
              <motion.span
                className="block h-[1px] w-0 bg-gradient-to-r from-blue-400 to-purple-400 absolute bottom-0 left-0"
                whileHover={{ width: index === 0 ? "70%" : "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          className="md:hidden font-[275] text-[13px] leading-[170%] text-center mt-11"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          © {new Date().getFullYear()} All rights reserved ||
          support@cryptoyan.org
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
