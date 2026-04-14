import { screen } from "@testing-library/dom";

import type { Page } from "@/types/pages";

import AboutPage from "@/pages/AboutPage/AboutPage";

const renderPage = (): Page => {
  const element = AboutPage();
  document.body.appendChild(element);
  return element;
};

describe("AboutPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(
        screen.getByRole("heading", { name: "About Page" })
      ).toBeInTheDocument();
    });

    it("should render a link to the Product page", () => {
      renderPage();
      expect(
        screen.getByRole("link", { name: "Navigate to Product page 12" })
      ).toBeInTheDocument();
    });

    it("should render the correct text for the Product page link", () => {
      renderPage();
      expect(
        screen.getByRole("link", { name: "Navigate to Product page 12" })
      ).toHaveTextContent("Go to Product Page: 12");
    });

    it("should render a link to the Store page", () => {
      renderPage();
      expect(
        screen.getByRole("link", { name: "Navigate to Store page" })
      ).toBeInTheDocument();
    });

    it("should render the correct text for the Store page link", () => {
      renderPage();
      expect(
        screen.getByRole("link", { name: "Navigate to Store page" })
      ).toHaveTextContent("Go to Store Page");
    });
  });

  describe("navigation", () => {
    it("should have the product link pointing to the correct href", () => {
      renderPage();
      const link = screen.getByRole("link", {
        name: "Navigate to Product page 12",
      });
      expect(link).toHaveAttribute("href", "#/products/12");
    });

    it("should have the store link pointing to the correct href", () => {
      renderPage();
      const link = screen.getByRole("link", { name: "Navigate to Store page" });
      expect(link).toHaveAttribute("href", "#/store");
    });

    it("should open all links in the same tab", () => {
      renderPage();
      screen.getAllByRole("link").forEach((link) => {
        expect(link).toHaveAttribute("target", "_self");
      });
    });
  });
});
