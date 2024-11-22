import { useState } from "react";
import WordRotate from "@/components/magicui/word-rotate";
import GradualSpacing from "@/components/magicui/gradual-spacing";

type NameAndSummaryProps = {
  className?: string;
  nameText?: string;
  overviewText?: string[];
};

export function NameAndSummary({ className, nameText, overviewText }: NameAndSummaryProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={className}>
      <h1
        className="cursor-pointer text-4xl font-bold leading-6 text-primary-foreground"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <GradualSpacing className="cursor-pointer text-4xl font-bold leading-6 text-primary-foreground" text={nameText || "Terrance Gibson"} />
        ) : (
          nameText || "Terrance Gibson"
        )}
      </h1>
      <WordRotate
        duration={5000}
        className="select-none pt-1 text-2xl leading-5 text-secondary/95"
        words={overviewText || ["Video Editor", "Graphic Designer", "Software Engineer", "Web Developer"]}
      />
    </div>
  );
}
