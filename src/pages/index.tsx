
import { GetServerSidePropsContext } from 'next';
import SpecialLayout from '../components/SpecialLayout';
import { Iquery, IResponse } from '../types';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const data: IResponse = await res.json();
  return { props: { data, query } };
};

function pokemonsPage({ data, query }: { data: IResponse, query: Iquery  }) {
  return <SpecialLayout items={data.results} query={query} ><p>Get info about pokemon</p></SpecialLayout>;
}

export default pokemonsPage;
