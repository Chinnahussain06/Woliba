import axios from "axios";

class ApiMgr {
  constructor() {
    const isDevelopment = typeof window !== "undefined" && (
      window.location.hostname === "localhost" ||
      window.location.hostname.includes("run.app") ||
      window.location.hostname.includes("aistudio")
    );
    this.api = axios.create({
      baseURL: isDevelopment ? "/v1" : "https://dev.api.woliba.io/v1",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Verify Company
  async verifyCompany(payload) {
    const response = await this.api.post(
      "/verify-by-company-name-and-password",
      payload
    );

    return response.data;
  }

  // Save User Details & Send OTP
  async saveUserDetails(payload) {
    const response = await this.api.post(
      "/save-user-details-and-send-otp",
      payload
    );

    return response.data;
  }

  // Verify OTP
  async verifyOtp(payload) {
    const response = await this.api.post(
      "/verify-otp-for-user-registration",
      payload
    );

    return response.data;
  }

  // Get Wellbeing Pillars
  async getWellbeingPillars(languageId = 1) {
    const response = await this.api.get(
      `/get-wellbeing-pillars/${languageId}`
    );

    return response.data;
  }

  // View Wellness Interests
  async viewWellnessInterest() {
    const response = await this.api.get(
      "/viewWellnessInterest"
    );

    return response.data;
  }

  // Complete Registration
  async userRegistration(payload) {
    const response = await this.api.post(
      "/user-registration",
      payload
    );

    return response.data;
  }

  // Send OTP
  async sendOtp(payload) {
    const response = await this.api.post(
      "/send-otp-for-user-registration",
      payload
    );

    return response.data;
  }
}

const apiMgr = new ApiMgr();

export default apiMgr;
