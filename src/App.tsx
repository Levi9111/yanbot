import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import HowItWorks from "./Components/HowItWorks";
import Roadmap from "./Components/Roadmap";
import PreFooter from "./Components/PreFooter";
import Footer from "./Components/Footer";
import SpaceBackground from "./Components/SpaceBackground";

const App = () => {
  return (
    <div className="relative overflow-x-hidden">
      <SpaceBackground />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Roadmap />
      <PreFooter />
      <Footer />
    </div>
  );
};

export default App;
