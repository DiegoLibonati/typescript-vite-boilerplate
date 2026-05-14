import { screen, waitFor } from "@testing-library/dom";

import type { Page } from "@/types/pages";

import UsersPage from "@/pages/UsersPage/UsersPage";

import userService from "@/services/userService";

import { mockUsers } from "@tests/__mocks__/users.mock";

const mockGetAll = userService.getAll as jest.MockedFunction<
  typeof userService.getAll
>;

jest.mock("@/services/userService", () => ({
  __esModule: true,
  default: {
    getAll: jest.fn(),
    getById: jest.fn(),
  },
}));

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
        mockGetAll.mockResolvedValue(mockUsers);

        renderPage();

        expect(
          screen.getByRole("heading", { name: "Users Page" })
        ).toBeInTheDocument();
      });

      it("should show a loading message before data arrives", () => {
        mockGetAll.mockResolvedValue(mockUsers);

        renderPage();

        expect(screen.getByText("Loading users...")).toBeInTheDocument();
      });

      it("should render a link to the Home page", () => {
        mockGetAll.mockResolvedValue(mockUsers);

        renderPage();

        expect(
          screen.getByRole("link", { name: "Navigate to Home page" })
        ).toBeInTheDocument();
      });
    });

    describe("after loading", () => {
      it("should render a card for each user", async () => {
        mockGetAll.mockResolvedValue(mockUsers);

        renderPage();

        await screen.findByText(mockUsers[0]!.name);
        expect(screen.getByText(mockUsers[1]!.name)).toBeInTheDocument();
      });

      it("should remove the loading message after data loads", async () => {
        mockGetAll.mockResolvedValue(mockUsers);

        renderPage();

        await waitFor(() => {
          expect(
            screen.queryByText("Loading users...")
          ).not.toBeInTheDocument();
        });
      });

      it("should render the username of each user", async () => {
        mockGetAll.mockResolvedValue(mockUsers);

        renderPage();

        await screen.findByText(mockUsers[0]!.name);
        const usernameEls = document.querySelectorAll<HTMLParagraphElement>(
          ".user-card__username"
        );
        expect(usernameEls).toHaveLength(mockUsers.length);
      });

      it("should render an empty list when the service returns no users", async () => {
        mockGetAll.mockResolvedValue([]);

        renderPage();

        await waitFor(() => {
          expect(userService.getAll).toHaveBeenCalledTimes(1);
        });
        const cards = document.querySelectorAll<HTMLElement>(".user-card");
        expect(cards).toHaveLength(0);
      });
    });
  });

  describe("error handling", () => {
    it("should display an error alert when the service rejects", async () => {
      mockGetAll.mockRejectedValue(new Error("API error"));

      renderPage();

      const alert = await screen.findByRole("alert");
      expect(alert).toHaveTextContent("Error loading users. Please try again.");
    });

    it("should not render any user cards when the service fails", async () => {
      mockGetAll.mockRejectedValue(new Error("API error"));

      renderPage();

      await screen.findByRole("alert");
      const cards = document.querySelectorAll<HTMLElement>(".user-card");
      expect(cards).toHaveLength(0);
    });
  });

  describe("cleanup", () => {
    it("should expose a cleanup method", () => {
      mockGetAll.mockResolvedValue(mockUsers);

      const page = renderPage();

      expect(typeof page.cleanup).toBe("function");
    });

    it("should not throw when cleanup is invoked", () => {
      mockGetAll.mockResolvedValue(mockUsers);

      const page = renderPage();

      expect(() => page.cleanup?.()).not.toThrow();
    });
  });
});
