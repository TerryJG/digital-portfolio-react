type IconTextProps = {
  className?: string;
  iconClassName?: string;
  icon: string;
  iconAlt?: string;
  textClassName?: string;
  text: string;
};

export const IconText = ({ className = "", iconClassName = "", icon, iconAlt, textClassName = "", text }: IconTextProps) => {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img src={icon} alt={iconAlt ? iconAlt : text} className={`mx-1 h-5 w-5 ${iconClassName}`} />
      <span className={textClassName}>{text}</span>
    </span>
  );
};
