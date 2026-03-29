import type { Page } from "@/types/pages";

import Link from "@/components/Link/Link";
import Action from "@/components/Action/Action";

import { templateStore } from "@/stores/templateStore";

import "@/pages/StorePage/StorePage.css";

const addCounter = (value: number): void => {
  templateStore.addCounter(value);
};

const subtractCounter = (value: number): void => {
  templateStore.subtractCounter(value);
};

const StorePage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "store-page";

  main.innerHTML = `
    <h1 class="title">Store Page</h1> 

    <section class="counter" aria-label="Counter">
      <output
        class="counter__number"
        aria-live="polite"
        aria-label="Counter value: 0"
        for="counter-subtract counter-plus"
      >
        0
      </output>
    </section>

    <nav aria-label="Page navigation">
      <ul class="links">
        <li class="link-item-1"></li>
      </ul>
    </nav>
  `;

  const linkItem1 = main.querySelector<HTMLLIElement>(".link-item-1")!;
  const counter = main.querySelector<HTMLElement>(".counter")!;
  const counterNumber =
    main.querySelector<HTMLOutputElement>(".counter__number")!;

  const linkNotExists = Link({
    id: "link-not-exists",
    ariaLabel: "Navigate to a non-existent page",
    href: "/pasdasdasdasd",
    children: "Go to Not Exists Page",
    target: "_self",
  });

  const actionSubtract = Action({
    id: "counter-subtract",
    ariaLabel: "Decrease counter by 1",
    onClick: (): void => {
      subtractCounter(1);
    },
    className: "counter__subtract",
    children: "-",
  });

  const actionPlus = Action({
    id: "counter-plus",
    ariaLabel: "Increase counter by 1",
    onClick: (): void => {
      addCounter(1);
    },
    className: "counter__plus",
    children: "+",
  });

  linkItem1.append(linkNotExists);

  counter.append(actionPlus);
  counter.insertBefore(actionSubtract, counterNumber);

  const renderCounter = (): void => {
    const state = templateStore.getState();

    counterNumber.textContent = String(state.counter);
    counterNumber.ariaLabel = `Counter value: ${state.counter}`;
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

export default StorePage;
