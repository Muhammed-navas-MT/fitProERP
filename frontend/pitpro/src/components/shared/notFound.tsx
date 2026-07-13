import { FileSearch, ArrowLeft} from "lucide-react";

export default function GymNotFoundPro() {

  return (
    <div className="gp-root">
      <style>{`
        * { box-sizing: border-box; }

        .gp-root {
          --bg: #0a0a0b;
          --surface: #101113;
          --surface-2: #16171a;
          --border: rgba(255,255,255,0.08);
          --border-strong: rgba(255,255,255,0.14);
          --text: #f2f1ee;
          --text-dim: #9a968d;
          --text-faint: #6b675f;
          --accent: #f97316;
          --accent-dim: rgba(249,115,22,0.12);
          --accent-border: rgba(249,115,22,0.3);

          min-height: 100vh;
          width: 100%;
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .gp-panel {
          width: 100%;
          max-width: 700px;
          animation: gp-in 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes gp-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .gp-error-card {
          text-align: center;
          padding: 40px 32px 32px;
          border: 1px solid var(--border);
          background: var(--surface);
          border-radius: 14px;
        }

        .gp-icon-tile {
          width: 52px;
          height: 52px;
          margin: 0 auto 22px;
          border-radius: 12px;
          background: var(--accent-dim);
          border: 1px solid var(--accent-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
        }

        .gp-code {
          font-family: 'JetBrains Mono', 'SF Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.14em;
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 10px;
        }

        .gp-title {
          font-size: 21px;
          font-weight: 700;
          margin: 0 0 10px;
          letter-spacing: -0.01em;
        }

        .gp-desc {
          font-size: 14px;
          line-height: 1.65;
          color: var(--text-dim);
          max-width: 420px;
          margin: 0 auto 26px;
        }

        .gp-actions {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 22px;
        }

        .gp-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13.5px;
          font-weight: 600;
          padding: 9px 16px;
          border-radius: 8px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: transform 140ms ease, box-shadow 140ms ease, background 140ms ease, border-color 140ms ease;
          font-family: inherit;
        }

        .gp-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .gp-btn.primary {
          background: var(--accent);
          color: #170b02;
        }

        .gp-btn.primary:hover {
          background: #fb8b3d;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(249,115,22,0.28);
        }

        .gp-btn.ghost {
          background: var(--surface-2);
          border-color: var(--border-strong);
          color: var(--text);
        }

        .gp-btn.ghost:hover {
          border-color: var(--accent-border);
          transform: translateY(-1px);
        }

        .gp-ref {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11.5px;
          color: var(--text-faint);
        }

        .gp-ref a {
          color: var(--text-dim);
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .gp-panel { animation: none; }
        }
      `}</style>

      <div className="gp-panel">
        <div className="gp-error-card">
          <div className="gp-icon-tile">
            <FileSearch size={24} strokeWidth={2} />
          </div>

          <div className="gp-code">ERROR 404</div>
          <h1 className="gp-title">This page isn't part of your workspace</h1>
          <p className="gp-desc">
            The page you tried to open doesn't exist, may have been moved, or
            you don't have permission to view it. Double-check the link and
            try again.
          </p>

          <div className="gp-actions">
            <button className="gp-btn ghost" onClick={() => window.history.back()}>
              <ArrowLeft size={15} strokeWidth={2.3} />
              Go back
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}