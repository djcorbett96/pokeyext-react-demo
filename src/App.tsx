import { VerticalResults } from "@yext/search-ui-react";
import PokemonCard from "./components/cards/PokemonCard";
import Header from "./components/Header";
import TileFacet from "./components/TileFacet";
import "./App.css";

function App() {
  return (
    <div className="bg-black flex flex-col justify-top items-center h-screen relative before:bg-[url('assets/grassbackground.jpeg')] before:bg-top before:bg-cover before:absolute before:inset-0 before:-top-1 before:opacity-50">
      <Header />
      <div className="px-4 py-6 w-full relative flex justify-center overflow-scroll">
        <TileFacet fieldId="pokemon_types" displayName="Type" />
        <div>
          <VerticalResults CardComponent={PokemonCard} customCssClasses={{ verticalResultsContainer: "grid gap-4 grid-cols-5 pb-6"}} />
        </div>
      </div>
    </div>
  );
}

export default App;