import Image from "next/image";
import Dashboard from "../../components/Dashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-7 p-24 bg-white text-black">
          <Dashboard />
    </main>
  );
}
