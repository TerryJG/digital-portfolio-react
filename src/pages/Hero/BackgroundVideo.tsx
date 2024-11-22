import { useRef, useEffect, useState, useCallback } from "react";
import ReactPlayer from "react-player";

type BackgroundVideoProps = {
  className?: string;
  overlayClassName?: string;
  videoDuration?: number;
  onVideoChange?: (index: number) => void;
  onVideoEnd?: (index: number) => void;
  videos?: string[];
};

const defaultVideos = [
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
];

export function BackgroundVideo({
  className,
  overlayClassName,
  videoDuration = 10000,
  onVideoChange,
  onVideoEnd,
  videos = defaultVideos,
}: BackgroundVideoProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [videoLength, setVideoLength] = useState<number | null>(null);

  const preloadVideo = (): Promise<void> => {
    return new Promise((resolve) => {
      if (playerRef.current) {
        playerRef.current.seekTo(0);
        resolve();
      } else {
        setTimeout(() => resolve(), 1000);
      }
    });
  };

  const fadeIn = (): Promise<void> => {
    return new Promise((resolve) => {
      setOpacity(1);
      setTimeout(resolve, 1000);
    });
  };

  const fadeOut = (): Promise<void> => {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 1000);
    });
  };

  const handleVideoEnd = useCallback(async () => {
    await fadeOut();
    setIsPlaying(false);
    if (onVideoEnd) onVideoEnd(activeIndex);
    setActiveIndex((prev) => (prev + 1) % videos.length);
  }, [activeIndex, onVideoEnd, videos.length]);

  const playVideo = useCallback(async () => {
    await preloadVideo();
    setIsPlaying(true);
    await fadeIn();
    if (onVideoChange) onVideoChange(activeIndex);
  }, [activeIndex, onVideoChange]);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startCustomTimer = useCallback(() => {
    if (videoLength && videoDuration > videoLength * 1000) {
      intervalRef.current = setTimeout(
        () => {
          handleVideoEnd();
        },
        (videoLength - 2) * 1000,
      );
    } else {
      intervalRef.current = setTimeout(() => {
        handleVideoEnd();
      }, videoDuration - 2000);
    }
  }, [videoDuration, videoLength, handleVideoEnd]);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "hidden") {
      setIsPlaying(false);
      clearTimer();
    } else if (document.visibilityState === "visible") {
      setIsPlaying(true);
      startCustomTimer();
    }
  }, [startCustomTimer]);

  useEffect(() => {
    playVideo();
    clearTimer();
    startCustomTimer();
    return () => clearTimer();
  }, [activeIndex, playVideo, startCustomTimer]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  const handleProgress = useCallback(() => {
    if (playerRef.current && !videoLength) {
      const duration = playerRef.current.getDuration();
      if (duration) setVideoLength(duration);
    }
  }, [videoLength]);

  return (
    <div className={`absolute inset-0 z-0 bg-black ${className}`}>
      <div className="relative h-full w-full">
        {videos.map((video, index) => (
          <div
            key={index}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${index === activeIndex ? "z-10" : "z-0"}`}
            style={{ opacity: index === activeIndex ? opacity : 0 }}
          >
            <ReactPlayer
              ref={index === activeIndex ? playerRef : undefined}
              url={video}
              playing={isPlaying && index === activeIndex}
              muted
              loop={false}
              width="100%"
              height="100%"
              onEnded={handleVideoEnd}
              onProgress={handleProgress}
              config={{
                file: {
                  attributes: {
                    style: {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    },
                  },
                },
              }}
            />
          </div>
        ))}
        {overlayClassName && <div className={`absolute inset-0 z-20 ${overlayClassName}`} />}
      </div>
    </div>
  );
}
