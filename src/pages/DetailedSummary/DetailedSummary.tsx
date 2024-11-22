type SkillsProps = {
  setRef: (node: HTMLElement | null) => void;
  isInView: boolean;
}

export default function DetailedSummary({ setRef, isInView }: SkillsProps) {
  return (
    <section ref={setRef} className="relative h-screen w-full bg-orange-500">
      <h1 className="sticky top-0 p-3">Skills {isInView ? "(in view)" : "(out of view)"}</h1>
    </section>
  );
}
