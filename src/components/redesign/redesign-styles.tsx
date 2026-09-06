"use client";

export default function RedesignStyles() {
  return (
    <style jsx global>{`
      .redesign-root,
      .redesign-root * {
        font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
      }

      @keyframes redesignFadeUp {
        from {
          opacity: 0;
          transform: translateY(24px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .redesign-root .animate-fade-up {
        animation: redesignFadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }

      @media (prefers-reduced-motion: reduce) {
        .redesign-root .animate-fade-up {
          animation: none;
          opacity: 1;
          transform: none;
        }
        .redesign-root * {
          transition-duration: 1ms !important;
          animation-duration: 1ms !important;
        }
      }
    `}</style>
  );
}
