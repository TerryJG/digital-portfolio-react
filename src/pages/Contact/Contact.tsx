type ContactProps = {
  setRef: (node: HTMLElement | null) => void;
  isInView: boolean;
}

export default function Contact({ setRef, isInView }: ContactProps) {
  return (
    <section ref={setRef} className="relative h-screen w-full bg-emerald-500">
      <h1 className="sticky top-0 p-3">Contact {isInView ? "(in view)" : "(out of view)"}</h1>
    </section>
  );
}
