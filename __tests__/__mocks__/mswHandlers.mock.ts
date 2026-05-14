import { http, HttpResponse } from "msw";

import { mockUser, mockUsers } from "@tests/__mocks__/users.mock";

export const mockMswHandlers = [
  http.get("/users", () => {
    return HttpResponse.json(mockUsers);
  }),
  http.get("/users/:id", ({ params }) => {
    return HttpResponse.json({ ...mockUser, id: Number(params.id) });
  }),
];
