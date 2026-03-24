import type { Page } from "@/types/pages";

import { Link } from "@/components/Link/Link";
import { Action } from "@/components/Action/Action";

import { templateStore } from "@/stores/templateStore";

import "@/pages/StorePage/StorePage.css";

const addCounter = (value = 1): void => {
  templateStore.addCounter(value);
};

const subtractCounter = (value = 1): void => {
  templateStore.subtractCounter(value);
};

export const StorePage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "store-page";

  main.innerHTML = `
    <h1 class="title">Store Page</h1> 

    <div class="counter">
      <h2 class="counter__number">0</h2>
    </div>

    <div class="links"></div>
  `;

  const links = main.querySelector<HTMLDivElement>(".links")!;
  const counter = main.querySelector<HTMLDivElement>(".counter")!;
  const counterNumber =
    main.querySelector<HTMLHeadingElement>(".counter__number")!;

  const linkNotExists = Link({
    id: "link-not-exists",
    ariaLabel: "link-not-exists",
    href: "/pasdasdasdasd",
    children: "Go to Not Exists Page",
    target: "_self",
  });

  const actionSubtract = Action({
    id: "counter-subtract",
    ariaLabel: "counter minus 1",
    onClick: (): void => {
      subtractCounter();
    },
    className: "counter__subtract",
    children: "-",
  });

  const actionPlus = Action({
    id: "counter-plus",
    ariaLabel: "counter plus 1",
    onClick: (): void => {
      addCounter();
    },
    className: "counter__plus",
    children: "+",
  });

  links.append(linkNotExists);

  counter.append(actionPlus);
  counter.insertBefore(actionSubtract, counterNumber);

  const renderCounter = (): void => {
    const state = templateStore.getState();

    counterNumber.textContent = String(state.counter);
  };

  const unsubscribe = templateStore.subscribe("counter", renderCounter);

  main.cleanup = (): void => {
    unsubscribe();
    actionSubtract.cleanup?.();
    actionPlus.cleanup?.();
    templateStore.cleanup();
  };

  return main;
};
