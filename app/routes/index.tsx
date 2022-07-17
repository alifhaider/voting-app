import { db } from "~/utils/db.server";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Drink } from "@prisma/client";
import { useState } from "react";

type LoaderData = { drinks: Array<Drink> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    drinks: await db.drink.findMany(),
  };
  return json(data);
};

export default function Index() {
  let { drinks } = useLoaderData<LoaderData>();
  let [filteredDrinks, setFilteredDrinks] = useState<Array<Drink>>(drinks);

  let handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let value = e.target.value;
    setFilteredDrinks(
      drinks.filter((drink) =>
        drink.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="flex flex-col justify-center h-full max-h-screen ">
      <h1 className="text-5xl font-semibold text-emerald-300 mb-8 mx-auto">
        Vote Your Favorite Drink
      </h1>
      <Form
        className="flex items-center w-full md:w-1/2 mx-auto justify-between border-slate-700 border-solid border-2 rounded-lg mb-4"
        method="post"
      >
        <input
          className="p-4 w-full bg-transparent flex-1"
          type="text"
          placeholder="Search for your favorite drink.."
          onChange={(e) => handleChange(e)}
        />
      </Form>
      <ul className="w-full max-w-7xl mx-auto border-slate-400 border-2 rounded-md px-6 py-3 grid grid-cols-3 gap-3 justify-center">
        {filteredDrinks?.map((drink) => (
          <li
            className="w-full border-slate-500 border-2 p-2 flex flex-col items-center rounded-sm max-w-1/3 cursor-pointer hover:bg-emerald-500 hover:border-emerald-500"
            key={drink.id}
          >
            <p>{drink.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
