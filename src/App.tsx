import { useSectionVisibility } from "@/hooks/useSectionVisibility";

// Sections
import Hero from "@/pages/Hero/_Hero";
import Projects from "@/pages/Projects/Projects";
// import DetailedSummary from "@/pages/DetailedSummary/DetailedSummary";
import Contact from "@/pages/Contact/Contact";

function App() {
  const { setRef, sectionsInView } = useSectionVisibility(4);

  return (
    <main className="h-screen w-screen overflow-y-auto scrollbar scrollbar-default scroll-smooth">
      <Hero setRef={setRef(0)} isInView={sectionsInView[0]} />
      <Projects setRef={setRef(1)} isInView={sectionsInView[1]} />
      {/* <DetailedSummary setRef={setRef(2)} isInView={sectionsInView[2]} /> */}
      <Contact setRef={setRef(2)} isInView={sectionsInView[2]} />
    </main>
  );
}

export default App;