import { useState } from "react";
import { Clock, ChevronRight, Leaf, Plus, PanelLeftClose, MessageSquare, ClipboardCheck, FileText } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const recentActivities = [
  { id: 1, text: "Fotossíntese e transferência de energia", time: "14:51" },
  { id: 2, text: "Relatividade geral — resumo", time: "13:31" },
  { id: 3, text: "Experimento de ótica", time: "7:01" },
];

type ChatMode = "chat" | "evaluator";

interface LeftSidebarProps {
  mode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  activeChat: number | null;
  onSelectChat: (id: number | null) => void;
  onClose: () => void;
}

export function LeftSidebar({ mode, onModeChange, activeChat, onSelectChat, onClose }: LeftSidebarProps) {
  const { c, isDark } = useTheme();
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const navItems: { key: ChatMode; icon: typeof MessageSquare; label: string }[] = [
    { key: "chat", icon: MessageSquare, label: "Chat Científico" },
    { key: "evaluator", icon: ClipboardCheck, label: "Avaliação em Lote" },
  ];

  return (
    <aside className="flex flex-col h-full" style={{ backgroundColor: c.sidebarBg, width: "240px", minWidth: "240px" }}>
      {/* Logo + close */}
      <div className="flex items-center gap-3 px-4 py-4 border-b" style={{ borderColor: c.sidebarBorder }}>
        <div
          className="flex items-center justify-center rounded-lg shrink-0"
          style={{
            width: "36px", height: "36px",
            backgroundColor: c.primary,
          }}
        >
          <Leaf size={18} color="#fff" />
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ color: c.sidebarText, fontWeight: 600, fontSize: "0.9rem", lineHeight: 1.2 }} className="truncate">
            Agente SB100
          </p>
          <p style={{ color: c.sidebarTextMuted, fontSize: "11px" }}>Assistente Científico</p>
        </div>
        <button
          onClick={onClose}
          className="flex items-center justify-center rounded-lg p-1 transition-opacity hover:opacity-75"
          style={{ color: c.sidebarTextMuted }}
          title="Fechar menu"
        >
          <PanelLeftClose size={15} />
        </button>
      </div>

      {/* Mode label */}
      <div className="px-4 pt-5 pb-2">
        <p style={{ color: c.sidebarTextMuted, fontSize: "10px", letterSpacing: "0.05em" }} className="uppercase font-medium">
          Modo de Trabalho
        </p>
      </div>

      {/* Nav items */}
      <nav className="px-3 space-y-1">
        {navItems.map(({ key, icon: Icon, label }) => {
          const active = mode === key;
          return (
            <button
              key={key}
              onClick={() => onModeChange(key)}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-all"
              style={{
                backgroundColor: active ? c.primary : "transparent",
                color: active ? "#fff" : c.sidebarTextMuted,
              }}
            >
              <Icon size={16} />
              <span style={{ fontSize: "13px", fontWeight: active ? 500 : 400 }}>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* New chat button */}
      <div className="px-3 pt-3">
        <button
          className="flex items-center justify-center gap-2 w-full py-2 rounded-lg transition-all"
          style={{
            backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.04)",
            color: c.sidebarText,
            fontSize: "12px",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.08)",
          }}
        >
          <Plus size={13} />
          Nova conversa
        </button>
      </div>

      {/* Recent activities */}
      <div className="flex-1 overflow-y-auto px-2 mt-5">
        <div className="px-2 mb-2 flex items-center gap-1.5">
          <Clock size={10} style={{ color: c.sidebarTextMuted }} />
          <p style={{ color: c.sidebarTextMuted, fontSize: "10px", letterSpacing: "0.05em" }} className="uppercase font-medium">
            Recentes
          </p>
        </div>
        {recentActivities.map((item) => {
          const active = activeChat === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectChat(item.id)}
              className="flex items-start justify-between w-full px-3 py-2 rounded-lg mb-0.5 text-left transition-all"
              style={{
                backgroundColor: active ? c.primary : "transparent",
                color: active ? "#fff" : c.sidebarText,
              }}
            >
              <p className="flex-1 truncate pr-2" style={{ color: active ? "#fff" : c.sidebarText, fontSize: "12px", lineHeight: "1.4" }}>
                {item.text}
              </p>
              <span style={{ color: active ? "rgba(255,255,255,0.8)" : c.sidebarTextMuted, fontSize: "11px", whiteSpace: "nowrap" }}>{item.time}</span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-2 py-3 border-t" style={{ borderColor: c.sidebarBorder }}>
        <div
          className="relative"
          onMouseEnter={() => setResourcesOpen(true)}
          onMouseLeave={() => setResourcesOpen(false)}
        >
          <button
            onClick={() => setResourcesOpen((v) => !v)}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-left transition-all hover:opacity-75"
            style={{ color: c.sidebarTextMuted, fontSize: "12px" }}
          >
            <span>Configurações</span>
            <ChevronRight size={13} style={{ transform: resourcesOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
          </button>

          {resourcesOpen && (
            <div className="mt-2 rounded-3xl border bg-white shadow-sm" style={{ borderColor: c.sidebarBorder, backgroundColor: c.cardBg }}>
              <div className="px-3 py-3 border-b" style={{ borderColor: c.sidebarBorder }}>
                <p style={{ fontSize: "12px", color: c.sidebarText, fontWeight: 600 }}>Recursos</p>
              </div>
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-left transition-all hover:bg-slate-50"
                style={{ color: c.sidebarText, fontSize: "12px" }}
              >
                <FileText size={14} />
                Consulta de publicações
              </button>

            </div>
          )}
        </div>
      </div>
    </aside>
  );
}