const seedRestaurant = [
  {
    name: "AppleBees",
    location: "Texas",
    cuisine: "FastFood",
  },
  {
    name: "LittleSheep",
    location: "Dallas",
    cuisine: "Hotpot",
  },
  {
    name: "Spice Grill",
    location: "Houston",
    cuisine: "Indian",
  },
];

const seedMenu = [
  {
    title: "Breakfast",
    restaurantId: 1,
  },
  {
    title: "Lunch",
    restaurantId: 2,
  },
  {
    title: "Dinner",
    restaurantId: 3,
  },
];

const seedItem = [
  {
    name: "bhindi masala",
    image: "someimage.jpg",
    price: 9.5,
    vegetarian: true,
  },
  {
    name: "egusi soup",
    image: "someimage.jpg",
    price: 10.5,
    vegetarian: false,
  },
  {
    name: "hamburger",
    image: "someimage.jpg",
    price: 6.5,
    vegetarian: false,
  },
];

module.exports = {
  seedRestaurant,
  seedMenu,
  seedItem,
};
