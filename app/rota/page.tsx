"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { destinasyonlar } from "@/data/destinasyonlar";
import { Aktivite, Destinasyon } from "@/data/destinasyonlar";

interface GunlukPlan {
  gun: number;
  aktiviteler: Aktivite[];
  ogleYemegi: string;
  aksamYemegi: string;
}

export default function Rota() {
  const [tercihler, setTercihler] = useState({
    kisiSayisi: "",
    tatilTipi: "",
    konaklama: "",
    tatilSuresi: "",
    secilenIl: ""
  });

  const [secilenDestinasyon, setSecilenDestinasyon] = useState<Destinasyon | null>(null);
  const [gunlukPlanlar, setGunlukPlanlar] = useState<GunlukPlan[]>([]);

  useEffect(() => {
    const kayitliTercihler = localStorage.getItem("seyahatTercihleri");
    if (kayitliTercihler) {
      const parsedTercihler = JSON.parse(kayitliTercihler);
      setTercihler(parsedTercihler);

      const destinasyon = destinasyonlar.find(d => d.sehir === parsedTercihler.secilenIl);
      if (destinasyon) {
        setSecilenDestinasyon(destinasyon);
        planOlustur(destinasyon, parseInt(parsedTercihler.tatilSuresi));
      }
    }
  }, []);

  const planOlustur = (destinasyon: Destinasyon, gunSayisi: number) => {
    const planlar: GunlukPlan[] = [];
    const aktiviteler = [...destinasyon.aktiviteler];
    const yemekler = [...destinasyon.yemek];

    for (let gun = 1; gun <= gunSayisi; gun++) {
      // Her gün için 2 aktivite seç
      const gunlukAktiviteler = aktiviteler.splice(0, 2);
      
      // Rastgele yemek seç
      const ogleYemegi = yemekler[Math.floor(Math.random() * yemekler.length)].isim;
      const aksamYemegi = yemekler[Math.floor(Math.random() * yemekler.length)].isim;

      planlar.push({
        gun,
        aktiviteler: gunlukAktiviteler,
        ogleYemegi,
        aksamYemegi
      });
    }

    setGunlukPlanlar(planlar);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2D2D2D] mb-4">
            {secilenDestinasyon?.sehir} Tatil Rota Planınız
          </h1>
          <p className="text-lg text-[#666]">
            {tercihler.tatilSuresi} günlük tatiliniz için özel olarak hazırlanmış günlük plan
          </p>
        </div>

        {/* Günlük Planlar */}
        <div className="space-y-8">
          {gunlukPlanlar.map((plan) => (
            <div key={plan.gun} className="bg-white rounded-2xl p-8 shadow-lg border border-[#E9ECEF]">
              <h2 className="text-2xl font-bold text-[#215732] mb-6">Gün {plan.gun}</h2>
              
              {/* Aktiviteler */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#2D2D2D] mb-4">Aktiviteler</h3>
                <div className="space-y-4">
                  {plan.aktiviteler.map((aktivite) => (
                    <div key={aktivite.id} className="bg-[#F8F9FA] p-4 rounded-xl">
                      <h4 className="font-semibold text-[#2D2D2D]">{aktivite.baslik}</h4>
                      <p className="text-[#666]">{aktivite.aciklama}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Yemekler */}
              <div>
                <h3 className="text-xl font-semibold text-[#2D2D2D] mb-4">Yemek Planı</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#F8F9FA] p-4 rounded-xl">
                    <h4 className="font-semibold text-[#2D2D2D]">Öğle Yemeği</h4>
                    <p className="text-[#666]">{plan.ogleYemegi}</p>
                  </div>
                  <div className="bg-[#F8F9FA] p-4 rounded-xl">
                    <h4 className="font-semibold text-[#2D2D2D]">Akşam Yemeği</h4>
                    <p className="text-[#666]">{plan.aksamYemegi}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Butonlar */}
        <div className="flex justify-center gap-4 mt-12">
          <Link 
            href="/sonuclar" 
            className="bg-[#215732] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1A4428] transition-colors text-center"
          >
            Önceki Sayfaya Dön
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