import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <Image 
        src="/window.svg" 
        alt="Hero Image" 
        width={150} 
        height={150} 
        priority 
        className="opacity-80"
      />
      <h1 className="text-4xl font-bold text-gray-900">Sacrament Meeting Planner</h1>
      <p className="text-lg text-gray-600 max-w-lg">
        Effortlessly organize agendas, manage speakers, and print weekly programs for the ward.
      </p>
      <Link href="/meetings" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
        View Meetings
      </Link>
    </div>
  );
}