import type { ActionProps } from "@/types/props";
import type { ActionComponent } from "@/types/components";

import "@/components/Action/Action.css";

const Action = ({
  id,
  ariaLabel,
  children,
  className,
  onClick,
}: ActionProps): ActionComponent => {
  const action = document.createElement("button") as ActionComponent;
  action.id = id;
  action.className = `action ${className ?? ""}`.trim();
  action.setAttribute("aria-label", ariaLabel);

  action.innerHTML = children ?? "";

  const handleClick = (e: MouseEvent): void => {
    onClick(e, id);
  };

  action.addEventListener("click", handleClick);

  action.cleanup = (): void => {
    action.removeEventListener("click", handleClick);
  };

  return action;
};

export default Action;
