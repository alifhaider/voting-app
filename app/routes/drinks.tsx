import type { Drink } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

type LoaderData = { drinks: Array<Drink> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    drinks: await db.drink.findMany(),
  };
  return json(data);
};

export default function Drinks() {
  const { drinks } = useLoaderData<LoaderData>();
  return (
    <div>
      <ul>
        {drinks.map((drink) => (
          <li key={drink.id}>{drink.name}</li>
        ))}
      </ul>
    </div>
  );
}
