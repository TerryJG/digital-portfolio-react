import { motion } from "framer-motion";

const platformColors = {
  github: "#fff",
  codepen: "#fff",
  youtube: "#FF0000",
  facebook: "#1877F2",
  instagram: "#E4405F",
} as const;
type Platform = keyof typeof platformColors;

const buttonVariants = {
  hover: { scale: 1.2, opacity: 0.8 },
  tap: { scale: 0.9 },
};

type SocialMediaButtonProps = {
  platform: Platform;
  link: string;
  className?: string;
  openInNewTab?: boolean;
};

export function SocialMediaButton({ platform, link, className = "", openInNewTab = true }: SocialMediaButtonProps) {
  return (
    <motion.a
      href={link}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      className={`${className}`}
      style={{ color: platformColors[platform] }}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <i className={`fa-brands fa-${platform}`}></i>
    </motion.a>
  );
}
