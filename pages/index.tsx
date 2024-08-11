
import { GetServerSidePropsContext } from 'next';
import SpecialLayout from '../components/SpecialLayout';
import { IPokeItem, Iquery, IResponse } from '../types';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const data: IResponse = await res.json();
  return { props: { data: data.results, query } };
};

function PokemonsPage({ data, query }: { data: IPokeItem[], query: Iquery  }) {
  return <SpecialLayout items={data} query={query} ><p>Get info about pokemon</p></SpecialLayout>;
}

export default PokemonsPage;
