import CategoryGrid from "../components/CategoryGrid";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="p-6 text-center">
        <Image
          src="/logo.png"
          alt="Logo PinolApp"
          width={100}
          height={100}
        />
        <h1 className="text-3xl font-bold text-green-700 mt-2">
          PinolApp
        </h1>
        <p className="text-gray-600">
          Delivery 100% Nicaragüense
        </p>
      </header>

      {/* Categorías */}
      <section className="p-4">
        <h2 className="text-xl font-semibold mb-4">
          ¿Qué te gustaría pedir hoy?
        </h2>
        <CategoryGrid />
      </section>
    </main>
  );
}
