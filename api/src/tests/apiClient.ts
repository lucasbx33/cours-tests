import request from "supertest";
import dotenv from "dotenv";

dotenv.config();

type UserKey = "alice" | "bob" | "anonymous";

export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;
  private currentUser: UserKey | null = null;

  private credentials: Record<UserKey, { email: string; password: string }> = {
    alice: { email: process.env.LOGIN_EMAIL_ALICE!, password: process.env.LOGIN_PASSWORD_ALICE! },
    bob: { email: process.env.LOGIN_EMAIL_BOB!, password: process.env.LOGIN_PASSWORD_BOB! },
    anonymous: { email: "", password: "" },
  };

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  async loginAs(user: UserKey): Promise<void> {
    if (user === this.currentUser && this.token) {
      return;
    }

    if (user === "anonymous") {
      this.token = null;
      this.currentUser = user;
      return;
    }

    const creds = this.credentials[user];
    if (!creds) {
      throw new Error(`Unknown user ${user}`);
    }

    const googleUrl = "https://www.googleapis.com/";
    const response = await request(googleUrl)
      .post("/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDpdYdgvEwYIKGr_rmh37DipL3djZ-KF3k")
      .send({
        email: creds.email,
        password: creds.password,
        returnSecureToken: true,
      });

    if (response.status !== 200) {
      throw new Error(`Authentication failed for user ${user}`);
    }
    this.token = response.body.idToken;
    this.currentUser = user;
  }

  async get(path: string, user: UserKey = "anonymous") {
    await this.loginAs(user);
    if (!this.token) throw new Error("Not authenticated.");
    return request(this.baseUrl).get(path).set("Authorization", `Bearer ${this.token}`);
  }

  async post(path: string, user: UserKey = "anonymous", body: any) {
    await this.loginAs(user);
    if (!this.token) throw new Error("Not authenticated.");
    return request(this.baseUrl).post(path).set("Authorization", `Bearer ${this.token}`).send(body);
  }

  async delete(path: string, user: UserKey = "anonymous") {
    await this.loginAs(user);
    if (!this.token) throw new Error("Not authenticated.");
    return request(this.baseUrl).delete(path).set("Authorization", `Bearer ${this.token}`);
  }
}
