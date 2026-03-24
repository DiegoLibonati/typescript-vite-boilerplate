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
  a.target = target ?? "_blank";
  a.className = `link ${className ?? ""}`;
  a.setAttribute("aria-label", ariaLabel);

  a.innerHTML = children ?? "";

  return a;
};
