import "@testing-library/jest-dom";
import preloadAll from "jest-next-dynamic";

Object.defineProperty(window, "location", {
  value: {
    assign: jest.fn(),
  },
  writable: true,
});

beforeAll(async () => {
  await preloadAll();
});
