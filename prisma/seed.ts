import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getDrinks().map((drink) => {
      return db.drink.create({ data: drink });
    })
  );
}

seed();

function getDrinks() {
  return [
    {
      name: "cocacola",
      imageUrl: "./images/cocacola.jpg",
    },
    {
      name: "7up",
      imageUrl: "./images/7up.webp",
    },
    {
      name: "Pepsi",
      imageUrl: "./images/pepsi.jpeg",
    },
    {
      name: "speed",
      imageUrl: "./images/speed.jpeg",
    },
  ];
}
