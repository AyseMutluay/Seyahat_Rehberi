export interface Aktivite {
  id: number;
  baslik: string;
  aciklama: string;
  kategori: string;
}

export interface Konaklama {
  id: number;
  isim: string;
  tip: string;
}

export interface Yemek {
  id: number;
  isim: string;
  aciklama: string;
}

export interface Destinasyon {
  sehir: string;
  aciklama: string;
  aktiviteler: Aktivite[];
  konaklama: Konaklama[];
  yemek: Yemek[];
}

export const destinasyonlar: Destinasyon[] = [
  {
    sehir: "İstanbul",
    aciklama: "Tarihi yarımada, Boğaz manzarası ve zengin kültürel mirasıyla dünyanın en güzel şehirlerinden biri.",
    aktiviteler: [
      {
        id: 1,
        baslik: "Ayasofya",
        aciklama: "1500 yıllık tarihi ile dünyanın en önemli mimari yapılarından biri.",
        kategori: "Kültür"
      },
      {
        id: 2,
        baslik: "Topkapı Sarayı",
        aciklama: "Osmanlı İmparatorluğu'nun yönetim merkezi.",
        kategori: "Kültür"
      },
      {
        id: 3,
        baslik: "Boğaz Turu",
        aciklama: "İstanbul Boğazı'nın eşsiz manzarasını keşfedin.",
        kategori: "Doğa"
      }
    ],
    konaklama: [
      {
        id: 1,
        isim: "Grand Hotel",
        tip: "Otel"
      },
      {
        id: 2,
        isim: "Boğaz Pansiyon",
        tip: "Pansiyon"
      }
    ],
    yemek: [
      {
        id: 1,
        isim: "İskender Kebap",
        aciklama: "Bursa'nın meşhur kebap çeşidi."
      },
      {
        id: 2,
        isim: "Balık Ekmek",
        aciklama: "Eminönü'nde taze balık sandviçi."
      }
    ]
  },
  {
    sehir: "Antalya",
    aciklama: "Akdeniz'in incisi, antik kentleri ve muhteşem plajlarıyla ünlü turizm şehri.",
    aktiviteler: [
      {
        id: 1,
        baslik: "Kaleiçi",
        aciklama: "Tarihi Osmanlı evleri ve dar sokaklarıyla ünlü bölge.",
        kategori: "Kültür"
      },
      {
        id: 2,
        baslik: "Konyaaltı Plajı",
        aciklama: "Şehrin en popüler plajlarından biri.",
        kategori: "Deniz"
      },
      {
        id: 3,
        baslik: "Düden Şelalesi",
        aciklama: "Doğal güzelliğiyle büyüleyen şelale.",
        kategori: "Doğa"
      }
    ],
    konaklama: [
      {
        id: 1,
        isim: "Lara Beach Resort",
        tip: "Otel"
      },
      {
        id: 2,
        isim: "Kaleiçi Pansiyon",
        tip: "Pansiyon"
      }
    ],
    yemek: [
      {
        id: 1,
        isim: "Pişmaniye",
        aciklama: "Antalya'nın meşhur tatlısı."
      },
      {
        id: 2,
        isim: "Tandır Kebabı",
        aciklama: "Geleneksel et yemeği."
      }
    ]
  }
]; 