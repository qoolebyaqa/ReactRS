import { useContext } from 'react';
import { useParams } from 'react-router';
import { Link, useSearchParams } from 'react-router-dom';
import { MyThemeContext } from '../App';

function DescriptionCard() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('page');
  const {theme} = useContext(MyThemeContext);
  

  return (
    
    <div
      style={{
        border: 'solid 1px',
        borderRadius: '15px',
        color: !theme ? 'black' : "#11e51f",
        background: !theme ? 'white' : "#f1f1f1",
        padding: '5px',
        marginTop: '210px',
        height: '400px',
        width: '300px',
      }}
    >
      <h3>Pokedeks description</h3>
      <p>
        Pokemon name: <strong>{params.namePokemon}</strong>
      </p>
      <p>Life coefficient {Math.floor(Math.random() * 100)} </p>
      <img
        src={`https://img.pokemondb.net/artwork/${params.namePokemon}.jpg`}
        alt={params.namePokemon}
        style={{ width: '100px', height: '100px' }}
      />
      <div style={{ marginTop: '30px' }}>
        <Link to={`/ReactRS/?page=${searchQuery}`}>Close the Description</Link>
      </div>
    </div>
  );
}

export default DescriptionCard;
