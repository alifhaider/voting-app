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
    },
    {
      name: "7up",
    },
    {
      name: "Pepsi",
    },
  ];
}
