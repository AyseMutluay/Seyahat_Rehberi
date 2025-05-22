"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleDevam = () => {
    router.push("/sorular?soru=1");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-lg text-center border border-[#5F1510]">
        <h1 className="text-4xl font-bold text-[#215732] mb-4">Hadi Gezelim</h1>
        <p className="text-[#2D2D2D] mb-8">Yeni yerler keşfetmeye hazır mısın?</p>
        
        <button 
          onClick={handleDevam}
          className="bg-[#215732] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1A4428] transition-colors"
        >
          Devam
        </button>
      </div>
    </div>
  );
}
