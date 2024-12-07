"use client"

import { useRouter } from 'next/navigation';

const PageA = () => {
  const router = useRouter();

  function generateRandomString(length = 32) {
    return Math.random().toString(36).substr(2, length); // Generates a random string of the given length
  }

  const handleNavigate = () => {
    const code = generateRandomString();
    router.push("/room/"+ code);
  };

  return <button onClick={handleNavigate}>Go to Page B</button>;
};

export default PageA;
