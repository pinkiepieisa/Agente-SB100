import { useState, useRef, useEffect } from "react";
import { Leaf, Send, BookOpen, FileText, BarChart2, Scale, User, Paperclip, Mic, ChevronDown, ChevronUp, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  time: string;
}

const suggestions = [
  { icon: BookOpen, title: "Conceito científico", desc: "Explique um conceito com exemplos práticos" },
  { icon: FileText, title: "Resumir publicação", desc: "Resuma um artigo ou publicação científica" },
  { icon: BarChart2, title: "Analisar dados", desc: "Interprete resultados de experimentos" },
  { icon: Scale, title: "Comparar teorias", desc: "Compare diferentes teorias ou modelos" },
];

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "Olá! Sou o Agente SB100, assistente científico especializado em agronomia e ciências naturais. Como posso ajudar você hoje?",
    time: "14:50",
  },
  {
    id: 2,
    role: "user",
    text: "Pode me explicar sobre a teoria da relatividade?",
    time: "14:51",
  },
  {
    id: 3,
    role: "assistant",
    text: "A teoria da relatividade de Einstein tem duas partes:\n\n**Relatividade Especial (1905):** As leis da física são iguais para todos os observadores em movimento uniforme, e a velocidade da luz é constante.\n\n**Relatividade Geral (1915):** A gravidade é uma curvatura do espaço-tempo causada pela massa.\n\nCuriosidade: o GPS precisa corrigir efeitos relativísticos para funcionar com precisão.",
    time: "14:51",
  },
];

export function ChatArea() {
  const { c, isDark } = useTheme();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(true);
  const [suggestionsOpen, setSuggestionsOpen] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function getTime() {
    const now = new Date();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
  }

  function sendMessage(text: string) {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text, time: getTime() }]);
    setInput("");
    setTimeout(() => {
      const replies = [
        "Ótima pergunta. Com base em estudos recentes, posso explicar de forma clara e objetiva.",
        "Entendido. Esse conceito é fundamental para entender fenômenos naturais. Vou detalhar passo a passo.",
        "De acordo com a literatura científica atual, essa questão envolve conceitos interligados. Vamos explorar juntos.",
        "A ciência oferece diversas perspectivas sobre esse tema. Deixa eu explicar as principais abordagens.",
      ];
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", text: replies[Math.floor(Math.random() * replies.length)], time: getTime() },
      ]);
    }, 900);
  }

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden" style={{ backgroundColor: c.mainBg }}>
      {/* Top bar */}
      <div
        className="flex items-center gap-3 px-5 py-3 border-b shrink-0"
        style={{ borderColor: c.border, backgroundColor: c.cardBg }}
      >
        <div
          className="flex items-center justify-center rounded-lg shrink-0"
          style={{ width: "36px", height: "36px", backgroundColor: c.primary }}
        >
          <Leaf size={18} color="#fff" />
        </div>
        <div>
          <p style={{ color: c.text, fontSize: "14px", fontWeight: 600 }}>Agente SB100</p>
          <p style={{ color: c.textSecondary, fontSize: "12px" }}>Assistente científico</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {!suggestionsVisible && (
            <button
              onClick={() => { setSuggestionsVisible(true); setSuggestionsOpen(true); }}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1 border transition-all"
              style={{ borderColor: c.border, fontSize: "11px", color: c.primary, backgroundColor: c.cardBg }}
            >
              <ChevronDown size={12} /> Sugestões
            </button>
          )}
        </div>
      </div>

      {/* Suggestions */}
      {suggestionsVisible && (
        <div
          className="px-5 pt-3 pb-3 border-b shrink-0"
          style={{ borderColor: c.border, backgroundColor: c.cardBg }}
        >
          <div className="flex items-center justify-between mb-2">
            <p style={{ color: c.textMuted, fontSize: "10px", letterSpacing: "0.05em", fontWeight: 500 }} className="uppercase">
              Sugestões de Perguntas
            </p>
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setSuggestionsOpen((v) => !v)}
                className="flex items-center justify-center rounded-lg p-1 transition-all hover:opacity-70"
                style={{ color: c.textMuted }}
              >
                {suggestionsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              <button
                onClick={() => setSuggestionsVisible(false)}
                className="flex items-center justify-center rounded-lg p-1 transition-all hover:opacity-70"
                style={{ color: c.textMuted }}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {suggestionsOpen && (
            <div className="grid grid-cols-4 gap-2">
              {suggestions.map((s, i) => {
                const Icon = s.icon;
                return (
                  <button
                    key={i}
                    onClick={() => sendMessage(s.desc)}
                    className="text-left p-3 rounded-lg border transition-all hover:scale-[1.02]"
                    style={{ backgroundColor: c.suggestionBg, borderColor: c.suggestionBorder }}
                  >
                    <div
                      className="flex items-center justify-center rounded-lg mb-2"
                      style={{ width: "26px", height: "26px", backgroundColor: c.primaryLight }}
                    >
                      <Icon size={13} color={c.primary} />
                    </div>
                    <p style={{ fontSize: "11px", color: c.text, fontWeight: 500, lineHeight: "1.3" }}>{s.title}</p>
                    <p style={{ fontSize: "10px", color: c.textMuted, lineHeight: "1.3", marginTop: "2px" }}>{s.desc}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className="flex items-center justify-center rounded-lg shrink-0"
              style={{
                width: "32px", height: "32px",
                backgroundColor: msg.role === "assistant" ? c.primaryLight : c.primary,
              }}
            >
              {msg.role === "assistant"
                ? <Leaf size={16} color={c.primary} />
                : <User size={16} color="#fff" />}
            </div>
            <div className={`max-w-[72%] flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div
                className="px-4 py-3"
                style={{
                  backgroundColor: msg.role === "assistant" ? c.messageBg : c.primary,
                  color: msg.role === "assistant" ? c.text : "#fff",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  border: msg.role === "assistant" ? `1px solid ${c.border}` : "none",
                  fontSize: "13px",
                  lineHeight: "1.6",
                  whiteSpace: "pre-line",
                }}
              >
                {msg.text}
              </div>
              <span style={{ fontSize: "10px", color: c.textMuted, marginTop: "4px" }}>{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-5 py-3 border-t shrink-0" style={{ borderColor: c.border, backgroundColor: c.cardBg }}>
        <div
          className="flex items-center gap-2 rounded-xl px-4 py-2.5"
          style={{ backgroundColor: c.inputBg, border: `1.5px solid ${c.inputBorder}` }}
        >
          <button style={{ color: c.textMuted }}>
            <Paperclip size={16} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Digite sua pergunta científica..."
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: "13px", color: c.text }}
          />
          <button style={{ color: c.textMuted }}>
            <Mic size={16} />
          </button>
          <button
            onClick={() => sendMessage(input)}
            className="flex items-center justify-center rounded-lg shrink-0 transition-all"
            style={{
              width: "32px", height: "32px",
              backgroundColor: input.trim() ? c.primary : c.border,
              transform: input.trim() ? "scale(1)" : "scale(0.95)",
            }}
          >
            <Send size={14} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}