export async function getPokemons() {
  const data = await (await fetch ('https://pokeapi.co/api/v2/pokemon?limit=150')).json();
  return data.results; 
}