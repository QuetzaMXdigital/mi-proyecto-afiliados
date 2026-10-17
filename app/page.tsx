import { createClient } from '@supabase/supabase-js'
import RadarChart from './RadarChart'

export const instant = false;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Home() {
  const { data: productos, error } = await supabase.from('productos').select('*')

  if (error) console.error('Error cargando la base de datos:', error)

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-gray-900">
          Setups para Trading 2026
        </h1>
        <p className="text-center text-gray-500 mb-10">
          Comparamos los mejores precios en tiempo real para tu estación de trabajo.
        </p>
        
        <div className="grid gap-6">
          {productos && productos.length > 0 ? (
            productos.map((producto) => (
              <div key={producto.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{producto.nombre}</h2>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-1 uppercase font-semibold">
                      {producto.categoria}
                    </span>
                  </div>
                  <div className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-lg shadow-sm">
                    Recomendado
                  </div>
                </div>

                {producto.puntajes_radar && (
                  <RadarChart puntajes={producto.puntajes_radar} />
                )}

                <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded border border-gray-100">
                    <strong className="text-green-600 block mb-1">👍 Pros</strong>
                    <ul className="text-gray-600 list-disc pl-4">
                      {producto.pros ? producto.pros.map((pro: string, i: number) => <li key={i}>{pro}</li>) : <li>Sin datos</li>}
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border border-gray-100">
                    <strong className="text-red-600 block mb-1">👎 Contras</strong>
                    <ul className="text-gray-600 list-disc pl-4">
                      {producto.contras ? producto.contras.map((contra: string, i: number) => <li key={i}>{contra}</li>) : <li>Sin datos</li>}
                    </ul>
                  </div>
                </div>
                
                <div className="border-t pt-4 flex flex-col sm:flex-row gap-3">
                  <a 
                    href={producto.link_amazon || '#'} 
                    target="_blank"
                    className="flex-1 bg-gray-900 text-white text-center py-3 rounded-lg font-bold hover:bg-gray-800 transition shadow-md"
                  >
                    Amazon: ${producto.precio_habitual || 'Ver oferta'}
                  </a>
                  <a 
                    href={producto.link_meli || '#'} 
                    target="_blank"
                    className="flex-1 bg-[#FFE600] text-[#2D3277] text-center py-3 rounded-lg font-bold hover:bg-yellow-400 transition shadow-md"
                  >
                    Ver en Mercado Libre
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No hay productos en la base de datos.</p>
          )}
        </div>
      </div>
    </main>
  )
}