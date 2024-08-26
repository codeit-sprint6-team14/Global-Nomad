import { useCallback, useState } from 'react';

const adjectives = ['행복한', '열정의', '즐거운', '호기심 많은', '낭만적인', '여유로운', '신나는', '모험적인'];
const nouns = ['여행자', '탐험가', '백팩커', '노마드', '모험가', '방랑자', '나그네'];

export const useRandomNickname = () => {
  const [nickname, setNickname] = useState<string>('');

  const generateNickname = useCallback(() => {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const newNickname = `${randomAdjective} ${randomNoun}`;

    setNickname(newNickname);
    return newNickname;
  }, []);

  return { nickname, generateNickname };
};
