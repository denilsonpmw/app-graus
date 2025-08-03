"use client";

export default function TestTailwind() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-solar-500">
      <h1 className="text-5xl font-bold text-white mb-8">Tailwind Funcionando!</h1>
      <div className="flex gap-4">
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all">Botão Verde</button>
        <button className="bg-brand-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all">Botão Azul (#00a9ec)</button>
      </div>
    </div>
  );
}
