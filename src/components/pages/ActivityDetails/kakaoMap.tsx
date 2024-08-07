import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';

interface Coordinates {
  lat: number;
  lng: number;
}

const KakaoMap = ({ address }: { address: string }) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setCoordinates({
              lat: Number(result[0].y),
              lng: Number(result[0].x),
            });
          }
        });
      });
    };

    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
    } else {
      const script = document.createElement('script');
      script.onload = loadKakaoMap;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_KEY}&libraries=services&autoload=false`;
      document.head.appendChild(script);
    }
  }, [address]);

  if (!coordinates) {
    return <div>지도 로딩중...</div>;
  }

  return (
    <div className="z-0 pt-16 md:pt-40">
      <Map center={coordinates} className="h-482 w-auto rounded-16 md:h-308 lg:h-476">
        <MapMarker
          position={coordinates}
          image={{
            src: '/assets/icons/map-marker.svg',
            size: { width: 60, height: 60 },
            options: { offset: { x: 30, y: 65 } },
          }}
          clickable={true}
        />
        <CustomOverlayMap position={coordinates} yAnchor={3.4}>
          <div className="whitespace-nowrap rounded-lg border border-solid border-black-100 bg-gray-100 px-3 pb-2 pt-4 text-black-100 shadow-md">
            <div className="text-sm font-bold">{address}</div>
            <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 transform border-b border-r border-solid border-black-100 bg-white"></div>
          </div>
        </CustomOverlayMap>
      </Map>
      <div className="flex pt-8">
        <div className="relative mt-2 h-18 w-18">
          <Image src="/assets/icons/map.svg" alt="지도 아이콘" fill />
        </div>
        <div className="ml-2 text-md-regular text-black-100">{address}</div>
      </div>
    </div>
  );
};

export default KakaoMap;
