import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Chapter from "./sections/Chapter";
// import System from "./sections/System";
// import HowItWorks from "./sections/HowItWorks";

import ScrollStack, { ScrollStackItem } from "./components/ScrollStack";

export default function App() {
  return (
    <div className="bg-black text-[#e7d3a3]">
      <Navbar />

      <ScrollStack>

        <ScrollStackItem>
          <Hero />
        </ScrollStackItem>

        <ScrollStackItem>
          <Chapter />
        </ScrollStackItem>

        {/* <ScrollStackItem>
          <System />
        </ScrollStackItem>

        <ScrollStackItem>
          <HowItWorks />
        </ScrollStackItem> */}

      </ScrollStack>
    </div>
  );
}