import { Store } from "@/core/store";

interface TestState extends Record<string, unknown> {
  count: number;
  name: string;
}

class TestStore extends Store<TestState> {
  constructor() {
    super({ count: 0, name: "initial" });
  }

  increment(): void {
    this.setState({ count: this.get("count") + 1 });
  }

  setName(name: string): void {
    this.setState({ name });
  }
}

describe("Store", () => {
  let store: TestStore;

  beforeEach(() => {
    store = new TestStore();
  });

  describe("getState", () => {
    it("should return the initial state", () => {
      expect(store.getState()).toEqual({ count: 0, name: "initial" });
    });

    it("should reflect updates after setState", () => {
      store.setState({ count: 5 });
      expect(store.getState()).toEqual({ count: 5, name: "initial" });
    });
  });

  describe("get", () => {
    it("should return the value for a given key", () => {
      expect(store.get("count")).toBe(0);
      expect(store.get("name")).toBe("initial");
    });

    it("should return the updated value after setState", () => {
      store.setState({ count: 42 });
      expect(store.get("count")).toBe(42);
    });
  });

  describe("setState", () => {
    it("should update only the specified key and keep others unchanged", () => {
      store.setState({ count: 3 });
      expect(store.get("count")).toBe(3);
      expect(store.get("name")).toBe("initial");
    });

    it("should accumulate multiple setState calls", () => {
      store.setState({ count: 3 });
      store.setState({ name: "updated" });
      expect(store.getState()).toEqual({ count: 3, name: "updated" });
    });

    it("should notify listeners when the value changes", () => {
      const mockListener = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ count: 1 });
      expect(mockListener).toHaveBeenCalledWith(1);
    });

    it("should not notify listeners when the value stays the same", () => {
      const mockListener = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ count: 0 });
      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should notify only the listener for the changed key", () => {
      const mockCountListener = jest.fn();
      const mockNameListener = jest.fn();
      store.subscribe("count", mockCountListener);
      store.subscribe("name", mockNameListener);
      store.setState({ count: 5 });
      expect(mockCountListener).toHaveBeenCalledWith(5);
      expect(mockNameListener).not.toHaveBeenCalled();
    });
  });

  describe("subscribe", () => {
    it("should call the listener with the new value on state change", () => {
      const mockListener = jest.fn();
      store.subscribe("name", mockListener);
      store.setName("changed");
      expect(mockListener).toHaveBeenCalledWith("changed");
    });

    it("should support multiple listeners for the same key", () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      store.subscribe("count", mockListener1);
      store.subscribe("count", mockListener2);
      store.increment();
      expect(mockListener1).toHaveBeenCalledWith(1);
      expect(mockListener2).toHaveBeenCalledWith(1);
    });

    it("should return an unsubscribe function that stops future notifications", () => {
      const mockListener = jest.fn();
      const unsubscribe = store.subscribe("count", mockListener);
      unsubscribe();
      store.increment();
      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should not affect other listeners when one is unsubscribed", () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      const unsubscribe1 = store.subscribe("count", mockListener1);
      store.subscribe("count", mockListener2);
      unsubscribe1();
      store.increment();
      expect(mockListener1).not.toHaveBeenCalled();
      expect(mockListener2).toHaveBeenCalledWith(1);
    });
  });
});
