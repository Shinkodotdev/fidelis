import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Chapter from "./sections/Chapter";

import ScrollStack, { ScrollStackItem } from "./components/ScrollStack";
import ChapterTwo from "./sections/ChapterTwo";



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
      </ScrollStack>
      <ChapterTwo/>
    </div>
  );
}