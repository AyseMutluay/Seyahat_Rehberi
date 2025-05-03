"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function Sorular() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const soruNo = parseInt(searchParams.get("soru") || "1");
  
  const [tercihler, setTercihler] = useState({
    kisiSayisi: "",
    cocukSayisi: "",
    tatilTipi: "",
    konaklama: "",
    tatilSuresi: ""
  });

  useEffect(() => {
    // LocalStorage'dan tercihleri al
    const kayitliTercihler = localStorage.getItem("seyahatTercihleri");
    if (kayitliTercihler) {
      setTercihler(JSON.parse(kayitliTercihler));
    }
  }, []);

  const handleSubmit = (cevap: string) => {
    const yeniTercihler = { ...tercihler };
    
    switch (soruNo) {
      case 1:
        yeniTercihler.kisiSayisi = cevap;
        break;
      case 2:
        yeniTercihler.cocukSayisi = cevap;
        break;
      case 3:
        yeniTercihler.tatilTipi = cevap;
        break;
      case 4:
        yeniTercihler.konaklama = cevap;
        break;
      case 5:
        yeniTercihler.tatilSuresi = cevap;
        break;
    }
    
    setTercihler(yeniTercihler);
    localStorage.setItem("seyahatTercihleri", JSON.stringify(yeniTercihler));
    
    if (soruNo < 5) {
      router.push(/sorular?soru=${soruNo + 1});
    } else {
      router.push("/sonuclar");
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-lg border border-[#5F1510]">
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-[#215732]">Soru {soruNo}/5</span>
              <span className="text-sm font-medium text-[#215732]">{Math.round((soruNo / 5) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#215732] h-2 rounded-full transition-all duration-300" 
                style={{ width: ${(soruNo / 5) * 100}% }}
              ></div>
            </div>
          </div>

          {soruNo === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Kaç kişi ile seyahat edeceksiniz?</h2>
              <div className="grid grid-cols-2 gap-4">
                {["1", "2", "3", "4+"].map((secenek) => (
                  <button
                    key={secenek}
                    onClick={() => handleSubmit(secenek)}
                    className={`p-4 rounded-lg text-lg font-semibold transition-colors ${
                      tercihler.kisiSayisi === secenek
                        ? "bg-[#215732] text-white"
                        : "bg-[#F8F9FA] text-[#2D2D2D] hover:bg-[#E9ECEF] border border-[#5F1510]"
                    }`}
                  >
                    {secenek}
                  </button>
                ))}
              </div>
            </div>
          )}

          {soruNo === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Yanınızda çocuk var mı?</h2>
              <div className="grid grid-cols-2 gap-4">
                {["Yok", "1 Çocuk", "2 Çocuk", "3+ Çocuk"].map((secenek) => (
                  <button
                    key={secenek}
                    onClick={() => handleSubmit(secenek)}
                    className={`p-4 rounded-lg text-lg font-semibold transition-colors ${
                      tercihler.cocukSayisi === secenek
                        ? "bg-[#215732] text-white"
                        : "bg-[#F8F9FA] text-[#2D2D2D] hover:bg-[#E9ECEF] border border-[#5F1510]"
                    }`}
                  >
                    {secenek}
                  </button>
                ))}
              </div>
            </div>
          )}

          {soruNo === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Ne tür bir tatil düşünüyorsunuz?</h2>
              <div className="grid grid-cols-2 gap-4">
                {["Deniz", "Kültür", "Doğa", "Şehir"].map((secenek) => (
                  <button
                    key={secenek}
                    onClick={() => handleSubmit(secenek)}
                    className={`p-4 rounded-lg text-lg font-semibold transition-colors ${
                      tercihler.tatilTipi === secenek
                        ? "bg-[#215732] text-white"
                        : "bg-[#F8F9FA] text-[#2D2D2D] hover:bg-[#E9ECEF] border border-[#5F1510]"
                    }`}
                  >
                    {secenek}
                  </button>
                ))}
              </div>
            </div>
          )}

          {soruNo === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Konaklama tercihiniz nedir?</h2>
              <div className="grid grid-cols-2 gap-4">
                {["Otel", "Pansiyon", "Apart", "Kamp"].map((secenek) => (
                  <button
                    key={secenek}
                    onClick={() => handleSubmit(secenek)}
                    className={`p-4 rounded-lg text-lg font-semibold transition-colors ${
                      tercihler.konaklama === secenek
                        ? "bg-[#215732] text-white"
                        : "bg-[#F8F9FA] text-[#2D2D2D] hover:bg-[#E9ECEF] border border-[#5F1510]"
                    }`}
                  >
                    {secenek}
                  </button>
                ))}
              </div>
            </div>
          )}

          {soruNo === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Tatiliniz kaç gün sürecek?</h2>
              <div className="flex flex-col gap-4">
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={tercihler.tatilSuresi}
                  onChange={(e) => handleSubmit(e.target.value)}
                  className="p-4 rounded-lg text-lg border border-[#5F1510] focus:outline-none focus:ring-2 focus:ring-[#215732]"
                  placeholder="Gün sayısını giriniz"
                />
                <p className="text-sm text-[#666]">Lütfen 1 ile 30 arasında bir sayı giriniz</p>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link 
              href="/" 
              className="text-[#215732] hover:text-[#1A4428] font-medium"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
