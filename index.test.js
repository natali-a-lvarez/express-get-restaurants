const request = require("supertest");
const app = require("./src/app");
const syncSeed = require("./seed");
const Restaurant = require("./models/Restaurant");
let restQuantity;

const { describe, test, expect, beforeAll } = require("@jest/globals");

// // clear db before tests
beforeAll(async () => {
  await syncSeed();
  const restaurants = await Restaurant.findAll({});
  restQuantity = restaurants.length;
});

describe("tests for /restaurants", () => {
  test("GET /restaurants returns 200 status code", async () => {
    const response = await request(app).get("/restaurants");

    expect(response.statusCode).toBe(200);
  });

  test("GET /restaurants returns correct length of restaurants", async () => {
    const response = await request(app).get("/restaurants");

    expect(response.body).toHaveLength(restQuantity);
  });

  test("GET /restaurants returns array restaurants", async () => {
    const response = await request(app).get("/restaurants");
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toHaveProperty("cuisine");
  });

  test("GET /restaurants returns correct restaurants data", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.body).toContainEqual(
      expect.objectContaining({
        name: "AppleBees",
      })
    );
  });

  test("GET /restaurants/:id returns correct restaurant", async () => {
    const response = await request(app).get("/restaurants/1");

    expect(response.body).toEqual(
      expect.objectContaining({
        name: "AppleBees",
      })
    );
  });

  test("POST /restaurants", async () => {
    const response = await request(app).post("/restaurants").send({
      name: "Rico Tropical Grill",
      location: "Kennesaw",
      cuisine: "Tropical",
    });

    const actual = await request(app).get("/restaurants");

    expect(actual.body).toContainEqual(
      expect.objectContaining({ name: "Rico Tropical Grill" })
    );
  });

  test("PUT /restaurants/:id", async () => {
    const response = await request(app)
      .put("/restaurants/1")
      .send({ name: "Starbucks", location: "Kennesaw", cuisine: "Cafe" });

    const restaurant = await Restaurant.findByPk(1);

    expect(restaurant.name).toBe("Starbucks");
  });

  test("DELETE /restaurants/:id", async () => {
    const response = await request(app).delete("/restaurants/1");

    const restaurants = await Restaurant.findAll({});
    expect(restaurants).toHaveLength(restQuantity);
    expect(restaurants[0].id).not.toEqual(1);
  });
});
