import { useState } from "react";
import { ClipboardCheck, Play, CheckCircle, XCircle, AlertCircle, Loader, Trash2 } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface EvalResult {
  question: string;
  expected: string;
  answer: string;
  score: "correct" | "partial" | "incorrect";
  feedback: string;
}

const mockEval = (q: string, e: string): EvalResult => {
  const scores: ("correct" | "partial" | "incorrect")[] = ["correct", "partial", "incorrect"];
  const score = scores[Math.floor(Math.random() * scores.length)];
  const feedbacks = {
    correct: "Resposta completa e precisa. Todos os conceitos-chave foram abordados corretamente.",
    partial: "Resposta parcialmente correta. Alguns conceitos foram abordados, mas faltam detalhes importantes.",
    incorrect: "Resposta incorreta ou muito diferente do esperado. Revise os conceitos fundamentais.",
  };
  return {
    question: q.trim(),
    expected: e.trim(),
    answer: score === "correct"
      ? e.trim()
      : score === "partial"
      ? e.trim().slice(0, Math.floor(e.trim().length / 2)) + "..."
      : "Resposta divergente do esperado.",
    score,
    feedback: feedbacks[score],
  };
};

export function EvaluatorArea() {
  const { c, isDark } = useTheme();
  const [questions, setQuestions] = useState("");
  const [answers, setAnswers] = useState("");
  const [results, setResults] = useState<EvalResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [evaluated, setEvaluated] = useState(false);

  function handleEvaluate() {
    const qs = questions.split(";").map((s) => s.trim()).filter(Boolean);
    const as = answers.split(";").map((s) => s.trim()).filter(Boolean);
    if (qs.length === 0 || as.length === 0) return;
    setLoading(true);
    setEvaluated(false);
    setTimeout(() => {
      const res = qs.map((q, i) => mockEval(q, as[i] ?? "—"));
      setResults(res);
      setLoading(false);
      setEvaluated(true);
    }, 1800);
  }

  function handleClear() {
    setQuestions("");
    setAnswers("");
    setResults([]);
    setEvaluated(false);
  }

  const scoreIcons = {
    correct: <CheckCircle size={16} color="#22C55E" />,
    partial: <AlertCircle size={16} color="#F59E0B" />,
    incorrect: <XCircle size={16} color="#EF4444" />,
  };

  const scoreLabels = {
    correct: { label: "Correto", color: "#22C55E", bg: isDark ? "#14532D" : "#DCFCE7" },
    partial: { label: "Parcial", color: "#D97706", bg: isDark ? "#3A2207" : "#FEF3C7" },
    incorrect: { label: "Incorreto", color: "#DC2626", bg: isDark ? "#3A0E0E" : "#FEE2E2" },
  };

  const correctCount = results.filter((r) => r.score === "correct").length;
  const partialCount = results.filter((r) => r.score === "partial").length;
  const incorrectCount = results.filter((r) => r.score === "incorrect").length;

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden" style={{ backgroundColor: c.mainBg }}>
      {/* Header */}
      <div
        className="px-8 py-5 border-b shrink-0"
        style={{ borderColor: c.border, backgroundColor: c.cardBg }}
      >
        <div className="flex items-center gap-3 mb-1">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{ width: "40px", height: "40px", backgroundColor: c.primary }}
          >
            <ClipboardCheck size={20} color="#fff" />
          </div>
          <div>
            <h1 style={{ color: c.text, fontSize: "18px", fontWeight: 600 }}>Avaliação em Lote</h1>
            <p style={{ color: c.textSecondary, fontSize: "13px" }}>
              Cole suas perguntas e respostas esperadas para avaliação automática
            </p>
          </div>
          {evaluated && (
            <div className="ml-auto flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-full px-3 py-1" style={{ backgroundColor: isDark ? "#14532D" : "#DCFCE7", color: "#22C55E", fontSize: "12px", fontWeight: 500 }}>
                <CheckCircle size={13} /> {correctCount}
              </span>
              <span className="flex items-center gap-1.5 rounded-full px-3 py-1" style={{ backgroundColor: isDark ? "#3A2207" : "#FEF3C7", color: "#D97706", fontSize: "12px", fontWeight: 500 }}>
                <AlertCircle size={13} /> {partialCount}
              </span>
              <span className="flex items-center gap-1.5 rounded-full px-3 py-1" style={{ backgroundColor: isDark ? "#3A0E0E" : "#FEE2E2", color: "#DC2626", fontSize: "12px", fontWeight: 500 }}>
                <XCircle size={13} /> {incorrectCount}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Input section */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-2 gap-5">
            {/* Questions */}
            <div
              className="rounded-xl p-5 border"
              style={{ backgroundColor: c.cardBg, borderColor: c.cardBorder }}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 style={{ color: c.text, fontSize: "14px", fontWeight: 600 }}>Perguntas</h2>
                <span
                  className="rounded-full px-2 py-0.5"
                  style={{ backgroundColor: c.primaryLight, color: c.primaryText, fontSize: "10px", fontWeight: 500 }}
                >
                  {questions.split(";").filter((s) => s.trim()).length} item(s)
                </span>
              </div>
              <textarea
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                placeholder="Digite cada pergunta separada por ponto-e-vírgula (;)&#10;&#10;Ex: O que é fotossíntese?; Defina respiração celular; Explique a mitose"
                className="w-full resize-none outline-none"
                rows={8}
                style={{
                  backgroundColor: "transparent",
                  color: c.text,
                  fontSize: "13px",
                  lineHeight: "1.6",
                  border: "none",
                }}
              />
              <p style={{ fontSize: "11px", color: c.textMuted, marginTop: "8px" }}>
                Separe cada pergunta com <code style={{ backgroundColor: c.tagBg, padding: "1px 5px", borderRadius: "4px", color: c.primary }}>;</code>
              </p>
            </div>

            {/* Expected answers */}
            <div
              className="rounded-xl p-5 border"
              style={{ backgroundColor: c.cardBg, borderColor: c.cardBorder }}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 style={{ color: c.text, fontSize: "14px", fontWeight: 600 }}>Respostas Esperadas</h2>
                <span
                  className="rounded-full px-2 py-0.5"
                  style={{ backgroundColor: c.primaryLight, color: c.primaryText, fontSize: "10px", fontWeight: 500 }}
                >
                  {answers.split(";").filter((s) => s.trim()).length} item(s)
                </span>
              </div>
              <textarea
                value={answers}
                onChange={(e) => setAnswers(e.target.value)}
                placeholder="Digite cada resposta esperada separada por ponto-e-vírgula (;)&#10;&#10;Ex: Processo de conversão de luz em energia química; Processo de obtenção de energia pela célula"
                className="w-full resize-none outline-none"
                rows={8}
                style={{
                  backgroundColor: "transparent",
                  color: c.text,
                  fontSize: "13px",
                  lineHeight: "1.6",
                  border: "none",
                }}
              />
              <p style={{ fontSize: "11px", color: c.textMuted, marginTop: "8px" }}>
                Uma resposta para cada pergunta, na mesma ordem
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={handleEvaluate}
              disabled={loading || !questions.trim() || !answers.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all"
              style={{
                backgroundColor: questions.trim() && answers.trim() && !loading
                  ? c.primary
                  : isDark ? "#1E293B" : "#E5E7EB",
                color: questions.trim() && answers.trim() && !loading ? "#fff" : c.textMuted,
                fontSize: "13px",
                cursor: loading || !questions.trim() || !answers.trim() ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <><Loader size={15} className="animate-spin" /> Avaliando...</>
              ) : (
                <><Play size={15} /> Avaliar respostas</>
              )}
            </button>

            {(questions || answers || evaluated) && (
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all"
                style={{ backgroundColor: c.tagBg, color: c.textSecondary, fontSize: "13px" }}
              >
                <Trash2 size={14} /> Limpar
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {evaluated && results.length > 0 && (
          <div className="px-8 pb-8">
            <h3 style={{ color: c.text, fontSize: "15px", fontWeight: 600, marginBottom: "16px" }}>
              Resultados da Avaliação
            </h3>
            <div className="space-y-3">
              {results.map((r, i) => {
                const s = scoreLabels[r.score];
                return (
                  <div
                    key={i}
                    className="rounded-xl p-5 border"
                    style={{ backgroundColor: c.cardBg, borderColor: c.cardBorder }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-start gap-2 flex-1">
                        <span
                          className="flex items-center justify-center rounded-full shrink-0 font-medium"
                          style={{ width: "22px", height: "22px", backgroundColor: c.primaryLight, color: c.primaryText, fontSize: "11px", marginTop: "1px" }}
                        >
                          {i + 1}
                        </span>
                        <p style={{ color: c.text, fontSize: "13px", fontWeight: 500, lineHeight: "1.4" }}>{r.question}</p>
                      </div>
                      <span
                        className="flex items-center gap-1.5 rounded-full px-3 py-1 shrink-0"
                        style={{ backgroundColor: s.bg, color: s.color, fontSize: "11px", fontWeight: 500 }}
                      >
                        {scoreIcons[r.score]} {s.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg p-3" style={{ backgroundColor: c.tagBg }}>
                        <p style={{ color: c.textMuted, fontSize: "10px", fontWeight: 500, letterSpacing: "0.05em", marginBottom: "4px" }}>ESPERADO</p>
                        <p style={{ color: c.textSecondary, fontSize: "12px", lineHeight: "1.5" }}>{r.expected}</p>
                      </div>
                      <div className="rounded-lg p-3" style={{ backgroundColor: c.tagBg }}>
                        <p style={{ color: c.textMuted, fontSize: "10px", fontWeight: 500, letterSpacing: "0.05em", marginBottom: "4px" }}>GERADO</p>
                        <p style={{ color: c.textSecondary, fontSize: "12px", lineHeight: "1.5" }}>{r.answer}</p>
                      </div>
                    </div>
                    <p style={{ color: c.textMuted, fontSize: "11px", marginTop: "10px", lineHeight: "1.5" }}>
                      {r.feedback}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}