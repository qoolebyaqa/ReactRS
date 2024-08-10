/* import { GetStaticPaths, GetStaticProps } from "next"; */
import { IResponse } from "../types";
export async function getPokemonData(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
  if (!res.ok) {
    return null;
  }
  const result: Promise<IResponse> = await res.json()
  return (await result).results.find(val => val.name === name);
}