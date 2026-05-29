import { describe, it, expect } from "vitest";
import reducer, { togglePillar, clearError } from "./registrationSlice";

describe("registrationSlice", () => {
  it("should not allow more than 3 pillars", () => {
    const state = { selectedPillars: [1, 2, 3] };

    const result = reducer(state, togglePillar(4));

    expect(result.selectedPillars).toHaveLength(3);
  });

  it("should clear error", () => {
    const state = { error: "Something went wrong" };

    const result = reducer(state, clearError());

    expect(result.error).toBeNull();
  });
});
