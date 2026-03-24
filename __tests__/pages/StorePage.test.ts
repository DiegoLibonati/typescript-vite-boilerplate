import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { StorePage } from "@/pages/StorePage/StorePage";

import { templateStore } from "@/stores/templateStore";

const renderPage = (): Page => {
  const container = StorePage();
  document.body.appendChild(container);
  return container;
};

describe("StorePage", () => {
  beforeEach(() => {
    templateStore.restartCounter();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    templateStore.restartCounter();
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".store-page");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render counter with initial value of 0", () => {
    renderPage();

    const counterNumber =
      document.querySelector<HTMLHeadingElement>(".counter__number");
    expect(counterNumber?.textContent).toBe("0");
  });

  it("should increment counter when plus button clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    const plusButton = screen.getByRole("button", {
      name: "Increase counter by 1",
    });
    await user.click(plusButton);

    const counterNumber =
      document.querySelector<HTMLHeadingElement>(".counter__number");
    expect(counterNumber?.textContent).toBe("1");
  });

  it("should decrement counter when minus button clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    const minusButton = screen.getByRole("button", {
      name: "Decrease counter by 1",
    });
    await user.click(minusButton);

    const counterNumber =
      document.querySelector<HTMLHeadingElement>(".counter__number");
    expect(counterNumber?.textContent).toBe("-1");
  });

  it("should cleanup store and actions on page cleanup", () => {
    const page = renderPage();

    templateStore.addCounter(10);
    expect(templateStore.get("counter")).toBe(10);

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(templateStore.get("counter")).toBe(0);
  });
});
