import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
          Hadi Gezelim
        </h1>
        <p className="text-xl text-white mb-8">
          Yeni yerler keşfetmeye hazır mısın?
        </p>
        <Link 
          href="/sorular" 
          className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
        >
          Devam
        </Link>
      </div>
    </div>
  );
}
