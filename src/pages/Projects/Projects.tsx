type ProjectsProps = {
  setRef: (node: HTMLElement | null) => void;
  isInView: boolean;
}

export default function Projects({ setRef, isInView }: ProjectsProps) {
  return (
    <section ref={setRef} className="relative h-screen w-full bg-blue-500 z-10">
      <h1 className="sticky top-0 p-3">Projects {isInView ? "(in view)" : "(out of view)"}</h1>
    </section>
  );
}
