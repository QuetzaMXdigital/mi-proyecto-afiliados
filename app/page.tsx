import { createClient } from '@supabase/supabase-js'
import RadarChart from './RadarChart'

export const instant = false;

// Blindaje de llaves para evitar que Vercel falle en la compilación
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ejemplo.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'llave-falsa';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Home() {
  const { data: productos, error } = await supabase.from('productos').select('*')

  if (error) console.error('Error cargando la base de datos:', error)

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Cabecera Estilo Bento */}
        <header className="mb-12 text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Cazador de Ofertas: Smart Home 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Los mejores gadgets para regalar o automatizar tu casa esta Navidad, analizados y con el precio más bajo garantizado.
          </p>
        </header>

        <div className="space-y-8">
          {productos && productos.length > 0 ? (
            productos.map((producto) => (
              <article key={producto.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="p-6 sm:p-8">
                  
                  {/* Título de la Tarjeta */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{producto.nombre}</h2>
                      <span className="inline-block mt-2 bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
                        {producto.categoria}
                      </span>
                    </div>
                    <div className="flex-shrink-0 bg-emerald-50 text-emerald-700 font-bold px-4 py-2 rounded-full text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      Recomendado
                    </div>
                  </div>

                  {/* Contenedor Bento: Gráfica + Pros/Contras */}
                  <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">
                    
                    {/* Gráfica de Radar */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      {producto.puntajes_radar && (
                        <RadarChart puntajes={producto.puntajes_radar} />
                      )}
                    </div>

                    {/* Pros y Contras */}
                    <div className="space-y-4">
                      <div className="bg-green-50/50 rounded-2xl p-5 border border-green-100">
                        <h3 className="text-green-800 font-bold flex items-center gap-2 mb-3">
                          <span className="text-xl">👍</span> Lo mejor
                        </h3>
                        <ul className="text-gray-700 space-y-2 text-sm">
                          {producto.pros ? producto.pros.map((pro: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-500 mt-0.5">•</span>
                              <span>{pro}</span>
                            </li>
                          )) : <li>Sin datos</li>}
                        </ul>
                      </div>
                      
                      <div className="bg-red-50/50 rounded-2xl p-5 border border-red-100">
                        <h3 className="text-red-800 font-bold flex items-center gap-2 mb-3">
                          <span className="text-xl">👎</span> Lo peor
                        </h3>
                        <ul className="text-gray-700 space-y-2 text-sm">
                          {producto.contras ? producto.contras.map((contra: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-red-500 mt-0.5">•</span>
                              <span>{contra}</span>
                            </li>
                          )) : <li>Sin datos</li>}
                        </ul>
                      </div>
                    </div>

                  </div>
                  
                  {/* Zona de Conversión (Botones Bento) */}
                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-center text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Consultar precio actual</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a 
                        href={producto.link_amazon || '#'} 
                        target="_blank"
                        className="flex-1 flex justify-center items-center gap-2 bg-[#232F3E] text-white py-4 px-6 rounded-2xl font-bold hover:bg-[#131A22] transition-colors shadow-sm"
                      >
                        Amazon: ${producto.precio_habitual || 'Ver oferta'}
                      </a>
                      <a 
                        href={producto.link_meli || '#'} 
                        target="_blank"
                        className="flex-1 flex justify-center items-center gap-2 bg-[#FFE600] text-[#2D3277] py-4 px-6 rounded-2xl font-bold hover:bg-[#F2DA00] transition-colors shadow-sm"
                      >
                        Ver en Mercado Libre
                      </a>
                    </div>
                  </div>

                </div>
              </article>
            ))
          ) : (
            <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">No hay productos en la base de datos.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}