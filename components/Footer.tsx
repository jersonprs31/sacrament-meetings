export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-500 text-center p-6 mt-12 border-t">
      <p>&copy; {new Date().getFullYear()} Sacrament Meeting Planner. All rights reserved.</p>
    </footer>
  );
}