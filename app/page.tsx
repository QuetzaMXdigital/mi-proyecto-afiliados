import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans">
      
      {/* NAVEGACIÓN */}
      <header className="border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-quetza.png" 
              alt="Quetza Shop Logo"
              width={50}
              height={50}
              className="object-contain rounded-xl bg-white p-1"
            />
            <span className="text-2xl font-bold tracking-tight hidden sm:block">
              <span className="text-emerald-500">Quetza</span>
              <span className="text-quetza-gold">Shop</span>
            </span>
          </Link>
          
          <nav className="flex gap-6 text-sm font-medium text-neutral-400">
            <Link href="#radar" className="hover:text-quetza-gold transition-colors">Radar de Precios</Link>
            <Link href="#smarthome" className="hover:text-quetza-gold transition-colors">Smart Home</Link>
          </nav>
        </div>
      </header>

      {/* PORTADA (HERO SECTION CYBER MINIMAL) */}
      <main className="max-w-6xl mx-auto px-4 pt-16 pb-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 p-8 md:p-16 flex flex-col items-center text-center shadow-2xl">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-emerald-900/30 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-quetza-gold/10 border border-quetza-gold/20 text-quetza-gold text-xs font-semibold uppercase tracking-wider mb-8 z-10">
            <span className="w-2 h-2 rounded-full bg-quetza-gold animate-pulse"></span>
            Especial Smart Home Q4
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-balance z-10">
            Compara, Compra y Ahorra <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-quetza-gold">
              Smarter.
            </span>
          </h1>

          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mb-10 text-balance z-10">
            El radar definitivo para encontrar los mejores precios en tecnología para tu hogar inteligente. Analizamos Amazon y Mercado Libre para que tú no tengas que hacerlo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center z-10">
            <Link href="#radar" className="px-8 py-4 rounded-xl bg-quetza-gold text-neutral-950 font-bold hover:bg-yellow-500 transition-all hover:scale-105 shadow-[0_0_20px_rgba(197,154,63,0.3)]">
              Ver Radar de Ofertas
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
}