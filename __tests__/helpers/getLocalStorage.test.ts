import { getLocalStorage } from "@/helpers/getLocalStorage";

describe("getLocalStorage", () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe("when the key exists", () => {
    it("should return the parsed object value", () => {
      localStorage.setItem("user", JSON.stringify({ id: 1, name: "John" }));
      expect(getLocalStorage("user")).toEqual({ id: 1, name: "John" });
    });

    it("should return the parsed string value", () => {
      localStorage.setItem("name", JSON.stringify("John Doe"));
      expect(getLocalStorage("name")).toBe("John Doe");
    });

    it("should return the parsed number value", () => {
      localStorage.setItem("count", JSON.stringify(42));
      expect(getLocalStorage("count")).toBe(42);
    });

    it("should return the parsed array value", () => {
      localStorage.setItem("items", JSON.stringify([1, 2, 3]));
      expect(getLocalStorage("items")).toEqual([1, 2, 3]);
    });

    it("should return the parsed boolean value", () => {
      localStorage.setItem("active", JSON.stringify(true));
      expect(getLocalStorage("active")).toBe(true);
    });
  });

  describe("when the key does not exist", () => {
    it("should return null", () => {
      expect(getLocalStorage("non-existent")).toBeNull();
    });
  });

  describe("when the stored value is an empty string", () => {
    it("should return null", () => {
      localStorage.setItem("empty", "");
      expect(getLocalStorage("empty")).toBeNull();
    });
  });
});
