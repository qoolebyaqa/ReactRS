import { notFound } from "next/navigation";
import { getPokemonData } from "../../fnHelpers/serverHelpers";
import { IPokeItem, Iquery } from "../../types";
import Link from "next/link";
import { collectURL } from "../../fnHelpers/fnHelpers";

export async function generateStaticParams() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const pokemons = await res.json();

  return pokemons.results.map((pokemon: IPokeItem) => ({
    name: pokemon.name,
  }));
}

async function DescriptionCard({ params, searchParams }: { params: { name: string }, searchParams: Iquery }) {
  const pokemonData = await getPokemonData(params.name);
  if (!pokemonData) {
    notFound();
  }
  return (    
    <div
      style={{
        border: 'solid 1px',
        borderRadius: '15px',
        color: searchParams.theme === 'dark' ? 'black' : "#11e51f",
        background: searchParams.theme === 'dark' ? 'white' : "#f1f1f1",
        padding: '5px',
        marginTop: '210px',
        height: '400px',
        width: '300px',
      }}
    >
      <h3>Pokedeks description</h3>
      <p>
        Pokemon name: <strong>{params.name}</strong>
      </p>
      <img
        src={`https://img.pokemondb.net/artwork/${params.name}.jpg`}
        alt={params.name}
        style={{ width: '100px', height: '100px' }}
      />
      <div style={{ marginTop: '30px' }}>
        <Link href={collectURL({pathname: '/', query: {...searchParams}})}>
          <button>Close the Description</button>
        </Link>
      </div>
    </div>
  );
}

export default DescriptionCard;
