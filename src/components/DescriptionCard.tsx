import { useParams } from "react-router";
import { Link } from "react-router-dom";

function DescriptionCard() {
  const params = useParams();
  return ( <div style={{border: "solid 1px", borderRadius: "15px", color: "black", background: "white", padding: "5px", marginTop: "210px", height: "400px", width: "300px"}}>
      <h3>Pokedeks description</h3>
      <p>Pokemon name: <strong>{params.namePokemon}</strong></p>
      <p>Power coefficient {Math.floor(Math.random()*100)} </p>
      <img src={`https://img.pokemondb.net/artwork/${params.namePokemon}.jpg`} alt={params.namePokemon} style={{width: "100px", height: "100px"}}/>
      <div style={{marginTop: "30px"}}><Link to='/ReactRS/'>Close the Description</Link></div>
      
  </div> );
}

export default DescriptionCard;