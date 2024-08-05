import useViewportSize from '@/hooks/useViewportSize';
import { SubImage } from '@/types/activity';
import Image from 'next/image';

const ActivityBanner = ({ bannerImageUrl, subImages }: { bannerImageUrl: string; subImages: SubImage[] }) => {
  const viewportSize = useViewportSize();

  return (
    <div className="flex md:mx-24 md:gap-5 md:pb-32 md:pt-16">
      {bannerImageUrl && (
        <div className="relative h-310 w-full md:h-auto md:w-[50%] md:overflow-hidden md:rounded-l-7">
          <Image
            src={bannerImageUrl}
            fill
            style={{ objectFit: 'cover' }}
            alt="배너이미지"
            sizes="(min-width: 375px) 375px, (min-width: 744px) 744px, (min-width: 1200px) 1200px"
          />
        </div>
      )}
      {(viewportSize === 'tablet' || viewportSize === 'desktop') && subImages.length > 0 && (
        <div className="grid w-[50%] grid-cols-2 grid-rows-2 gap-5 overflow-hidden rounded-r-7">
          {subImages.slice(0, 4).map((subImage) => (
            <div key={subImage.id} className="relative h-153 w-full">
              <Image
                src={subImage.imageUrl}
                fill
                style={{ objectFit: 'cover' }}
                alt={`서브 이미지 ${subImage.id}`}
                sizes="96px"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityBanner;
