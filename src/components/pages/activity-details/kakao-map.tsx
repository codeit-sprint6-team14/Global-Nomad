import Image from 'next/image';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KakaoMap = ({ address }: { address: string }) => {
  return (
    <div className="pt-16 md:pt-40">
      <Map center={{ lat: 33.5563, lng: 126.79581 }} className="h-482 w-auto rounded-16 md:h-308 lg:h-476">
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: '#000' }}>Hello World!</div>
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
