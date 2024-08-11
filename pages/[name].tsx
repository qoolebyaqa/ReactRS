import { IPokeItem, Iquery, IResponse } from "../types";
import SpecialLayout from "../components/SpecialLayout";
import CloseDescriptionBtn from "../components/CloseDescriptionBtn";
import { GetServerSidePropsContext } from "next";
import ErrorPage from "./404";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query, params } = context;
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const pokemons: IResponse = await res.json();
  if (!pokemons.results.find(pokemon => pokemon.name === params?.name)) {
    return {
      props: {
        name: 'error'
      }
    };
  }
  return { props: { query, name: params?.name, pokemons: pokemons.results } };
};

function DescriptionCard({ query, name, pokemons }: {query: Iquery , name: string, pokemons: IPokeItem[]}) {
  if(name === 'error') {
    return <ErrorPage/>
  }
  return (    
    <SpecialLayout items={pokemons} query={query}>
    <div
      style={{
        border: 'solid 1px',
        borderRadius: '15px',
        color: query.theme === 'dark' ? 'black' : "#11e51f",
        background: query.theme === 'dark' ? 'white' : "#f1f1f1",
        padding: '5px',
        marginTop: '210px',
        height: '400px',
        width: '300px',
      }}
    >
      <h3>Pokedeks description</h3>
      <p>
        Pokemon name: <strong>{name}</strong>
      </p>
      <img
        src={`https://img.pokemondb.net/artwork/${name}.jpg`}
        alt={name}
        style={{ width: '100px', height: '100px' }}
      />
      <div style={{ marginTop: '30px' }}>
        <CloseDescriptionBtn />
      </div>
    </div></SpecialLayout>
  );
}

export default DescriptionCard;
