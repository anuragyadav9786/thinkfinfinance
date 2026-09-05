
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

export default function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    nProgress.configure({ showSpinner: false });
    
    const style = document.getElementById("nprogress-custom-styles");
    if (!style) {
      const styleSheet = document.createElement("style");
      styleSheet.id = "nprogress-custom-styles";
      styleSheet.textContent = `
        #nprogress {
          pointer-events: none;
        }
        #nprogress .bar {
          background: hsl(var(--primary));
          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
        }
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px hsl(var(--primary)), 0 0 5px hsl(var(--primary));
          opacity: 1.0;
          transform: rotate(3deg) translate(0px, -4px);
        }
      `;
      document.head.appendChild(styleSheet);
    }
    
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      nProgress.start();
      return originalPushState.apply(history, args);
    };

    const handlePopState = () => {
      nProgress.start();
    };

    window.addEventListener("popstate", handlePopState);
    
    // Add a click listener for any links that might not use pushState correctly
    const handleAnchorClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const anchor = target.closest("a");
        if (anchor) {
            const href = anchor.getAttribute("href");
            // Check for internal, non-hash links
            if (href && href.startsWith("/") && !href.startsWith("/#")) {
                nProgress.start();
            }
        }
    };
    
    document.addEventListener("click", handleAnchorClick);

    return () => {
       history.pushState = originalPushState;
       window.removeEventListener("popstate", handlePopState);
       document.removeEventListener("click", handleAnchorClick);
    };

  }, []);

  useEffect(() => {
    nProgress.done();
  }, [pathname, searchParams]);

  return null;
}
