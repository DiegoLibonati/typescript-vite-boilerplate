import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import StorePage from "@/pages/StorePage/StorePage";

import { templateStore } from "@/stores/templateStore";

let page: Page;

const renderPage = (): Page => {
  const element = StorePage();
  document.body.appendChild(element);
  return element;
};

describe("StorePage", () => {
  beforeEach(() => {
    page = renderPage();
  });

  afterEach(() => {
    page.cleanup?.();
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  describe("rendering", () => {
    it("should render the page title", () => {
      expect(
        screen.getByRole("heading", { name: "Store Page" })
      ).toBeInTheDocument();
    });

    it("should render the counter with initial value 0", () => {
      expect(screen.getByRole("status")).toHaveTextContent("0");
    });

    it("should render the increase counter button", () => {
      expect(
        screen.getByRole("button", { name: "Increase counter by 1" })
      ).toBeInTheDocument();
    });

    it("should render the decrease counter button", () => {
      expect(
        screen.getByRole("button", { name: "Decrease counter by 1" })
      ).toBeInTheDocument();
    });

    it("should render a navigation link", () => {
      expect(
        screen.getByRole("link", { name: "Navigate to a non-existent page" })
      ).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should increase the counter when the + button is clicked", async () => {
      const user = userEvent.setup();
      await user.click(
        screen.getByRole("button", { name: "Increase counter by 1" })
      );
      expect(screen.getByRole("status")).toHaveTextContent("1");
    });

    it("should decrease the counter when the - button is clicked", async () => {
      const user = userEvent.setup();
      await user.click(
        screen.getByRole("button", { name: "Increase counter by 1" })
      );
      await user.click(
        screen.getByRole("button", { name: "Decrease counter by 1" })
      );
      expect(screen.getByRole("status")).toHaveTextContent("0");
    });

    it("should accumulate multiple increases", async () => {
      const user = userEvent.setup();
      await user.click(
        screen.getByRole("button", { name: "Increase counter by 1" })
      );
      await user.click(
        screen.getByRole("button", { name: "Increase counter by 1" })
      );
      await user.click(
        screen.getByRole("button", { name: "Increase counter by 1" })
      );
      expect(screen.getByRole("status")).toHaveTextContent("3");
    });

    it("should allow the counter to go negative", async () => {
      const user = userEvent.setup();
      await user.click(
        screen.getByRole("button", { name: "Decrease counter by 1" })
      );
      expect(screen.getByRole("status")).toHaveTextContent("-1");
    });
  });

  describe("cleanup", () => {
    it("should reset the store counter to 0", async () => {
      const user = userEvent.setup();
      await user.click(
        screen.getByRole("button", { name: "Increase counter by 1" })
      );
      page.cleanup?.();
      expect(templateStore.get("counter")).toBe(0);
    });

    it("should stop updating the DOM after cleanup", () => {
      page.cleanup?.();
      templateStore.addCounter(5);
      expect(screen.getByRole("status")).toHaveTextContent("0");
    });
  });
});
