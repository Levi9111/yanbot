import { motion } from "framer-motion";
import line from "../assets/scrolled-line.png";
import lineMobile from "../assets/scrolled-line-mobile.png";
import settings from "../assets/settings.png";
import box from "../assets/box.png";
import loaunchValidation from "../assets/launch-validation.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Roadmap = () => {
  return (
    <section id="roadmap" className="relative w-full ">
      <div className="w-base lg:mt-[220px] mt-[59px] px-4 sm:px-0">
        <div className="flex items-start justify-end">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h3 className="text-[#e4e3e3] text-[28px] sm:text-[72px] font-[275] leading-[1.2] sm:leading-[110%] tracking-[-1%] sm:tracking-[-2%]">
              YANBOT Roadmap
            </h3>
            <p className="text-base sm:text-[24px] leading-[1.4] sm:leading-[150%] font-[275] mt-6 sm:mt-8">
              YANBOT’s journey is just beginning — from AI optimization to
              multi-token
              <span className="lg:block" /> support, every phase unlocks smarter
              investing. Our roadmap is built to evolve
              <span className="lg:block" /> with the market, ensuring your
              growth never stands still.
            </p>
          </motion.div>
        </div>

        <div className="mt-[150px] relative lg:h-[2200px] h-[1300px] px-2 sm:px-0">
          {/* Lines */}
          <img
            src={line}
            alt="Scrolled line"
            className="absolute right-0 lg:block hidden"
          />
          <img
            src={lineMobile}
            alt="Scrolled line"
            className="absolute w-full h-full left-0 right-0 lg:hidden"
          />

          {/* Icons */}
          <img
            src={settings}
            alt="Settings"
            width={520}
            height={460}
            className="lg:block hidden absolute -top-[220px]"
          />
          <img
            src={settings}
            alt="Settings"
            width={70}
            height={62}
            className="lg:hidden absolute -top-[10px]"
          />
          <img
            src={loaunchValidation}
            alt="Launch Validation"
            width={433}
            height={400}
            className="absolute lg:block hidden -right-[80px] top-[440px]"
          />
          <img
            src={loaunchValidation}
            alt="Launch Validation"
            width={82}
            height={76}
            className="absolute lg:hidden -right-[8px] top-[680px]"
          />
          <img
            src={box}
            alt="Box"
            width={508}
            height={525}
            className="absolute lg:block hidden left-0 -bottom-[220px]"
          />
          <img
            src={box}
            alt="Box"
            width={60}
            height={62}
            className="absolute lg:hidden left-0 bottom-0"
          />

          {/* Roadmap Items */}
          {[
            {
              title: "Q2 2025 – Launch & Validation",
              items: [
                "Launch of YAN token on the TON blockchain",
                "Listing on DEX",
                "Community formation: Telegram group, first holders, early supporters",
                "MVP release: Telegram Chat Bot with test access to the AI pool",
                "Activation of profit-sharing mechanism via wallet connection",
                "First AI pool launched as a closed alpha group for early adopters",
              ],
              position: "absolute right-0 lg:right-20 lg:top-28 top-14",
            },
            {
              title: "Q3 2025 – Scale & Trust",
              items: [
                "Launch of participant verification modules",
                "Integration of live data and pool information into the website",
                "Partnerships with top influencers and Web3 communities",
                "Creation of a full-featured Telegram Mini App with an asset management interface",
              ],
              position:
                "absolute -right-10 lg:right-20 top-[450px] lg:top-[800px]",
            },
            {
              title: "Q4 2025 – Product Expansion",
              items: [
                "Implementation of an AI agent with adaptive behavior",
                "Addition of new assets and multi-pool support to expand user options",
                "Introduction of user profiles: each connected wallet receives a unique account",
                "Progression system: accounts evolve based on user activity, pool participation, and completion of specific tasks",
                "Activation of profit-sharing mechanism via wallet connection",
                "Launch of a referral system: each user receives a personal link to invite others, with rewards tied to engagement level",
              ],
              position:
                "absolute right-0 lg:right-20 bottom-[120px] lg:bottom-[220px]",
            },
          ].map(({ title, items, position }, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`w-full lg:w-[718px] ${position} px-2 sm:px-0`}
            >
              <h3 className="text-[#e4e3e3] font-[275] text-[23px] sm:text-6xl leading-[1.2] sm:leading-[110%] tracking-[-1%] sm:tracking-[-2%]">
                {title}
              </h3>
              <ul className="mt-6 sm:ml-7 ml-3 max-w-[360px] sm:max-w-max sm:mt-8 list-disc flex flex-col gap-3 sm:gap-4 text-[13px] sm:text-xl font-[275] leading-[1.4] sm:leading-[150%]">
                {items.map((item, idx) => (
                  <motion.li key={idx} whileHover={{ scale: 1.02 }}>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
