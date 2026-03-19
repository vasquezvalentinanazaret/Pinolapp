const categories = [
  { name: "Restaurantes", icon: "🍽️" },
  { name: "Rápido", icon: "⚡" },
  { name: "Farmacias", icon: "💊" },
  { name: "Mercados", icon: "🛒" },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="flex flex-col items-center bg-white p-3 rounded-xl shadow"
        >
          <div className="text-2xl">{cat.icon}</div>
          <p className="text-sm mt-2">{cat.name}</p>
        </div>
      ))}
    </div>
  );
}
