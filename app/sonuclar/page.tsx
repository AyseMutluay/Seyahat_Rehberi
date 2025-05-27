"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { destinasyonlar } from "@/data/destinasyonlar";
import { Aktivite, Konaklama, Yemek, Destinasyon } from "@/data/destinasyonlar";

export default function Sonuclar() {
  const [tercihler, setTercihler] = useState({
    kisiSayisi: "",
    tatilTipi: "",
    konaklama: "",
    tatilSuresi: "",
    secilenIl: ""
  });

  const [filtrelenmisAktiviteler, setFiltrelenmisAktiviteler] = useState<Aktivite[]>([]);
  const [filtrelenmisKonaklama, setFiltrelenmisKonaklama] = useState<Konaklama[]>([]);
  const [filtrelenmisYemek, setFiltrelenmisYemek] = useState<Yemek[]>([]);
  const [secilenDestinasyon, setSecilenDestinasyon] = useState<Destinasyon | null>(null);

  useEffect(() => {
    const kayitliTercihler = localStorage.getItem("seyahatTercihleri");
    if (kayitliTercihler) {
      const parsedTercihler = JSON.parse(kayitliTercihler);
      setTercihler(parsedTercihler);

      // Seçilen şehre göre destinasyonu bul
      const destinasyon = destinasyonlar.find(d => d.sehir === parsedTercihler.secilenIl);
      
      if (destinasyon) {
        setSecilenDestinasyon(destinasyon);
        // Seçilen tatil tipine göre aktiviteleri filtrele
        const aktiviteler = destinasyon.aktiviteler.filter(
          aktivite => aktivite.kategori === parsedTercihler.tatilTipi
        );
        setFiltrelenmisAktiviteler(aktiviteler);
        setFiltrelenmisKonaklama(destinasyon.konaklama);
        setFiltrelenmisYemek(destinasyon.yemek);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Başlık Bölümü */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2D2D2D] mb-4">Seyahat Planınız Hazır!</h1>
          <p className="text-lg text-[#666]">Tercihlerinize göre en uygun destinasyonu sizin için seçtik.</p>
        </div>

        {/* Rota Oluşturma Butonu */}
        <div className="mb-8 text-center">
          <Link href="/rota">
            <button
              className="bg-[#215732] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1A4428] transition-colors text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Tatiliniz için gün gün rota oluşturmak ister misiniz?
            </button>
          </Link>
        </div>

        {/* Tercihler Kartı */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12 border border-[#E9ECEF]">
          <h2 className="text-2xl font-semibold text-[#2D2D2D] mb-6">Tercihleriniz</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[#F8F9FA] p-6 rounded-xl">
              <p className="text-sm text-[#666] mb-1">Kişi Sayısı</p>
              <p className="text-xl font-bold text-[#2D2D2D]">{tercihler.kisiSayisi}</p>
            </div>
            <div className="bg-[#F8F9FA] p-6 rounded-xl">
              <p className="text-sm text-[#666] mb-1">Tatil Tipi</p>
              <p className="text-xl font-bold text-[#2D2D2D]">{tercihler.tatilTipi}</p>
            </div>
            <div className="bg-[#F8F9FA] p-6 rounded-xl">
              <p className="text-sm text-[#666] mb-1">Konaklama</p>
              <p className="text-xl font-bold text-[#2D2D2D]">{tercihler.konaklama}</p>
            </div>
            <div className="bg-[#F8F9FA] p-6 rounded-xl">
              <p className="text-sm text-[#666] mb-1">Tatil Süresi</p>
              <p className="text-xl font-bold text-[#2D2D2D]">{tercihler.tatilSuresi} Gün</p>
            </div>
          </div>
        </div>

        {/* Destinasyon Kartı */}
        {secilenDestinasyon && (
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12 border border-[#E9ECEF]">
            <div className="relative h-96">
              <div className="absolute inset-0 bg-[#215732]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2 className="text-3xl font-bold mb-4">{secilenDestinasyon.sehir}</h2>
                <p className="text-lg">{secilenDestinasyon.aciklama}</p>
              </div>
            </div>
          </div>
        )}

        {/* Aktiviteler Bölümü */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[#2D2D2D] mb-6">
            {tercihler.tatilTipi === "Kültür" ? "Kültürel Aktiviteler" :
             tercihler.tatilTipi === "Doğa" ? "Doğa Aktiviteleri" :
             tercihler.tatilTipi === "Şehir" ? "Şehir Aktiviteleri" :
             "Önerilen Aktiviteler"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {filtrelenmisAktiviteler.map((aktivite) => (
              <div key={aktivite.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="h-48 bg-[#215732] rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold text-[#2D2D2D] mb-2">{aktivite.baslik}</h3>
                <p className="text-[#666]">{aktivite.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Konaklama Bölümü */}
        {filtrelenmisKonaklama.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#2D2D2D] mb-6">
              {tercihler.konaklama === "Otel" ? "Otel Seçenekleri" :
               tercihler.konaklama === "Pansiyon" ? "Pansiyon Seçenekleri" :
               tercihler.konaklama === "Kamp" ? "Kamp Alanları" :
               "Konaklama Seçenekleri"}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {filtrelenmisKonaklama.map((konaklama) => (
                <div key={konaklama.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-[#215732] rounded-lg mb-4"></div>
                  <h3 className="text-xl font-semibold text-[#2D2D2D] mb-2">{konaklama.isim}</h3>
                  <p className="text-[#666]">{konaklama.tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Yemekler Bölümü */}
        {filtrelenmisYemek.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#2D2D2D] mb-6">Yöresel Lezzetler</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {filtrelenmisYemek.map((yemek) => (
                <div key={yemek.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-[#215732] rounded-lg mb-4"></div>
                  <h3 className="text-xl font-semibold text-[#2D2D2D] mb-2">{yemek.isim}</h3>
                  <p className="text-[#666]">{yemek.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Butonlar */}
        <div className="flex justify-center gap-4">
          <Link 
            href="/sorular" 
            className="bg-[#215732] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1A4428] transition-colors text-center"
          >
            Yeni Plan Oluştur
          </Link>
          <Link 
            href="/" 
            className="bg-white text-[#2D2D2D] px-8 py-4 rounded-full font-semibold hover:bg-[#F8F9FA] transition-colors border border-[#E9ECEF] text-center"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
} 