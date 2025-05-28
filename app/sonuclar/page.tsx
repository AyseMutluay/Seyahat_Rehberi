"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { destinasyonlar, Destinasyon, Aktivite, Yemek } from "@/data/destinasyonlar";

interface GunlukPlan {
  gun: number;
  aktiviteler: Aktivite[];
  ogleYemegi: Yemek;
  aksamYemegi: Yemek;
}

export default function Sonuclar() {
  const [tercihler, setTercihler] = useState({
    destinasyon: "",
    gunSayisi: 3,
    butce: "orta",
    aktivite: "kultur",
  });

  const [secilenDestinasyon, setSecilenDestinasyon] = useState<Destinasyon | null>(null);
  const [gunlukPlanlar, setGunlukPlanlar] = useState<GunlukPlan[]>([]);

  useEffect(() => {
    const kaydedilenTercihler = localStorage.getItem("seyahatTercihleri");
    if (kaydedilenTercihler) {
      setTercihler(JSON.parse(kaydedilenTercihler));
    }
  }, []);

  useEffect(() => {
    if (tercihler.destinasyon) {
      const destinasyon = destinasyonlar.find(
        (d) => d.isim.toLowerCase() === tercihler.destinasyon.toLowerCase()
      );
      if (destinasyon) {
        setSecilenDestinasyon(destinasyon);
        const planlar = planOlustur(destinasyon, tercihler.gunSayisi);
        setGunlukPlanlar(planlar);
      }
    }
  }, [tercihler]);

  const planOlustur = (destinasyon: Destinasyon, gunSayisi: number) => {
    const planlar: GunlukPlan[] = [];
    const aktiviteler = [...destinasyon.aktiviteler];
    const yemekler = [...destinasyon.yemekler];

    for (let gun = 1; gun <= gunSayisi; gun++) {
      const gunlukAktiviteler = aktiviteler.slice((gun - 1) * 2, gun * 2);
      const ogleYemegi = yemekler[gun - 1];
      const aksamYemegi = yemekler[gun % yemekler.length];

      planlar.push({
        gun,
        aktiviteler: gunlukAktiviteler,
        ogleYemegi,
        aksamYemegi
      });
    }

    return planlar;
  };

  if (!secilenDestinasyon) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Sonuçlar</h1>
          <p className="text-gray-600">Lütfen önce tercihlerinizi belirleyin.</p>
          <Link
            href="/sorular"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tercihlere Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Sonuçlar</h1>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 rounded-lg overflow-hidden relative">
              <Image
                src={secilenDestinasyon.resim}
                alt={secilenDestinasyon.isim}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {secilenDestinasyon.isim}, {secilenDestinasyon.ulke}
              </h2>
              <p className="text-gray-600 mt-2">{secilenDestinasyon.aciklama}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {gunlukPlanlar.map((plan) => (
            <div key={plan.gun} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {plan.gun}. Gün
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Aktiviteler
                  </h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {plan.aktiviteler.map((aktivite) => (
                      <li key={aktivite.id}>
                        <span className="font-medium">{aktivite.baslik}</span> - {aktivite.aciklama}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Yemekler
                  </h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>
                      <span className="font-medium">Öğle Yemeği:</span> {plan.ogleYemegi.isim} - {plan.ogleYemegi.aciklama}
                    </li>
                    <li>
                      <span className="font-medium">Akşam Yemeği:</span> {plan.aksamYemegi.isim} - {plan.aksamYemegi.aciklama}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          <Link
            href="/sorular"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tercihleri Değiştir
          </Link>
          <Link
            href="/"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
} 