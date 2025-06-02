import { ApiClient } from "./apiClient";

const baseUrl = "https://owl-writey.hemit.fr/api";

describe("External API Tests", () => {
    let apiClient: ApiClient;

    beforeAll(async () => {
        apiClient = new ApiClient(baseUrl);
    });
    
    it("should return 200 OK for the root endpoint", async () => {
        const response = await apiClient.get("/ping", "alice");
        expect(response.status).toBe(200);
    });

    it("should return 200 OK for /exercises", async () => {
        const response = await apiClient.get("/exercises","bob");
        expect(response.status).toBe(200);
    });

    it("should return 201 Created for the /novels POST endpoint", async () => {
        const response = await apiClient.post("/exercises","bob", { title: "azertyuiop", description: "azerty test" });
        expect(response.status).toBe(201);
    });

    it("should return 200 OK for the /novels GET endpoint", async () => {
        const response = await apiClient.get("/exercises","bob");
        expect(response.status).toBe(200);
    });

    it("should return 200 OK for the /novels DELETE endpoint", async () => {
        const response = await apiClient.delete("/novels","bob");
        expect(response.status).toBe(200);
    });

    

    it("should get the first novel by id after fetching the list", async () => {
        const listResponse = await apiClient.get("/novels", "alice");
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.data).toBeDefined();
        expect(Array.isArray(listResponse.body.data)).toBe(true);
        expect(listResponse.body.data.length).toBeGreaterThan(0);

        const firstNovelId = listResponse.body.data[0].id;

        const novelResponse = await apiClient.get(`/novels/${firstNovelId}`, "alice");
        expect(novelResponse.status).toBe(200);
        expect(novelResponse.body.id).toBe(firstNovelId);
    });

    it("should delete the first novel by id after fetching the list", async () => {
        const listResponse = await apiClient.get("/novels", "alice");
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.data).toBeDefined();
        expect(Array.isArray(listResponse.body.data)).toBe(true);
        expect(listResponse.body.data.length).toBeGreaterThan(0);

        const firstNovelId = listResponse.body.data[0].id;

        const novelResponse = await apiClient.delete(`/novels/${firstNovelId}`, "alice");
        expect(novelResponse.status).toBe(204);
    });
});
