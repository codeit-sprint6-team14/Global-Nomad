import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

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
    <div className="pt-16 md:pt-40">
      <Map center={coordinates} className="h-482 w-auto rounded-16 md:h-308 lg:h-476">
        <MapMarker position={coordinates}>
          <div style={{ color: '#000' }}>{address}</div>
        </MapMarker>
      </Map>
      <div className="flex pt-8">
        <Image src="/assets/icons/map.svg" width={18} height={18} alt="지도 아이콘" />
        <div className="ml-2 text-md-regular text-black-100">{address}</div>
      </div>
    </div>
  );
};

export default KakaoMap;
