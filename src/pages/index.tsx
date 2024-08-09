
import SpecialLayout from '../components/SpecialLayout';
import { IResponse } from '../types';

export const getServerSideProps = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const data: IResponse = await res.json();
  return { props: { data } };
};

function pokemonsPage({ data }: { data: IResponse }) {
  return <SpecialLayout items={data.results}><p>Get info about pokemon</p></SpecialLayout>;
}

export default pokemonsPage;
