"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface SeyahatTercihleri {
  kisiSayisi: string;
  cocukSayisi: string;
  tatilTipi: string;
  konaklama: string;
}

interface Rota {
  baslik: string;
  aciklama: string;
  resim: string;
  aktiviteler: string[];
  konaklamaOnerileri: string[];
}

export default function Sonuclar() {
  const [tercihler, setTercihler] = useState<SeyahatTercihleri | null>(null);
  const [rota, setRota] = useState<Rota | null>(null);

  useEffect(() => {
    // LocalStorage'dan tercihleri al
    const kayitliTercihler = localStorage.getItem("seyahatTercihleri");
    if (kayitliTercihler) {
      const tercihler = JSON.parse(kayitliTercihler);
      setTercihler(tercihler);
      // Tercihlere göre rota oluştur
      const yeniRota = rotaOlustur(tercihler);
      setRota(yeniRota);
    }
  }, []);

  const rotaOlustur = (tercihler: SeyahatTercihleri): Rota => {
    // Tercihlere göre rota oluşturma mantığı
    if (tercihler.tatilTipi === "deniz") {
      return {
        baslik: "Antalya - Kemer Rota",
        aciklama: "Mavi bayraklı plajları ve eşsiz doğasıyla unutulmaz bir deniz tatili",
        resim: "/antalya.jpg",
        aktiviteler: [
          "Konyaaltı Plajı'nda güneşlenme",
          "Düden Şelalesi'ni ziyaret",
          "Antalya Akvaryum gezisi",
          "Kaleiçi'nde tarihi tur"
        ],
        konaklamaOnerileri: [
          "Kemer'de 5 yıldızlı resort otel",
          "Antalya merkezde butik otel",
          "Lara'da aile pansiyonu"
        ]
      };
    } else if (tercihler.tatilTipi === "doğa") {
      return {
        baslik: "Kapadokya Doğa Rota",
        aciklama: "Peri bacaları ve eşsiz doğal güzellikleriyle unutulmaz bir deneyim",
        resim: "/kapadokya.jpg",
        aktiviteler: [
          "Sıcak hava balonu turu",
          "ATV safari",
          "Ihlara Vadisi yürüyüşü",
          "Yeraltı şehirleri turu"
        ],
        konaklamaOnerileri: [
          "Mağara oteli",
          "Butik pansiyon",
          "Doğa manzaralı apart daire"
        ]
      };
    } else if (tercihler.tatilTipi === "tarih/kültür") {
      return {
        baslik: "İstanbul Kültür Rota",
        aciklama: "Tarih ve modernliğin buluştuğu şehirde kültür turu",
        resim: "/istanbul.jpg",
        aktiviteler: [
          "Topkapı Sarayı ziyareti",
          "Ayasofya ve Sultanahmet turu",
          "Boğaz turu",
          "Kapalıçarşı alışverişi"
        ],
        konaklamaOnerileri: [
          "Sultanahmet'te butik otel",
          "Taksim'de apart daire",
          "Kadıköy'de pansiyon"
        ]
      };
    } else if (tercihler.tatilTipi === "kayak") {
      return {
        baslik: "Uludağ Kayak Rota",
        aciklama: "Türkiye'nin en büyük kayak merkezinde kış tatili",
        resim: "/uludag.jpg",
        aktiviteler: [
          "Kayak dersi",
          "Snowboard",
          "Telesiyej turu",
          "Kar motosikleti safari"
        ],
        konaklamaOnerileri: [
          "Kayak merkezinde otel",
          "Bungalov ev",
          "Apart daire"
        ]
      };
    } else {
      return {
        baslik: "Pamukkale Termal Rota",
        aciklama: "Doğal termal sularıyla şifa ve huzur dolu bir tatil",
        resim: "/pamukkale.jpg",
        aktiviteler: [
          "Travertenlerde yürüyüş",
          "Termal havuz keyfi",
          "Hierapolis antik kenti turu",
          "Spa ve masaj"
        ],
        konaklamaOnerileri: [
          "Termal otel",
          "Spa resort",
          "Butik pansiyon"
        ]
      };
    }
  };

  if (!tercihler || !rota) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Tercihleriniz yükleniyor...</h1>
          <Link href="/" className="text-pink-600 hover:text-pink-800">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sizin İçin Özel Rota</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
              <Image
                src={rota.resim}
                alt={rota.baslik}
                fill
                className="object-cover"
              />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{rota.baslik}</h2>
              <p className="text-gray-600 mb-6">{rota.aciklama}</p>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Tercihleriniz</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-pink-100 p-4 rounded-lg border-2 border-pink-200">
                    <p className="text-sm font-semibold text-pink-600 mb-1">Kişi Sayısı</p>
                    <p className="text-lg font-bold text-gray-800">{tercihler.kisiSayisi}</p>
                  </div>
                  <div className="bg-pink-100 p-4 rounded-lg border-2 border-pink-200">
                    <p className="text-sm font-semibold text-pink-600 mb-1">Çocuk Sayısı</p>
                    <p className="text-lg font-bold text-gray-800">{tercihler.cocukSayisi}</p>
                  </div>
                  <div className="bg-pink-100 p-4 rounded-lg border-2 border-pink-200">
                    <p className="text-sm font-semibold text-pink-600 mb-1">Tatil Tipi</p>
                    <p className="text-lg font-bold text-gray-800">{tercihler.tatilTipi}</p>
                  </div>
                  <div className="bg-pink-100 p-4 rounded-lg border-2 border-pink-200">
                    <p className="text-sm font-semibold text-pink-600 mb-1">Konaklama</p>
                    <p className="text-lg font-bold text-gray-800">{tercihler.konaklama}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Önerilen Aktiviteler</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {rota.aktiviteler.map((aktivite, index) => (
              <div key={index} className="bg-pink-50 p-4 rounded-lg">
                <p className="font-medium text-gray-800">{aktivite}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Konaklama Önerileri</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {rota.konaklamaOnerileri.map((konaklama, index) => (
              <div key={index} className="bg-pink-50 p-4 rounded-lg">
                <p className="font-medium text-gray-800">{konaklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link 
            href="/" 
            className="inline-block bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors"
          >
            Yeni Rota Oluştur
          </Link>
        </div>
      </div>
    </div>
  );
} 