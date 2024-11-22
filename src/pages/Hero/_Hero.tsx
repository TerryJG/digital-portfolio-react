import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

// Component dependencies
import { BackgroundVideo } from "@/pages/Hero/BackgroundVideo";
import { SocialMediaButton } from "@/components/ui/SocialMediaButton";
import { Overview } from "@/pages/Hero/Overview";
import { NameAndSummary } from "@/pages/Hero/Name&Summary";

type HeroProps = {
  setRef: (node: HTMLElement | null) => void;
  isInView: boolean;
  className?: string;
  profileImage?: string;
};

// Framer Motion variants
const contentWrapperVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, duration: 0.3 } },
};

const contentItemVariants = {
  hidden: { scale: 1, opacity: 0, y: 20 },
  visible: { scale: 1, opacity: 1, y: 0 },
};

export default function Hero({
  setRef,
  isInView,
  className,
  profileImage = "https://tjg-portfolio-db.vercel.app/default-profile-image.webp",
}: HeroProps) {
  const [videoUrls, setVideoUrls] = useState<string[]>([]);

  // Fetch featured videos from api
  useEffect(() => {
    const fetchFeaturedVideos = async () => {
      try {
        const { data } = await axios.get("/portfolio/videos/featured");
        const previewUrls = data.map((entry: any) => entry.videoPreview);
        setVideoUrls(previewUrls);
      } catch (error) {
        console.error("Error fetching featured videos:", error);
      }
    };

    fetchFeaturedVideos();
  }, []);

  return (
    <section
      ref={setRef}
      className={`${className} relative flex h-screen flex-col items-center justify-center overflow-hidden bg-slate-800 font-inter`}
    >
      <BackgroundVideo
        // overlayClassName="animated-background bg-gradient-to-br from-slate-50 to-blue-200 opacity-60"
        videos={videoUrls}
      />

      {/* Affiliates */}
      <div className="absolute bottom-3 right-5 z-20 flex gap-4 text-white">
        <img src="https://tjg-portfolio-db.vercel.app/affiliates/invsnmedia-icon.webp" width="64" height="64" alt="invsnmedia" />
        <img src="https://tjg-portfolio-db.vercel.app/affiliates/flexsiv-icon.webp" width="64" height="64" alt="FlexSiv Software" />
      </div>

      {/* Color Background */}
      <div className="absolute z-10 h-screen w-screen bg-black/25"></div>

      {/* Content wrapper */}
      <motion.div
        className="relative z-20 flex max-w-[50rem] flex-col items-center justify-center gap-4 rounded-lg bg-black/70 px-10 py-5 text-primary-foreground drop-shadow-md backdrop-blur-md"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={contentWrapperVariants}
      >
        {/* Profile Image */}
        <motion.div variants={contentItemVariants}>
          <div className="h-36 w-36 overflow-hidden rounded-full bg-muted shadow-lg">
            <img
              src={profileImage || "/images/default-profile-image.webp"}
              width="256"
              height="256"
              alt="Profile picture"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Name and Summary */}
        <motion.div variants={contentItemVariants}>
          <NameAndSummary className="text-center" />
        </motion.div>

        {/* Contact */}
        <motion.div variants={contentItemVariants} className="text-md flex flex-col items-center text-secondary/95">
          <div className="flex items-center">
            <span>Nassau, Bahamas</span>
          </div>
          <div className="flex items-center transition-all duration-300 hover:text-blue-500">
            <a href="mailto:gibson.terrance.bs@gmail.com">gibson.terrance.bs@gmail.com</a>
          </div>
          <div className="flex items-center transition-all duration-300 hover:text-blue-500">
            <a href="tel:+12428071983">+1 (242) 807-1983</a>
          </div>
        </motion.div>

        <motion.div variants={contentItemVariants}>
          <Overview />
        </motion.div>

        {/* Socials */}
        <motion.div variants={contentItemVariants} className="socials-buttons flex gap-4 pt-2 text-3xl">
          <SocialMediaButton platform="github" openInNewTab={true} link="https://github.com/TerryJG" />
          <SocialMediaButton platform="codepen" openInNewTab={true} link="https://codepen.io/TerryJG" />
          <SocialMediaButton platform="youtube" openInNewTab={true} link="https://www.youtube.com/channel/UCVV652t2zYnQT_XH9IP5iuw" />
          <SocialMediaButton platform="facebook" openInNewTab={true} link="https://www.facebook.com/inVsnMedia" />
          <SocialMediaButton platform="instagram" openInNewTab={true} link="https://www.instagram.com/invsnmedia.bs/" />
        </motion.div>
      </motion.div>
    </section>
  );
}
