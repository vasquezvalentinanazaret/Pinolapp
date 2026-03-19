export default function DriversPage() {
  const drivers = [
    {
      id: 1,
      user: { email: "driver1@test.com" },
    },
    {
      id: 2,
      user: { email: "driver2@test.com" },
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Repartidores</h1>

      <ul className="space-y-4">
        {drivers.map((d: any) => (
          <li key={d.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">Driver #{d.id}</h2>
            <p>Email: {d.user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
