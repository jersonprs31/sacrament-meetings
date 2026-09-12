import NavLinks from './NavLinks';

export default function Header() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-5xl mx-auto p-4 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Villa Nueva Ward</h1>
          <p className="text-sm text-gray-400">{today}</p>
        </div>
        <NavLinks />
      </div>
    </header>
  );
}