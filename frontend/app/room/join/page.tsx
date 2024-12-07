"use client"

import { useRouter } from 'next/navigation';

const PageA = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/room/1231");
  };

  return <button onClick={handleNavigate}>Go to Page B</button>;
};

export default PageA;
