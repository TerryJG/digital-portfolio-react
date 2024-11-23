import { useState, useRef, useCallback } from "react";

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
  className = "",
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
  const [imageError, setImageError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (video && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
      setIsPlaying(true);
    }
  }, [video]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (video && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [video]);

  const handleImageError = useCallback(() => {
    console.error(`Failed to load image: ${src}`);
    setImageError(true);
  }, [src]);

  // Early return if we don't have required props
  if (!src) {
    console.error('Card component received no src prop');
    return null;
  }

  return (
    <div
      className={`${className} ${image ? "image-item" : ""} ${
        video ? "video-item" : ""
      } fancybox relative flex items-center justify-center overflow-hidden rounded-lg cursor-pointer`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {image && !imageError && (
        <img 
          src={src} 
          alt={srcAlt || 'Media content'} 
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      )}

      {image && imageError && (
        <div className="w-full h-full min-h-[200px] bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Image failed to load</span>
        </div>
      )}

      {video && (
        <div className="flex h-full w-full">
          <div 
            className={`${isPlaying ? "opacity-0" : "opacity-100"} transition-opacity duration-300 absolute w-full h-full`}
          >
            {imagePreview && (
              <img 
                src={imagePreview} 
                alt={srcAlt || 'Video preview'} 
                className="h-full w-full object-cover"
                onError={() => console.error(`Failed to load video preview: ${imagePreview}`)}
              />
            )}
          </div>

          <video 
            ref={videoRef}
            loop 
            muted 
            playsInline
            className="h-full w-full flex-1 rounded-md object-cover"
            onError={() => console.error(`Failed to load video: ${src}`)}
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}