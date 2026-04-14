import { screen } from "@testing-library/dom";

import type { Page } from "@/types/pages";

import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

const renderPage = (): Page => {
  const element = NotFoundPage();
  document.body.appendChild(element);
  return element;
};

describe("NotFoundPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("should render a main element with the not-found-page class", () => {
      const page = renderPage();
      expect(page).toHaveClass("not-found-page");
    });

    it("should render the page title", () => {
      renderPage();
      expect(
        screen.getByRole("heading", { name: "Not Found Page" })
      ).toBeInTheDocument();
    });

    it("should render the error description", () => {
      renderPage();
      expect(
        screen.getByText(
          /The page you're looking for doesn't exist or has been moved/
        )
      ).toBeInTheDocument();
    });

    it("should not render any links", () => {
      renderPage();
      expect(screen.queryAllByRole("link")).toHaveLength(0);
    });
  });
});
