import type { User } from "@/types/app";

const userService = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch(`/users`);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const users: User[] = (await response.json()) as User[];

    return users;
  },

  getById: async (id: number): Promise<User> => {
    const response = await fetch(`/users/${id}`);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const user: User = (await response.json()) as User;

    return user;
  },
};

export default userService;
