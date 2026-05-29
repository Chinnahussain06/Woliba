import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "../api/api";

import {
  verifyCompany,
  fetchPillars,
  submitRegistration,
} from "./registrationThunks";

vi.mock("../api/api", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("registrationThunks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("verifyCompany", () => {
    it("should return data on success", async () => {
      const mockResponse = {
        data: {
          status: "success",
        },
      };

      api.post.mockResolvedValue(mockResponse);

      const dispatch = vi.fn();
      const thunk = verifyCompany({
        company_name: "Woliba",
        password: "1234",
      });

      const result = await thunk(dispatch, vi.fn(), undefined);

      expect(result.payload).toEqual(mockResponse.data);

      expect(api.post).toHaveBeenCalledWith(
        "/verify-by-company-name-and-password",
        {
          company_name: "Woliba",
          password: "1234",
        },
      );
    });

    it("should reject when payload missing", async () => {
      const dispatch = vi.fn();

      const result = await verifyCompany()(dispatch, vi.fn(), undefined);

      expect(result.payload).toBe("Payload is required");
    });
  });

  describe("fetchPillars", () => {
    it("should fetch pillars successfully", async () => {
      const mockResponse = {
        data: {
          data: [{ id: 1, name: "Mental" }],
        },
      };

      api.get.mockResolvedValue(mockResponse);

      const dispatch = vi.fn();

      const result = await fetchPillars(1)(dispatch, vi.fn(), undefined);

      expect(result.payload).toEqual([{ id: 1, name: "Mental" }]);

      expect(api.get).toHaveBeenCalledWith("/get-wellbeing-pillars/1");
    });
  });

  describe("submitRegistration", () => {
    it("should reject failed registration", async () => {
      api.post.mockResolvedValue({
        data: {
          status: "failed",
          error: {
            message: "Registration failed",
          },
        },
      });

      const dispatch = vi.fn();

      const result = await submitRegistration({
        name: "Chinna",
      })(dispatch, vi.fn(), undefined);

      expect(result.payload).toBe("Registration failed");
    });
  });
});
