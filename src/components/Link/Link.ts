import type { LinkProps } from "@/types/props";
import type { LinkComponent } from "@/types/components";

import "@/components/Link/Link.css";

export const Link = ({
  id,
  href,
  target,
  ariaLabel,
  children,
  className,
}: LinkProps): LinkComponent => {
  const a = document.createElement("a") as LinkComponent;
  a.id = id;
  a.href = href.startsWith("/") && !href.startsWith("/#") ? `#${href}` : href;
  const resolvedTarget = target ?? "_blank";
  a.target = resolvedTarget;
  a.rel = resolvedTarget === "_blank" ? "noopener noreferrer" : "";
  a.className = `link ${className ?? ""}`;
  a.setAttribute("aria-label", ariaLabel);

  a.innerHTML = children ?? "";

  return a;
};
