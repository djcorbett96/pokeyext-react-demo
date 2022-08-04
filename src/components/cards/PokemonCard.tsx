import { CardProps } from "@yext/search-ui-react";


const PokemonCard = ({ result }: CardProps) => (
    <div className="w-[200px] h-[180px] border rounded-md p-4 flex flex-col justify-end items-center bg-white hover:shadow-lg hover:bg-opacity-80 hover:cursor-pointer">
      <img className="w-4/6" src={result.rawData.pokemon_pokemonImageUrl as string} alt="pokemon-image" />
      <h1 className="text-lg capitalize">{result.name}</h1>
    </div>
  );

  export default PokemonCard;