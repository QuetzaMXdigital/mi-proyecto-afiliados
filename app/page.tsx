import { createClient } from '@supabase/supabase-js'
import RadarChart from './RadarChart'

export const instant = false;

// Blindaje de llaves
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ejemplo.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'llave-falsa';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Home() {
  const { data: productos, error } = await supabase.from('productos').select('*')

  if (error) console.error('Error cargando la base de datos:', error)

  return (
    // Fondo Cyber Minimal: Gris perla muy limpio
    <main className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
      <div className="max-w-4xl mx-auto">
        
        {/* Cabecera Premium */}
        <header className="mb-16 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
            <span className="text-sm font-bold text-slate-600 tracking-wider uppercase">🎄 Especial Navidad 2026</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Guía Smart Home
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Los 3 gadgets esenciales para automatizar tu casa. Precios rastreados y actualizados al instante.
          </p>
        </header>

        <div className="space-y-10">
          {productos && productos.length > 0 ? (
            productos.map((producto) => (
              <article key={producto.id} className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                <div className="p-8 sm:p-10">
                  
                  {/* Encabezado de Tarjeta (Negro Mate) */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 leading-tight">{producto.nombre}</h2>
                      <span className="inline-block mt-3 bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-md font-bold uppercase tracking-widest">
                        {producto.categoria}
                      </span>
                    </div>
                    <div className="flex-shrink-0 bg-slate-900 text-white font-semibold px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Top Ventas
                    </div>
                  </div>

                  {/* Estructura Dual: Gráfica + Pros/Contras */}
                  <div className="grid lg:grid-cols-2 gap-10 items-center mb-10">
                    
                    {/* Gráfica Minimalista */}
                    <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                      {producto.puntajes_radar && (
                        <RadarChart puntajes={producto.puntajes_radar} />
                      )}
                    </div>

                    {/* Pros y Contras Sofisticados */}
                    <div className="space-y-5">
                      <div className="rounded-2xl p-6 border border-slate-100 bg-white shadow-sm">
                        <h3 className="text-slate-900 font-extrabold flex items-center gap-3 mb-4 uppercase tracking-wide text-sm">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 text-lg">✓</span> 
                          Por qué comprarlo
                        </h3>
                        <ul className="text-slate-600 space-y-3 text-sm font-medium">
                          {producto.pros ? producto.pros.map((pro: string, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-slate-300 mt-1">●</span>
                              <span className="leading-relaxed">{pro}</span>
                            </li>
                          )) : <li>Sin datos</li>}
                        </ul>
                      </div>
                      
                      <div className="rounded-2xl p-6 border border-slate-100 bg-white shadow-sm">
                        <h3 className="text-slate-900 font-extrabold flex items-center gap-3 mb-4 uppercase tracking-wide text-sm">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-500 text-lg">✕</span> 
                          A considerar
                        </h3>
                        <ul className="text-slate-600 space-y-3 text-sm font-medium">
                          {producto.contras ? producto.contras.map((contra: string, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-slate-300 mt-1">●</span>
                              <span className="leading-relaxed">{contra}</span>
                            </li>
                          )) : <li>Sin datos</li>}
                        </ul>
                      </div>
                    </div>

                  </div>
                  
                  {/* Botones de Alta Conversión */}
                  <div className="pt-8 border-t border-slate-100">
                    <p className="text-center text-xs font-bold text-slate-400 mb-5 uppercase tracking-widest">
                      Compara precios en vivo
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a 
                        href={producto.link_amazon || '#'} 
                        target="_blank"
                        className="flex-1 flex justify-center items-center gap-2 bg-slate-900 text-white py-4 px-6 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
                      >
                        Amazon: ${producto.precio_habitual || 'Ver'}
                      </a>
                      <a 
                        href={producto.link_meli || '#'} 
                        target="_blank"
                        className="flex-1 flex justify-center items-center gap-2 bg-[#FFE600] text-[#2D3277] py-4 px-6 rounded-2xl font-bold hover:bg-[#F2DA00] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
                      >
                        Mercado Libre
                      </a>
                    </div>
                  </div>

                </div>
              </article>
            ))
          ) : (
            <div className="text-center bg-white p-16 rounded-[2rem] shadow-sm border border-slate-100">
              <p className="text-slate-500 text-lg font-medium">Buscando las mejores ofertas...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}