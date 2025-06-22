import sphere from "../assets/sphere.png";
import circle from "../assets/circle.png";
import shade from "../assets/shade.png";
import shadeMobile from "../assets/shade-mobile.png";
import diamond from "../assets/diamond.png";
import personIcon from "../assets/person-icon.png";
import shieldIcon from "../assets/shield-icon.png";
import { useState } from "react";

const Hero = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300); // Reset after animation
    // Trigger actual explore functionality here
  };
  return (
    <section className="md:pt-36 pt-16 relative">
      {/* Headline & Sphere */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full max-w-[1540px] mx-auto px-4 relative text-center sm:text-right">
        {/* Headline (mobile) */}
        <h1 className="block sm:hidden text-3xl text-[#e4e3e3] leading-[130%] font-light">
          A financial AI
          <br /> Assistant Predicts
          <br /> Growth
        </h1>

        {/* Left text (desktop only) */}
        <h1 className="hidden sm:block font-extralight text-[40px] md:text-[60px] lg:text-[80px] 2xl:text-[95px] leading-[110%] tracking-[0.02em] text-right z-10">
          A financial <br /> AI Assistant
        </h1>

        {/* Sphere Image */}
        <div className="relative  2xl:w-[480px] md:w-[400px] sm:w-[350px] flex items-center justify-center">
          <img
            src={sphere}
            alt="Sphere"
            className="w-[180px] h-[180px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] 2xl:w-[462px] 2xl:h-[461px] translate-x-6 sm:translate-x-0 z-20 relative"
          />
          <img
            src={shade}
            alt="Shade"
            className="hidden sm:block absolute 2xl:left-[170px] left-[140px] -bottom-20  w-[50px] sm:h-[135px] -rotate-4"
          />
          <img
            src={shadeMobile}
            alt="Shade"
            className="sm:hidden absolute left-24  -bottom-7 transform  -translate-x-1 w-[12px] h-[60px] rotate-6"
          />
        </div>

        {/* Right text (desktop only) */}
        <h1 className="hidden sm:block font-extralight text-[40px] md:text-[60px] lg:text-[80px] 2xl:text-[95px] leading-[110%] tracking-[0.02em] text-right">
          Predicts <br className="md:block hidden" /> Growth
        </h1>
      </div>
      {/* Central About Circle */}
      <div className="w-full flex items-center justify-center sm:mt-16 mt-3 relative px-4">
        <div
          className="w-[320px] h-[320px] sm:w-[520px] sm:h-[520px] md:w-[726px] md:h-[726px] bg-white rounded-full absolute -z-10 sm:top-16 top-10 flex items-center justify-center  sm:hidden"
          style={{
            backgroundImage:
              "linear-gradient(to bottom,#ffffff 0%, #000000 55%)",
          }}
        >
          <div className="w-full h-full bg-black rounded-full flex flex-col items-center justify-center px-6 text-center">
            <h3 className="text-[24px] sm:text-[32px] text-[#DCA685] font-extralight mb-2 sm:mb-4 sm:mt-16 mt-0">
              About
            </h3>
            <p className="text-lg sm:text-2xl leading-[140%] font-extralight max-w-[640px]">
              YANBOT is an AI that analyzes the market and finds the right
              moment to grow. You just join. It does the rest.
            </p>
          </div>
        </div>

        {/* Explore Button */}
        <div
          onClick={handleClick}
          className={`w-[99px] h-[99px] sm:w-[150px] sm:h-[150px] md:w-[177px] md:h-[177px] 
      bg-[#D3554E] rounded-full md:translate-x-2.5 flex sm:hidden items-center 
      justify-center rotate-[30deg] z-30 cursor-pointer 
      transition-transform duration-300 ease-out 
    ${clicked ? "scale-110 " : "scale-100"}`}
          style={{
            backgroundImage: "linear-gradient(90deg,#D3554E 0%, #D9D9D9 30%)",
          }}
        >
          <div className="w-[96px] h-[96px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[172px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
            <p className="text-black font-[400] text-sm sm:text-lg text-center uppercase">
              Explore <br /> more
            </p>
          </div>
        </div>
      </div>
      {/* Explore more section Desktop */}
      <div className="w-base sm:flex hidden items-center justify-center  relative">
        <a href="https://t.me/tokenyan" target="_blank">
          <button
            className="group w-[177px] h-[177px] bg-[#D3554E] rounded-full translate-x-1.5 flex items-center justify-center rotate-[30deg] transition-all duration-500 ease-in-out hover:rotate-[-10deg] hover:scale-105 cursor-pointer"
            style={{
              backgroundImage: "linear-gradient(90deg,#D3554E 0%, #D9D9D9 30%)",
            }}
          >
            <div className="w-[170px] h-[172px] bg-[#D9D9D9] rounded-full flex items-center justify-center transition-colors duration-500 ease-in-out group-hover:bg-white">
              <p className="text-black font-[400] text-[24px] text-center uppercase transition-transform duration-500 group-hover:scale-105 group-hover:tracking-wider">
                Explore <br /> more
              </p>
            </div>
          </button>
        </a>

        <div
          className="w-[426px] h-[426px] md:w-[726px] md:h-[726px] lg:w-[826px] lg:h-[826px] 2xl:w-[920px] 2xl:h-[920px]  bg-transparent rounded-full absolute -z-10 top-16 flex items-center justify-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom,#ffffff 0%, #000000 55%)",
          }}
        >
          <div className="w-[423px] h-[423px] md:w-[722px] md:h-[722px] lg:w-[822px] lg:h-[822px] 2xl:w-[917px] 2xl:h-[917px] bg-black rounded-full flex flex-col items-center ">
            <h3 className="text-[32px] text-[#DCA685] font-extralight mb-4 mt-48">
              About
            </h3>
            <p className="text-4xl leading-[140%] text-center font-extralight max-w-[640px]">
              {" "}
              YANBOT is an AI that analyzes the market and finds the right
              moment to grow. you just join. it does the rest.
            </p>
          </div>
        </div>

        {/* Card 1 */}
        <div
          className="w-[253px] 2xl:w-[283px] h-[378px] absolute left-0 top-0 flex flex-col items-center justify-between pt-[18px] pb-[14px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #363636 25.25%, #D3554E 82.01%)",
          }}
        >
          <h3 className="uppercase text-[#F4F4F4] text-2xl leading-[145%] font-semibold">
            Our mission
          </h3>
          <div
            className="w-[158px] h-[158px] rounded-full flex items-center justify-center relative"
            style={{
              background:
                "linear-gradient(180deg, #7A716F 0%, rgba(224, 207, 204, 0) 91.51%)",
            }}
          >
            <img src={circle} alt="Circle" width={138} height={138} />

            <div className="w-[32px] h-[32px] bg-[#f4f4f4] flex items-center justify-center rounded-full absolute left-2 top-8">
              <img src={personIcon} alt="person icon" width={18} height={17} />
            </div>

            <div className="w-[98px] h-[32px] bg-[#f4f4f4] flex items-center justify-center rounded-full absolute -right-1/5 top-10">
              <p className="font-[400] text-[#323030] text-[12px] leading-[150%]">
                Grow Smarter
              </p>
            </div>

            <div className="w-[32px] h-[32px] bg-[#f4f4f4] flex items-center justify-center rounded-full absolute bottom-0">
              <img src={shieldIcon} alt="shield icon" width={18} height={17} />
            </div>
          </div>
          <h3 className="text-[32px] font-extralight leading-[140%] text-center uppercase text-[#E1DFDF]">
            Phase 1
          </h3>

          <p className="mt-1 font-extralight  text-[18px] text-center leading-[150%]">
            YANBOT is your pocket-
            <br />
            sized AI financial assistant.
          </p>
        </div>
        {/* Card 2 */}
        <div
          className="w-[253px] 2xl:w-[283px] h-[378px] absolute right-0 top-80 flex flex-col items-center justify-center pt-[18px] pb-[14px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #363636 25.25%, #D3554E 82.01%)",
          }}
        >
          <h3 className="uppercase text-[#F4F4F4] text-2xl leading-[145%] font-semibold">
            Our feature
          </h3>

          <p className="pt-4 pb-5 text-xl leading-[150%] font-[275] text-center">
            You join. YANBOT finds <br />
            the moment to act.
          </p>
          <img src={diamond} alt="Diamond" width={108} height={135} />

          <a href="https://t.me/tokenyan" target="_blank">
            <button
              className="mt-[14px] w-[230px] h-[52px] bg-[#433838] text-center text-xl leading-[145%] uppercase tracking-[-2%] text-white transition-all duration-300 ease-in-out hover:bg-[#5c4f4f] hover:scale-[1.03] hover:shadow-lg cursor-pointer"
              style={{
                backdropFilter: "blur(4px)",
              }}
            >
              Learn more
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
