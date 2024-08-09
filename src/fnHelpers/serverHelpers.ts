import { GetStaticPaths, GetStaticProps } from "next";
import { IPokeItem } from "../types";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const pokemons = await res.json();
  const paths = pokemons.results.map((pokemon: IPokeItem) => ({
    params: { name: pokemon.name.toString() },
  }));

  return {
    paths,
    fallback: false, 
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const pokemons = await res.json();
  const { name } = params as { name: string };

  return {
    props: {
      name: name.toString(),
      pokemons: pokemons.results
    },
  };
};