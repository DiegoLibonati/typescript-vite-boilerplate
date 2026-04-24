import userService from "@/services/userService";

import { mockUser, mockUsers } from "@tests/__mocks__/users.mock";

const mockFetchSuccess = (data: unknown): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => await data,
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

describe("userService", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getAll", () => {
    it("should return a list of users on success", async () => {
      mockFetchSuccess(mockUsers);
      const result = await userService.getAll();
      expect(result).toEqual(mockUsers);
    });

    it("should call fetch with the /users endpoint", async () => {
      mockFetchSuccess(mockUsers);
      await userService.getAll();
      expect(global.fetch).toHaveBeenCalledWith("/users");
    });

    it("should throw an error when the response is not ok", async () => {
      mockFetchError(500);
      await expect(userService.getAll()).rejects.toThrow(
        "HTTP error! status: 500"
      );
    });

    it("should throw an error on 404 not found", async () => {
      mockFetchError(404);
      await expect(userService.getAll()).rejects.toThrow(
        "HTTP error! status: 404"
      );
    });

    it("should throw an error when the network request fails", async () => {
      mockFetchNetworkError();
      await expect(userService.getAll()).rejects.toThrow("Network error");
    });
  });

  describe("getById", () => {
    it("should return a single user on success", async () => {
      mockFetchSuccess(mockUser);
      const result = await userService.getById(1);
      expect(result).toEqual(mockUser);
    });

    it("should call fetch with the correct /users/:id endpoint", async () => {
      mockFetchSuccess(mockUser);
      await userService.getById(1);
      expect(global.fetch).toHaveBeenCalledWith("/users/1");
    });

    it("should call fetch with the correct id in the path", async () => {
      mockFetchSuccess(mockUser);
      await userService.getById(42);
      expect(global.fetch).toHaveBeenCalledWith("/users/42");
    });

    it("should throw an error when the response is not ok", async () => {
      mockFetchError(404);
      await expect(userService.getById(99)).rejects.toThrow(
        "HTTP error! status: 404"
      );
    });

    it("should throw an error when the network request fails", async () => {
      mockFetchNetworkError("Connection refused");
      await expect(userService.getById(1)).rejects.toThrow(
        "Connection refused"
      );
    });
  });
});
