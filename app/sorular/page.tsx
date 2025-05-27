"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Sorular() {
  const router = useRouter();
  const [soruNo, setSoruNo] = useState(1);
  
  const [tercihler, setTercihler] = useState({
    kisiSayisi: "",
    tatilTipi: "",
    konaklama: "",
    tatilSuresi: "",
    secilenIl: ""
  });

  const [inputValue, setInputValue] = useState("");

  const iller = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
    "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
    "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
    "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
    "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
    "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
    "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
    "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
  ];

  useEffect(() => {
    // LocalStorage'dan tercihleri al
    const kayitliTercihler = localStorage.getItem("seyahatTercihleri");
    if (kayitliTercihler) {
      setTercihler(JSON.parse(kayitliTercihler));
    }
  }, []);

  const handleSubmit = (cevap: string) => {
    const yeniTercihler = { ...tercihler };
    
    if (soruNo === 1) {
      yeniTercihler.kisiSayisi = cevap;
    } else if (soruNo === 2) {
      yeniTercihler.tatilTipi = cevap;
    } else if (soruNo === 3) {
      yeniTercihler.konaklama = cevap;
    } else if (soruNo === 4) {
      yeniTercihler.tatilSuresi = cevap;
    } else if (soruNo === 5) {
      yeniTercihler.secilenIl = cevap;
    }

    setTercihler(yeniTercihler);

    if (soruNo < 5) {
      setSoruNo(soruNo + 1);
    } else {
      localStorage.setItem("seyahatTercihleri", JSON.stringify(yeniTercihler));
      router.push("/sonuclar");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const gunSayisi = parseInt(inputValue);
      if (gunSayisi >= 1 && gunSayisi <= 30) {
        handleSubmit(inputValue);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E9ECEF]">
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-[#215732]">Soru {soruNo}/5</span>
              <span className="text-sm font-medium text-[#215732]">{Math.round((soruNo / 5) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#215732] h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(soruNo / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {soruNo === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Kaç kişi seyahat edeceksiniz?</h2>
              <div className="grid grid-cols-2 gap-4">
                {["1", "2", "3", "4+"].map((sayi) => (
                  <button
                    key={sayi}
                    onClick={() => handleSubmit(sayi)}
                    className={`p-4 rounded-xl text-lg font-semibold transition-colors ${
                      tercihler.kisiSayisi === sayi
                        ? "bg-[#215732] text-white"
                        : "bg-[#F8F9FA] text-[#2D2D2D] hover:bg-[#E9ECEF]"
                    }`}
                  >
                    {sayi} Kişi
                  </button>
                ))}
              </div>
            </div>
          )}

          {soruNo === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Ne tür bir tatil istiyorsunuz?</h2>
              <div className="grid grid-cols-2 gap-4">
                {["Kültür", "Doğa", "Şehir", "Deniz"].map((tip) => (
                  <button
                    key={tip}
                    onClick={() => handleSubmit(tip)}
                    className={`p-4 rounded-xl text-lg font-semibold transition-colors ${
                      tercihler.tatilTipi === tip
                        ? "bg-[#215732] text-white"
                        : "bg-[#F8F9FA] text-[#2D2D2D] hover:bg-[#E9ECEF]"
                    }`}
                  >
                    {tip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {soruNo === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Nasıl konaklamak istersiniz?</h2>
              <div className="grid grid-cols-2 gap-4">
                {["Otel", "Pansiyon", "Kamp", "Apart"].map((tip) => (
                  <button
                    key={tip}
                    onClick={() => handleSubmit(tip)}
                    className={`p-4 rounded-xl text-lg font-semibold transition-colors ${
                      tercihler.konaklama === tip
                        ? "bg-[#215732] text-white"
                        : "bg-[#F8F9FA] text-[#2D2D2D] hover:bg-[#E9ECEF]"
                    }`}
                  >
                    {tip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {soruNo === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Tatil süreniz ne kadar?</h2>
              <div className="flex flex-col items-center gap-4">
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="1-30 arası bir sayı giriniz"
                  className="w-full p-4 rounded-xl text-lg font-semibold bg-[#F8F9FA] text-[#2D2D2D] border border-[#E9ECEF] focus:outline-none focus:ring-2 focus:ring-[#215732]"
                />
                <button
                  onClick={() => {
                    const gunSayisi = parseInt(inputValue);
                    if (gunSayisi >= 1 && gunSayisi <= 30) {
                      handleSubmit(inputValue);
                    }
                  }}
                  className="w-full bg-[#215732] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1A4428] transition-colors"
                >
                  Devam Et
                </button>
              </div>
            </div>
          )}

          {soruNo === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-6">Özellikle gitmek istediğiniz bir yer var mı?</h2>
              <div className="relative">
                <select
                  value={tercihler.secilenIl}
                  onChange={(e) => handleSubmit(e.target.value)}
                  className="w-full p-4 rounded-xl text-lg font-semibold bg-[#F8F9FA] text-[#2D2D2D] border border-[#E9ECEF] focus:outline-none focus:ring-2 focus:ring-[#215732]"
                >
                  <option value="">İl Seçiniz</option>
                  {iller.map((il) => (
                    <option key={il} value={il}>
                      {il}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {soruNo > 1 && (
              <button
                onClick={() => setSoruNo(soruNo - 1)}
                className="bg-white text-[#2D2D2D] px-6 py-3 rounded-full font-semibold hover:bg-[#F8F9FA] transition-colors border border-[#E9ECEF]"
              >
                Geri
              </button>
            )}
            {soruNo < 5 && (
              <button
                onClick={() => setSoruNo(soruNo + 1)}
                className="bg-[#215732] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1A4428] transition-colors"
              >
                İleri
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 