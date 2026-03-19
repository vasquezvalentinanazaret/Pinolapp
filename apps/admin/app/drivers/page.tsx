type Driver = {
  id: string;
  user: {
    email: string;
  };
};

export default function DriversPage() {
  const drivers: Driver[] = [
    {
      id: "1",
      user: { email: "test@mail.com" },
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Repartidores</h1>

      <ul className="space-y-4">
        {drivers.map((d: Driver) => (
          <li key={d.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">Driver #{d.id}</h2>
            <p>Email: {d.user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
