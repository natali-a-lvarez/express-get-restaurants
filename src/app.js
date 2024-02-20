const express = require("express");
const app = express();
const { Restaurant, Menu, Item } = require("../models/index");
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/restaurants", async (req, res, next) => {
  const restaurants = await Restaurant.findAll(
    { include: Menu },
    { include: [{ model: Menu, include: [{ model: Item }] }] }
  );
  res.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  res.json(restaurant);
});

app.post("/restaurants", async (req, res) => {
  const newRestaurant = await Restaurant.create(req.body);
  res.json(newRestaurant);
});

app.put("/restaurants/:id", async (req, res) => {
  const updatedRestaurant = await Restaurant.update(req.body, {
    where: { id: req.params.id },
  });
  res.json(updatedRestaurant);
});

app.delete("/restaurants/:id", async (req, res) => {
  const deletedRestaurant = await Restaurant.destroy({
    where: { id: req.params.id },
  });

  res.json(deletedRestaurant);
});

module.exports = app;
