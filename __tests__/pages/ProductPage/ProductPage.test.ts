import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import ProductPage from "@/pages/ProductPage/ProductPage";

const renderPage = (params?: Record<string, string>): Page => {
  const element = ProductPage(params);
  document.body.appendChild(element);
  return element;
};

describe("ProductPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("should render the product id in the title when params are provided", () => {
      renderPage({ id: "42" });
      expect(
        screen.getByRole("heading", { name: "Product Page: 42" })
      ).toBeInTheDocument();
    });

    it("should render 'unknown' in the title when no params are provided", () => {
      renderPage();
      expect(
        screen.getByRole("heading", { name: "Product Page: unknown" })
      ).toBeInTheDocument();
    });

    it("should render 'unknown' when params does not include id", () => {
      renderPage({});
      expect(
        screen.getByRole("heading", { name: "Product Page: unknown" })
      ).toBeInTheDocument();
    });

    it("should render a button to show the product ID", () => {
      renderPage({ id: "5" });
      expect(
        screen.getByRole("button", { name: "Show current product ID" })
      ).toBeInTheDocument();
    });

    it("should render a navigation link to a non-existent page", () => {
      renderPage({ id: "5" });
      expect(
        screen.getByRole("link", { name: "Navigate to a non-existent page" })
      ).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should alert with the product ID when the button is clicked", async () => {
      const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {
        // empty arrow fn
      });
      const user = userEvent.setup();
      renderPage({ id: "99" });
      await user.click(
        screen.getByRole("button", { name: "Show current product ID" })
      );
      expect(mockAlert).toHaveBeenCalledWith("Product ID: 99");
    });

    it("should alert with 'unknown' when no params are provided and the button is clicked", async () => {
      const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {
        // empty arrow fn
      });
      const user = userEvent.setup();
      renderPage();
      await user.click(
        screen.getByRole("button", { name: "Show current product ID" })
      );
      expect(mockAlert).toHaveBeenCalledWith("Product ID: unknown");
    });
  });
});
