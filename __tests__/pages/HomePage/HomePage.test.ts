import { screen } from "@testing-library/dom";

import type { Page } from "@/types/pages";

import HomePage from "@/pages/HomePage/HomePage";

const renderPage = (): Page => {
  const element = HomePage();
  document.body.appendChild(element);
  return element;
};

describe("HomePage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(
        screen.getByRole("heading", { name: "Home Page" })
      ).toBeInTheDocument();
    });

    it("should render 3 navigation links", () => {
      renderPage();
      expect(screen.getAllByRole("link")).toHaveLength(3);
    });

    it("should render a link to the About page", () => {
      renderPage();
      expect(
        screen.getByRole("link", { name: "Navigate to About page" })
      ).toBeInTheDocument();
    });

    it("should render a link to open the About page in a new tab", () => {
      renderPage();
      expect(
        screen.getByRole("link", { name: "Open About page in a new tab" })
      ).toBeInTheDocument();
    });

    it("should render a link to the Users page", () => {
      renderPage();
      expect(
        screen.getByRole("link", { name: "Navigate to Users page" })
      ).toBeInTheDocument();
    });
  });

  describe("navigation", () => {
    it("should have the about link pointing to the correct href", () => {
      renderPage();
      const link = screen.getByRole("link", { name: "Navigate to About page" });
      expect(link).toHaveAttribute("href", "#/about");
    });

    it("should have the about link open in the same tab", () => {
      renderPage();
      const link = screen.getByRole("link", { name: "Navigate to About page" });
      expect(link).toHaveAttribute("target", "_self");
    });

    it("should have the second about link pointing to the correct href", () => {
      renderPage();
      const link = screen.getByRole("link", {
        name: "Open About page in a new tab",
      });
      expect(link).toHaveAttribute("href", "#/about");
    });

    it("should have the second about link open in a new tab", () => {
      renderPage();
      const link = screen.getByRole("link", {
        name: "Open About page in a new tab",
      });
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("should have the users link pointing to the correct href", () => {
      renderPage();
      const link = screen.getByRole("link", { name: "Navigate to Users page" });
      expect(link).toHaveAttribute("href", "#/users");
    });

    it("should have the users link open in the same tab", () => {
      renderPage();
      const link = screen.getByRole("link", { name: "Navigate to Users page" });
      expect(link).toHaveAttribute("target", "_self");
    });
  });
});
