const categories = [
  { name: "Restaurantes", icon: "🍔" },
  { name: "Rápido", icon: "⚡" },
  { name: "Farmacias", icon: "💊" },
  { name: "Mercados", icon: "🛒" },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map((cat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center hover:scale-105 transition"
        >
          <span className="text-3xl">{cat.icon}</span>
          <p className="mt-2 font-semibold">{cat.name}</p>
        </div>
      ))}
    </div>
  );
}
