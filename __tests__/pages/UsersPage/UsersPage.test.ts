import { screen, waitFor } from "@testing-library/dom";

import type { Page } from "@/types/pages";

import UsersPage from "@/pages/UsersPage/UsersPage";

import { mockUsers } from "@tests/__mocks__/users.mock";

const mockFetchSuccess = (data: unknown): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => data,
  } as Response);
};

const mockFetchError = (status: number): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status,
  } as Response);
};

const mockFetchNetworkError = (message = "Network error"): void => {
  global.fetch = jest.fn().mockRejectedValue(new Error(message));
};

const renderPage = (): Page => {
  const element = UsersPage();
  document.body.appendChild(element);
  return element;
};

describe("UsersPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    describe("initial state", () => {
      it("should render the page title", () => {
        mockFetchSuccess(mockUsers);
        renderPage();
        expect(
          screen.getByRole("heading", { name: "Users Page" })
        ).toBeInTheDocument();
      });

      it("should show a loading message before data arrives", () => {
        mockFetchSuccess(mockUsers);
        renderPage();
        expect(screen.getByText("Loading users...")).toBeInTheDocument();
      });

      it("should render a link to the Home page", () => {
        mockFetchSuccess(mockUsers);
        renderPage();
        expect(
          screen.getByRole("link", { name: "Navigate to Home page" })
        ).toBeInTheDocument();
      });
    });

    describe("after loading", () => {
      it("should render a card for each user", async () => {
        mockFetchSuccess(mockUsers);
        renderPage();
        await screen.findByText(mockUsers[0]!.name);
        expect(screen.getByText(mockUsers[1]!.name)).toBeInTheDocument();
      });

      it("should remove the loading message after data loads", async () => {
        mockFetchSuccess(mockUsers);
        renderPage();
        await waitFor(() => {
          expect(
            screen.queryByText("Loading users...")
          ).not.toBeInTheDocument();
        });
      });

      it("should render the username of each user", async () => {
        mockFetchSuccess(mockUsers);
        renderPage();
        await screen.findByText(mockUsers[0]!.name);
        const usernameEls = document.querySelectorAll<HTMLParagraphElement>(
          ".user-card__username"
        );
        expect(usernameEls).toHaveLength(mockUsers.length);
      });
    });
  });

  describe("error handling", () => {
    it("should display an error alert when fetch returns a non-ok response", async () => {
      mockFetchError(500);
      renderPage();
      await screen.findByRole("alert");
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Error loading users. Please try again."
      );
    });

    it("should display an error alert when the network request fails", async () => {
      mockFetchNetworkError();
      renderPage();
      await screen.findByRole("alert");
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Error loading users. Please try again."
      );
    });
  });

  describe("cleanup", () => {
    it("should expose a cleanup method", () => {
      mockFetchSuccess(mockUsers);
      const page = renderPage();
      expect(typeof page.cleanup).toBe("function");
    });
  });
});
