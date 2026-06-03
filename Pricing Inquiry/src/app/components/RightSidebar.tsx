import { Info } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export function RightSidebar() {
  const { c } = useTheme();

  return (
    <aside
      className="flex flex-col h-full overflow-hidden"
      style={{ width: "240px", minWidth: "240px", backgroundColor: c.rightBg, borderLeft: `1px solid ${c.border}` }}
    >
      <div className="px-4 py-4">
        <p style={{ fontSize: "13px", color: c.text, fontWeight: 600 }}>Status</p>
        <div className="mt-4 rounded-3xl border p-4" style={{ borderColor: c.border, backgroundColor: c.cardBg }}>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: "32px", height: "32px", backgroundColor: c.primaryLight }}
            >
              <Info size={16} color={c.primary} />
            </div>
            <div>
              <p style={{ fontSize: "13px", color: c.text, fontWeight: 600 }}>Online</p>
              <p style={{ fontSize: "11px", color: c.textSecondary, lineHeight: "1.4" }}>
                Agente SB100 está disponível.
              </p>
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
}