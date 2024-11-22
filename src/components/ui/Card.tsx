import { useState, useCallback } from "react";
import ReactPlayer from "react-player";

type BaseCardProps = {
  className?: string;
  title: string;
  subTitle: string;
};

type ImageCardProps = BaseCardProps & {
  image: true;
  video?: never;
  src: string;
  srcAlt: string;
  imagePreview?: never;
};

type VideoCardProps = BaseCardProps & {
  video: true;
  image?: never;
  src: string;
  srcAlt: string;
  imagePreview: string;
};

type CardProps = ImageCardProps | VideoCardProps;

export default function Card({
  className,
  src,
  srcAlt,
  title = "Placeholder Title",
  subTitle = "Placeholder Subtitle",
  video,
  image,
  imagePreview,
}: CardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (video) {
      setIsPlaying(true);
    }
  }, [video]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setIsPlaying(false);
  }, []);

  return (
    <div
      className={`${className} ${image ? "image-item" : ""} ${video ? "video-item aspect-video" : ""} fancybox relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {image && <img src={src} alt={srcAlt} className="absolute inset-0 h-full w-full object-cover" />}

      {video && (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
          {/* Image Preview */}
          <div className={`absolute inset-0`}>
            <i
              className={` ${isPlaying ? "opacity-0" : "opacity-100"} fa fa-solid fa-play absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-6xl text-red-500 transition-opacity duration-300`}
            ></i>
            <img src={imagePreview} alt={srcAlt} className="absolute inset-0 h-full w-full object-cover" />
          </div>

          {/* ReactPlayer Container */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}>
            <ReactPlayer
              url={src}
              playing={isPlaying}
              loop={true}
              muted={true}
              width="100%"
              height="100%"
              playsinline
              config={{
                file: {
                  attributes: {
                    style: {
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
