import { getStaticPaths, getStaticProps } from "../fnHelpers/serverHelpers";
import { IPokeItem } from "../types";
import SpecialLayout from "../components/SpecialLayout";
import { useRouter } from 'next/router';



function DescriptionCard({ name, pokemons }: {name: string, pokemons: IPokeItem[]}) {
  const router = useRouter()

  return (    
    <SpecialLayout items={pokemons}>
    <div
      style={{
        border: 'solid 1px',
        borderRadius: '15px',
        color: router.query.theme === 'dark' ? 'black' : "#11e51f",
        background: router.query.theme === 'dark' ? 'white' : "#f1f1f1",
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
        <button onClick={() => {
          const updatedURL = {
            pathname: '/',
            query: {...router.query}
          }
          delete updatedURL.query.name
          router.push(updatedURL)}} >Close the Description</button>
      </div>
    </div></SpecialLayout>
  );
}

export { getStaticPaths, getStaticProps }
export default DescriptionCard;
