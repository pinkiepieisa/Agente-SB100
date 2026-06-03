import { useState, useRef, useEffect } from "react";
import { LeftSidebar } from "./components/LeftSidebar";
import { ChatArea } from "./components/ChatArea";
import { EvaluatorArea } from "./components/EvaluatorArea";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { Settings, HelpCircle, Info, PanelLeft, Moon, Sun, X, FileText, Leaf } from "lucide-react";

type ChatMode = "chat" | "evaluator";

const helpSteps = [
  { title: "Escolha o tema", desc: "Selecione a área científica no menu lateral." },
  { title: "Faça sua pergunta", desc: "Digite sua dúvida de forma clara e objetiva." },
  { title: "Revise as respostas", desc: "Analise e solicite aprofundamentos." },
];

const helpResources = [
  { icon: FileText, label: "Consulta de publicações" },
];

function AppInner() {
  const { c, isDark, toggleTheme } = useTheme();
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [leftOpen, setLeftOpen] = useState(true);
  const [mode, setMode] = useState<ChatMode>("chat");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);

  // Close settings dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) {
        setHelpOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex flex-col size-full" style={{ backgroundColor: c.mainBg }}>
      {/* MARKER-MAKE-KIT-INVOKED */}

      {/* Header */}
      <header
        className="flex items-center gap-2 px-4 py-2 shrink-0 border-b"
        style={{ backgroundColor: c.headerBg, borderColor: c.headerBorder, zIndex: 20 }}
      >
        {/* Left sidebar toggle */}
        <button
          onClick={() => setLeftOpen((v) => !v)}
          className="flex items-center justify-center rounded-lg p-2 transition-all"
          style={{ color: leftOpen ? c.primary : c.textMuted, backgroundColor: leftOpen ? c.primaryLight : "transparent" }}
          title={leftOpen ? "Fechar menu" : "Abrir menu"}
        >
          <PanelLeft size={17} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2.5 mx-1">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{ width: "32px", height: "32px", backgroundColor: c.primary }}
          >
            <Leaf size={17} color="#fff" />
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-1 ml-2 relative" ref={helpRef}>
          <button
            onClick={() => setHelpOpen((v) => !v)}
            className="flex items-center justify-center rounded-lg p-2 transition-all hover:opacity-80"
            style={{ color: helpOpen ? c.primary : c.textMuted, backgroundColor: helpOpen ? c.primaryLight : "transparent" }}
            title="Informações"
          >
            <HelpCircle size={16} />
          </button>

          {/* Settings with dropdown */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setSettingsOpen((v) => !v)}
              className="flex items-center justify-center rounded-lg p-2 transition-all"
              style={{
                color: settingsOpen ? c.primary : c.textMuted,
                backgroundColor: settingsOpen ? c.primaryLight : "transparent",
              }}
            >
              <Settings size={16} />
            </button>

            {settingsOpen && (
              <div
                className="absolute right-0 top-full mt-2 rounded-xl shadow-xl overflow-hidden z-50"
                style={{
                  width: "240px",
                  backgroundColor: c.cardBg,
                  border: `1px solid ${c.cardBorder}`,
                  boxShadow: isDark
                    ? "0 20px 60px rgba(0,0,0,0.6)"
                    : "0 20px 60px rgba(0,0,0,0.12)",
                }}
              >
                <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: c.border }}>
                  <p style={{ fontSize: "13px", color: c.text, fontWeight: 600 }}>Configurações</p>
                  <button onClick={() => setSettingsOpen(false)} style={{ color: c.textMuted }}>
                    <X size={14} />
                  </button>
                </div>

                {/* Dark mode toggle */}
                <div className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {isDark
                        ? <Moon size={15} color={c.primary} />
                        : <Sun size={15} color={c.primary} />}
                      <div>
                        <p style={{ fontSize: "13px", color: c.text, fontWeight: 500 }}>
                          {isDark ? "Modo Escuro" : "Modo Claro"}
                        </p>
                      </div>
                    </div>

                    {/* Toggle switch */}
                    <button
                      onClick={toggleTheme}
                      className="relative rounded-full transition-all duration-300 shrink-0"
                      style={{
                        width: "42px",
                        height: "24px",
                        backgroundColor: isDark ? c.primary : c.border,
                        padding: "2px",
                      }}
                    >
                      <div
                        className="rounded-full bg-white transition-all duration-300"
                        style={{
                          width: "20px",
                          height: "20px",
                          transform: isDark ? "translateX(18px)" : "translateX(0)",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                        }}
                      />
                    </button>
                  </div>
                </div>

                <div className="px-4 pb-3 border-t pt-3" style={{ borderColor: c.border }}>
                  <p style={{ fontSize: "11px", color: c.textMuted, lineHeight: "1.5" }}>
                    Agente SB100 v1.0 — Assistente científico
                  </p>
                </div>
              </div>
            )}
          </div>

          {helpOpen && (
            <div
              className="absolute right-0 top-full mt-2 rounded-xl shadow-xl overflow-hidden z-50"
              style={{
                width: "300px",
                minWidth: "240px",
                backgroundColor: c.cardBg,
                border: `1px solid ${c.cardBorder}`,
                boxShadow: isDark
                  ? "0 20px 60px rgba(0,0,0,0.6)"
                  : "0 20px 60px rgba(0,0,0,0.12)",
              }}
            >
              <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: c.border }}>
                <div className="flex items-center justify-center rounded-lg" style={{ width: "28px", height: "28px", backgroundColor: c.primaryLight }}>
                  <Info size={14} color={c.primary} />
                </div>
                <div>
                  <p style={{ fontSize: "13px", color: c.text, fontWeight: 600 }}>Informações</p>
                  <p style={{ fontSize: "11px", color: c.textSecondary }}>Dicas rápidas sobre o uso da plataforma.</p>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div className="space-y-3">
                  {helpSteps.map((step, i) => (
                    <div key={i} className="flex gap-2">
                      <div
                        className="flex items-center justify-center rounded-full text-white font-medium"
                        style={{ width: "22px", height: "22px", backgroundColor: c.primary, fontSize: "11px" }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <p style={{ fontSize: "12px", color: c.text, fontWeight: 500 }}>{step.title}</p>
                        <p style={{ fontSize: "11px", color: c.textSecondary, lineHeight: "1.4" }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {helpResources.map((res, i) => {
                    const Icon = res.icon;
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className="flex items-center justify-center rounded-lg"
                          style={{ width: "24px", height: "24px", backgroundColor: c.primary }}
                        >
                          <Icon size={12} color="#fff" />
                        </div>
                        <span style={{ fontSize: "12px", color: c.textSecondary }}>{res.label}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-xl p-3" style={{ backgroundColor: c.securityBg, border: `1px solid ${c.border}` }}>
                  <p style={{ fontSize: "11px", color: c.textSecondary, lineHeight: "1.5" }}>
                    Plataforma de consulta científica. Todas as conversas são privadas e processadas com segurança.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Avatar */}
          <div
            className="flex items-center justify-center rounded-lg ml-1 font-semibold text-white"
            style={{
              width: "30px", height: "30px",
              backgroundColor: c.primary,
              fontSize: "11px",
            }}
          >
            SB
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out shrink-0"
          style={{ width: leftOpen ? "240px" : "0px" }}
        >
          <div style={{ width: "240px", height: "100%" }}>
            <LeftSidebar
              mode={mode}
              onModeChange={setMode}
              activeChat={activeChat}
              onSelectChat={setActiveChat}
              onClose={() => setLeftOpen(false)}
            />
          </div>
        </div>

        {/* Main area */}
        {mode === "chat" ? <ChatArea /> : <EvaluatorArea />}

      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}