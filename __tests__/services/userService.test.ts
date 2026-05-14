import { http, HttpResponse } from "msw";

import userService from "@/services/userService";

import { mockMswServer } from "@tests/__mocks__/mswServer.mock";
import { mockUser, mockUsers } from "@tests/__mocks__/users.mock";

describe("userService", () => {
  describe("getAll", () => {
    it("should return a list of users on success", async () => {
      const result = await userService.getAll();

      expect(result).toEqual(mockUsers);
    });

    it("should call the /users endpoint", async () => {
      let receivedPath = "";
      mockMswServer.use(
        http.get("/users", ({ request }) => {
          receivedPath = new URL(request.url).pathname;
          return HttpResponse.json(mockUsers);
        })
      );

      await userService.getAll();

      expect(receivedPath).toBe("/users");
    });

    it("should throw an error when the response is not ok", async () => {
      mockMswServer.use(
        http.get("/users", () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(userService.getAll()).rejects.toThrow(
        "HTTP error! status: 500"
      );
    });

    it("should throw an error on 404 not found", async () => {
      mockMswServer.use(
        http.get("/users", () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      await expect(userService.getAll()).rejects.toThrow(
        "HTTP error! status: 404"
      );
    });

    it("should throw an error when the network request fails", async () => {
      mockMswServer.use(
        http.get("/users", () => {
          return HttpResponse.error();
        })
      );

      await expect(userService.getAll()).rejects.toThrow();
    });
  });

  describe("getById", () => {
    it("should return a single user on success", async () => {
      const result = await userService.getById(1);

      expect(result).toEqual({ ...mockUser, id: 1 });
    });

    it("should call the /users/:id endpoint with the correct id", async () => {
      let receivedPath = "";
      mockMswServer.use(
        http.get("/users/:id", ({ request, params }) => {
          receivedPath = new URL(request.url).pathname;
          return HttpResponse.json({ ...mockUser, id: Number(params.id) });
        })
      );

      await userService.getById(42);

      expect(receivedPath).toBe("/users/42");
    });

    it("should return the user with the requested id", async () => {
      const result = await userService.getById(99);

      expect(result.id).toBe(99);
    });

    it("should throw an error when the response is not ok", async () => {
      mockMswServer.use(
        http.get("/users/:id", () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      await expect(userService.getById(99)).rejects.toThrow(
        "HTTP error! status: 404"
      );
    });

    it("should throw an error on 500 server error", async () => {
      mockMswServer.use(
        http.get("/users/:id", () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(userService.getById(1)).rejects.toThrow(
        "HTTP error! status: 500"
      );
    });

    it("should throw an error when the network request fails", async () => {
      mockMswServer.use(
        http.get("/users/:id", () => {
          return HttpResponse.error();
        })
      );

      await expect(userService.getById(1)).rejects.toThrow();
    });
  });
});
