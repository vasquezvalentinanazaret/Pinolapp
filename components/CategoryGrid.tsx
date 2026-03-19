import Link from "next/link";

const categories = [
  {
    name: "Restaurantes",
    emoji: "🍔",
    href: "/restaurants",
  },
  {
    name: "Farmacias",
    emoji: "💊",
    href: "/pharmacy",
  },
  {
    name: "Mercados",
    emoji: "🛒",
    href: "/markets",
  },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map((cat) => (
        <Link href={cat.href} key={cat.name}>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition cursor-pointer">
            <span className="text-4xl">{cat.emoji}</span>
            <p className="mt-2 font-semibold text-gray-700">
              {cat.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
