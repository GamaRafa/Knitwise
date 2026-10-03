import { DecreaseStrategy, IncreaseStrategy, KnittingCalculator } from "@/src/domain/calculators/calculators";
import { KnittingResult } from "@/src/domain/calculators/types";
import { useState } from "react";

export function useKnittingCalculator() {
  const [result, setResult] = useState<KnittingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = (stitches: number, changes: number, operation: "increase" | "decrease") => {
    try {
      setError(null);
      const strategy = operation === "decrease"
      ? new DecreaseStrategy()
      : new IncreaseStrategy();

      const res = KnittingCalculator.calculate(stitches, changes, strategy);
      setResult(res);
    } catch (err: any) {
      setError(err.message);
      setResult(null);
    }
  };

  const clear = () => {
    setResult(null);
    setError(null);
  }

  return { calculate, clear, result, error};
}

// Example of use:
// import { useState } from "react";
// import { useKnittingCalculator, OperationType } from "./useKnittingCalculator";

// export function StitchCalculatorForm() {
//   const [stitches, setStitches] = useState<number>(45);
//   const [changes, setChanges] = useState<number>(18);
//   const [operation, setOperation] = useState<OperationType>("decrease");

//   // Consome o Hook
//   const { calculate, result, error } = useKnittingCalculator();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     calculate(stitches, changes, operation);
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
//       <h2 className="text-xl font-bold">Calculadora de Pontos</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Pontos na Agulha</label>
//           <input
//             type="number"
//             value={stitches}
//             onChange={(e) => setStitches(Number(e.target.value))}
//             className="w-full border rounded p-2 mt-1"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Quantidade de Alterações</label>
//           <input
//             type="number"
//             value={changes}
//             onChange={(e) => setChanges(Number(e.target.value))}
//             className="w-full border rounded p-2 mt-1"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Operação</label>
//           <select
//             value={operation}
//             onChange={(e) => setOperation(e.target.value as OperationType)}
//             className="w-full border rounded p-2 mt-1"
//           >
//             <option value="decrease">Diminuição (Decrease)</option>
//             <option value="increase">Aumento (Increase)</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
//         >
//           Calcular Distribuição
//         </button>
//       </form>

//       {/* Renderização de Erro capturado do Domínio */}
//       {error && (
//         <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
//           {error}
//         </div>
//       )}

//       {/* Renderização do Resultado Efêmero */}
//       {result && (
//         <div className="p-4 bg-green-50 border border-green-200 rounded text-sm space-y-2">
//           <h3 className="font-bold text-green-900">Resultado:</h3>
//           <p>Pontos Iniciais: {result.originalStitches}</p>
//           <p>Pontos Finais Esperados: <strong>{result.targetStitches}</strong></p>
//           <p>Intervalos de Pontos: <code className="bg-white px-1">{result.intervals.join(", ")}</code></p>
          
//           <div className="mt-2">
//             <strong>Agrupamentos para o Padrão:</strong>
//             <ul className="list-disc list-inside mt-1">
//               {result.groups.map((group, index) => (
//                 <li key={index}>
//                   Trabalhar {group.stitchCount} pontos ({group.repeat}x)
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }