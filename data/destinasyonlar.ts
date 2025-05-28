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
  id: number;
  isim: string;
  ulke: string;
  aciklama: string;
  resim: string;
  ozellikler: string[];
  fiyat: string;
  aktiviteler: Aktivite[];
  yemekler: Yemek[];
}

export const destinasyonlar: Destinasyon[] = [
  {
    id: 1,
    isim: "Paris",
    ulke: "Fransa",
    aciklama: "Aşk şehri Paris, Eyfel Kulesi, Louvre Müzesi ve şık kafeleriyle ünlüdür.",
    resim: "/images/paris.jpg",
    ozellikler: ["Kültür", "Sanat", "Yemek", "Alışveriş"],
    fiyat: "₺15,000'den başlayan fiyatlarla",
    aktiviteler: [
      {
        id: 1,
        baslik: "Louvre Müzesi",
        aciklama: "Dünyanın en büyük sanat müzelerinden birini ziyaret edin",
        kategori: "kultur"
      },
      {
        id: 2,
        baslik: "Eyfel Kulesi",
        aciklama: "Paris'in sembolü olan Eyfel Kulesi'ni ziyaret edin",
        kategori: "tarih"
      },
      {
        id: 3,
        baslik: "Seine Nehri Turu",
        aciklama: "Nehir üzerinde romantik bir tekne turu yapın",
        kategori: "doga"
      }
    ],
    yemekler: [
      {
        id: 1,
        isim: "Croissant",
        aciklama: "Geleneksel Fransız kruvasanı"
      },
      {
        id: 2,
        isim: "Ratatouille",
        aciklama: "Geleneksel Fransız sebze yemeği"
      },
      {
        id: 3,
        isim: "Macaron",
        aciklama: "Renkli Fransız badem kurabiyesi"
      }
    ]
  },
  {
    id: 2,
    isim: "Tokyo",
    ulke: "Japonya",
    aciklama: "Modern ve geleneksel Japon kültürünün buluştuğu metropol.",
    resim: "/images/tokyo.jpg",
    ozellikler: ["Teknoloji", "Kültür", "Yemek", "Alışveriş"],
    fiyat: "₺20,000'den başlayan fiyatlarla",
    aktiviteler: [
      {
        id: 1,
        baslik: "Senso-ji Tapınağı",
        aciklama: "Tokyo'nun en eski Budist tapınağını ziyaret edin",
        kategori: "kultur"
      },
      {
        id: 2,
        baslik: "Shibuya Geçidi",
        aciklama: "Dünyanın en kalabalık yaya geçidini deneyimleyin",
        kategori: "sehir"
      },
      {
        id: 3,
        baslik: "Tsukiji Balık Pazarı",
        aciklama: "Dünyanın en büyük balık pazarını keşfedin",
        kategori: "kultur"
      }
    ],
    yemekler: [
      {
        id: 1,
        isim: "Sushi",
        aciklama: "Taze deniz ürünleriyle hazırlanan geleneksel Japon yemeği"
      },
      {
        id: 2,
        isim: "Ramen",
        aciklama: "Japon erişte çorbası"
      },
      {
        id: 3,
        isim: "Takoyaki",
        aciklama: "Ahtapotlu Japon sokak yemeği"
      }
    ]
  },
  {
    id: 3,
    isim: "Bali",
    ulke: "Endonezya",
    aciklama: "Tropik cennet, plajlar ve doğal güzellikler.",
    resim: "/images/bali.jpg",
    ozellikler: ["Plaj", "Doğa", "Spa", "Yoga"],
    fiyat: "₺12,000'den başlayan fiyatlarla",
    aktiviteler: [
      {
        id: 1,
        baslik: "Ubud Ormanı",
        aciklama: "Yeşil ormanlarda yürüyüş yapın",
        kategori: "doga"
      },
      {
        id: 2,
        baslik: "Tegallalang Pirinç Tarlaları",
        aciklama: "Geleneksel pirinç tarlalarını ziyaret edin",
        kategori: "doga"
      },
      {
        id: 3,
        baslik: "Uluwatu Tapınağı",
        aciklama: "Deniz kenarındaki antik tapınağı keşfedin",
        kategori: "kultur"
      }
    ],
    yemekler: [
      {
        id: 1,
        isim: "Nasi Goreng",
        aciklama: "Geleneksel Endonezya kızarmış pilavı"
      },
      {
        id: 2,
        isim: "Satay",
        aciklama: "Izgara et şişleri"
      },
      {
        id: 3,
        isim: "Babi Guling",
        aciklama: "Geleneksel domuz çevirmesi"
      }
    ]
  },
  {
    id: 4,
    isim: "New York",
    ulke: "Amerika",
    aciklama: "Hiç uyumayan şehir, Times Square ve özgürlük heykeli.",
    resim: "/images/newyork.jpg",
    ozellikler: ["Şehir", "Alışveriş", "Eğlence", "Kültür"],
    fiyat: "₺25,000'den başlayan fiyatlarla",
    aktiviteler: [
      {
        id: 1,
        baslik: "Central Park",
        aciklama: "Şehrin kalbinde doğal bir vaha keşfedin",
        kategori: "doga"
      },
      {
        id: 2,
        baslik: "Empire State Binası",
        aciklama: "New York'un ikonik gökdelenini ziyaret edin",
        kategori: "sehir"
      },
      {
        id: 3,
        baslik: "Broadway",
        aciklama: "Dünyaca ünlü tiyatro gösterilerini izleyin",
        kategori: "kultur"
      }
    ],
    yemekler: [
      {
        id: 1,
        isim: "New York Pizza",
        aciklama: "İnce hamurlu New York usulü pizza"
      },
      {
        id: 2,
        isim: "Hot Dog",
        aciklama: "Sokak lezzeti New York hot dog"
      },
      {
        id: 3,
        isim: "Cheesecake",
        aciklama: "New York'un meşhur peynirli pastası"
      }
    ]
  },
  {
    id: 5,
    isim: "Santorini",
    ulke: "Yunanistan",
    aciklama: "Ege'nin incisi, beyaz evler ve muhteşem gün batımı.",
    resim: "/images/santorini.jpg",
    ozellikler: ["Plaj", "Romantik", "Yemek", "Doğa"],
    fiyat: "₺10,000'den başlayan fiyatlarla",
    aktiviteler: [
      {
        id: 1,
        baslik: "Oia Köyü",
        aciklama: "Beyaz evleri ve gün batımını izleyin",
        kategori: "kultur"
      },
      {
        id: 2,
        baslik: "Kırmızı Plaj",
        aciklama: "Volkanik kumlu ünlü plajı ziyaret edin",
        kategori: "doga"
      },
      {
        id: 3,
        baslik: "Antik Thera",
        aciklama: "Tarihi kalıntıları keşfedin",
        kategori: "tarih"
      }
    ],
    yemekler: [
      {
        id: 1,
        isim: "Moussaka",
        aciklama: "Geleneksel Yunan patlıcan yemeği"
      },
      {
        id: 2,
        isim: "Souvlaki",
        aciklama: "Izgara et şişleri"
      },
      {
        id: 3,
        isim: "Baklava",
        aciklama: "Tatlı fıstıklı baklava"
      }
    ]
  }
]; 