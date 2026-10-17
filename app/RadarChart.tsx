"use client"
import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function RadarChart({ puntajes }: { puntajes: Record<string, number> }) {
  // Convertimos tu JSON de Supabase en el formato que pide la gráfica
  const data = Object.keys(puntajes).map(key => ({
    categoria: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '),
    puntos: puntajes[key],
    fullMark: 10,
  }));

  return (
    <div className="h-56 w-full mt-4 mb-2">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="categoria" tick={{ fill: '#4B5563', fontSize: 12, fontWeight: 'bold' }} />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
          <Radar name="Puntaje" dataKey="puntos" stroke="#2563EB" fill="#3B82F6" fillOpacity={0.6} />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
}