import { TemplateStore, templateStore } from "@/stores/templateStore";

describe("TemplateStore", () => {
  let store: TemplateStore;

  beforeEach(() => {
    store = new TemplateStore({ counter: 0 });
  });

  describe("initial state", () => {
    it("should initialize with a counter of 0", () => {
      expect(store.get("counter")).toBe(0);
    });
  });

  describe("addCounter", () => {
    it("should increase the counter by the given value", () => {
      store.addCounter(3);
      expect(store.get("counter")).toBe(3);
    });

    it("should accumulate multiple additions", () => {
      store.addCounter(2);
      store.addCounter(5);
      expect(store.get("counter")).toBe(7);
    });

    it("should increase by 1 when called with 1", () => {
      store.addCounter(1);
      expect(store.get("counter")).toBe(1);
    });
  });

  describe("subtractCounter", () => {
    it("should decrease the counter by the given value", () => {
      store.addCounter(10);
      store.subtractCounter(4);
      expect(store.get("counter")).toBe(6);
    });

    it("should allow the counter to go negative", () => {
      store.subtractCounter(5);
      expect(store.get("counter")).toBe(-5);
    });

    it("should accumulate multiple subtractions", () => {
      store.subtractCounter(2);
      store.subtractCounter(3);
      expect(store.get("counter")).toBe(-5);
    });
  });

  describe("restartCounter", () => {
    it("should reset the counter to 0", () => {
      store.addCounter(10);
      store.restartCounter();
      expect(store.get("counter")).toBe(0);
    });

    it("should reset a negative counter to 0", () => {
      store.subtractCounter(7);
      store.restartCounter();
      expect(store.get("counter")).toBe(0);
    });
  });

  describe("cleanup", () => {
    it("should reset the counter to 0", () => {
      store.addCounter(7);
      store.cleanup();
      expect(store.get("counter")).toBe(0);
    });
  });

  describe("templateStore singleton", () => {
    afterEach(() => {
      templateStore.restartCounter();
    });

    it("should start with a counter of 0", () => {
      expect(templateStore.get("counter")).toBe(0);
    });

    it("should update the counter when addCounter is called", () => {
      templateStore.addCounter(5);
      expect(templateStore.get("counter")).toBe(5);
    });

    it("should reset the counter after cleanup", () => {
      templateStore.addCounter(3);
      templateStore.cleanup();
      expect(templateStore.get("counter")).toBe(0);
    });
  });
});
