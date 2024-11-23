type SectionHeaderProps = {
  className?: string;
  sectionTitle: string;
  backgroundColor?: string;
  borderColor?: string;
  titleContent?: React.ReactNode;
};

export function SectionHeader({ className, sectionTitle, backgroundColor = "bg-zinc-900", borderColor = "bg-zinc-400", titleContent }: SectionHeaderProps) {
  return (
    <div className={`${className} ${backgroundColor} sticky top-0 z-20 flex select-none flex-col rounded-b-xl text-white`}>
      <div className="flex items-center">
        <h2 className="p-5 text-5xl font-bold uppercase tracking-normal">{sectionTitle}</h2>
        {titleContent}
      </div>
      <div className={`h-2 ${borderColor}`}></div>
    </div>
  );
}
