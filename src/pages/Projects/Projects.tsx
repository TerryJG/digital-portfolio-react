import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import axios from "axios";

type ProjectsProps = {
  setRef: (node: HTMLElement | null) => void;
  isInView: boolean;
};

type CategoryInfo = {
  _id: string;
  menuTitle: string;
  title: string;
};

type MediaItem = {
  _id: string;
  contentType: "video" | "image";
  categoryId: string;
  thumbnailImageAlt: string;
  isArchived: boolean;
  src: string;
  imgSrc: string;
  videoPreview?: string | undefined;
};

export default function Projects({ setRef }: ProjectsProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [categories, setCategories] = useState<Record<string, CategoryInfo>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch category info
        const { data: categoryData } = await axios.get<CategoryInfo[]>("/portfolio/categoryInfo/");

        // Create a map of category IDs to category info
        const categoryMap = categoryData.reduce((acc: Record<string, CategoryInfo>, category: CategoryInfo) => {
          acc[category._id] = category;
          return acc;
        }, {});
        setCategories(categoryMap);

        // Fetch videos and images
        const [{ data: videos }, { data: images }] = await Promise.all([
          axios.get<MediaItem[]>("/portfolio/videos/"),
          axios.get<MediaItem[]>("/portfolio/images/"),
        ]);

        // Combine and filter non-archived items
        const allMedia = [...videos, ...images].filter((item) => !item.isArchived);
        setMediaItems(allMedia);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderCard = (item: MediaItem) => {
    if (item.contentType === "video") {
      return (
        <Card
          key={item._id}
          video={true}
          title={item.thumbnailImageAlt}
          subTitle={categories[item.categoryId]?.menuTitle || ""}
          src={item.videoPreview || item.src}
          imagePreview={item.imgSrc}
          srcAlt={item.thumbnailImageAlt}
        />
      );
    }

    return (
      <Card
        key={item._id}
        image={true}
        title={item.thumbnailImageAlt}
        subTitle={categories[item.categoryId]?.menuTitle || ""}
        src={item.src}
        srcAlt={item.thumbnailImageAlt}
      />
    );
  };

  return (
    <section ref={setRef} className="relative bg-zinc-100 font-firaSans drop-shadow-lg">
      <SectionHeader sectionTitle="Projects" borderColor="bg-yellow-500" />
      <div className="p-5 sm:p-8">
        <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>.video-item:not(:first-child)]:mt-8 [&>.image-item:not(:first-child)]:mt-8">
          {mediaItems.map(renderCard)}
        </div>
      </div>
    </section>
  );
}
