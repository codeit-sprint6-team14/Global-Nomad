import useViewportSize from '@/hooks/useViewportSize';
import { SubImage } from '@/types/activity';
import Image from 'next/image';

const BannerImage = ({ bannerImageUrl, subImages }: { bannerImageUrl: string; subImages: SubImage[] }) => {
  const viewportSize = useViewportSize();

  return (
    <div className="flex flex-col md:flex-row md:gap-5 md:px-24 md:pb-32 md:pt-16 lg:px-0 lg:pb-85 lg:pt-24">
      {bannerImageUrl && (
        <div className="relative w-full pb-[100%] md:h-auto md:w-[50%] md:overflow-hidden md:rounded-l-7 md:pb-[33.33%] lg:pb-[44.5%]">
          <Image
            src={bannerImageUrl}
            fill
            style={{ objectFit: 'cover' }}
            alt="배너이미지"
            sizes="(min-width: 375px) 375px, (min-width: 744px) 744px, (min-width: 1200px) 1200px"
            priority
            unoptimized
          />
        </div>
      )}
      {(viewportSize === 'tablet' || viewportSize === 'desktop') && subImages.length > 0 && (
        <div className="grid w-full grid-cols-2 grid-rows-2 gap-5 overflow-hidden rounded-r-7 md:w-[50%] lg:gap-8">
          {subImages.slice(0, 4).map((subImage) => (
            <div key={subImage.id} className="relative pb-[100%]">
              <Image
                src={subImage.imageUrl}
                fill
                style={{ objectFit: 'cover' }}
                alt={`서브 이미지 ${subImage.id}`}
                sizes="(min-width: 744px) 172px, (min-width: 1200px) 263px"
                priority
                unoptimized
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerImage;
