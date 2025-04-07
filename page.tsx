"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function Sorular() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const soruNo = searchParams.get("soru") || "1";
  
  const [kisiSayisi, setKisiSayisi] = useState("");
  const [cocukSayisi, setCocukSayisi] = useState("");
  const [tatilTipi, setTatilTipi] = useState("");
  const [konaklama, setKonaklama] = useState("");

  useEffect(() => {
    // LocalStorage'dan mevcut tercihleri al
    const kayitliTercihler = localStorage.getItem("seyahatTercihleri");
    if (kayitliTercihler) {
      const tercihler = JSON.parse(kayitliTercihler);
      setKisiSayisi(tercihler.kisiSayisi || "");
      setCocukSayisi(tercihler.cocukSayisi || "");
      setTatilTipi(tercihler.tatilTipi || "");
      setKonaklama(tercihler.konaklama || "");
    }
  }, []);

  const handleSubmit = (value: string) => {
    // Mevcut tercihleri al
    const kayitliTercihler = localStorage.getItem("seyahatTercihleri");
    const tercihler = kayitliTercihler ? JSON.parse(kayitliTercihler) : {};
    
    // Yeni tercihi ekle
    if (soruNo === "1") {
      tercihler.kisiSayisi = value;
      setKisiSayisi(value);
    } else if (soruNo === "2") {
      tercihler.cocukSayisi = value;
      setCocukSayisi(value);
    } else if (soruNo === "3") {
      tercihler.tatilTipi = value;
      setTatilTipi(value);
    } else if (soruNo === "4") {
      tercihler.konaklama = value;
      setKonaklama(value);
    }
    
    // Tercihleri kaydet
    localStorage.setItem("seyahatTercihleri", JSON.stringify(tercihler));
    
    // Sonraki soruya veya sonuçlara yönlendir
    if (soruNo === "4") {
      router.push("/sonuclar");
    } else {
      router.push(`/sorular?soru=${parseInt(soruNo) + 1}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 max-w-md w-full shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Seyahat Tercihleriniz</h1>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Soru {soruNo}/4</span>
            <span className="text-sm font-medium text-gray-600">{parseInt(soruNo) * 25}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: `${parseInt(soruNo) * 25}%` }}></div>
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Soru 1 */}
          {soruNo === "1" && (
            <div>
              <label className="block text-gray-700 font-medium mb-3">Seyahatinizde kaç kişi olacaksınız?</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    kisiSayisi === "1" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("1")}
                >
                  1 Kişi
                </button>
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    kisiSayisi === "2" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("2")}
                >
                  2 Kişi
                </button>
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    kisiSayisi === "3" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("3")}
                >
                  3 Kişi
                </button>
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    kisiSayisi === "4+" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("4+")}
                >
                  4+ Kişi
                </button>
              </div>
            </div>
          )}
          
          {/* Soru 2 */}
          {soruNo === "2" && (
            <div>
              <label className="block text-gray-700 font-medium mb-3">Lütfen seyahatinizde yer alacak çocuk sayısını belirtiniz</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    cocukSayisi === "0" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("0")}
                >
                  0 Çocuk
                </button>
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    cocukSayisi === "1" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("1")}
                >
                  1 Çocuk
                </button>
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    cocukSayisi === "2" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("2")}
                >
                  2 Çocuk
                </button>
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    cocukSayisi === "3+" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("3+")}
                >
                  3+ Çocuk
                </button>
              </div>
            </div>
          )}
          
          {/* Soru 3 */}
          {soruNo === "3" && (
            <div>
              <label className="block text-gray-700 font-medium mb-3">Nasıl bir tatil planlıyorsunuz?</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    tatilTipi === "doğa" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("doğa")}
                >
                  Doğa
                </button>
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    tatilTipi === "tarih/kültür" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("tarih/kültür")}
                >
                  Tarih/Kültür
                </button>
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    tatilTipi === "deniz" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("deniz")}
                >
                  Deniz
                </button>
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    tatilTipi === "kayak" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("kayak")}
                >
                  Kayak
                </button>
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors col-span-2 ${
                    tatilTipi === "termal" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("termal")}
                >
                  Termal
                </button>
              </div>
            </div>
          )}
          
          {/* Soru 4 */}
          {soruNo === "4" && (
            <div>
              <label className="block text-gray-700 font-medium mb-3">Konaklama tercihiniz nedir?</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    konaklama === "pansiyon" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("pansiyon")}
                >
                  Pansiyon
                </button>
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    konaklama === "otel" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("otel")}
                >
                  Otel
                </button>
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    konaklama === "apart daire" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("apart daire")}
                >
                  Apart Daire
                </button>
                <button 
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    konaklama === "tatil villası" 
                      ? "bg-pink-500 text-white border-2 border-pink-500" 
                      : "bg-white border-2 border-pink-300 text-gray-700 hover:bg-pink-50 hover:border-pink-500"
                  }`}
                  onClick={() => handleSubmit("tatil villası")}
                >
                  Tatil Villası
                </button>
              </div>
            </div>
          )}
          
          <div className="text-center">
            <Link 
              href="/" 
              className="text-pink-600 hover:text-pink-800 text-sm"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 