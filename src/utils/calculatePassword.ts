import { useEffect, useState } from 'react';

export const usePasswordStrength = (password: string) => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const calculateStrength = (pwd: string) => {
      let score = 0;
      if (pwd.length >= 8) score += 20;
      if (pwd.match(/[a-z]+/)) score += 20;
      if (pwd.match(/[A-Z]+/)) score += 20;
      if (pwd.match(/[0-9]+/)) score += 20;
      if (pwd.match(/[!@#$%^&*?]+/)) score += 40;
      return Math.min(score, 100);
    };

    setStrength(calculateStrength(password));
  }, [password]);

  const getStrengthColor = () => {
    if (strength <= 20) return 'bg-red-500';
    if (strength <= 60) return 'bg-yellow';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength <= 20) return '약함';
    if (strength <= 60) return '보통';
    return '강함';
  };

  return { strength, getStrengthColor, getStrengthText };
};
