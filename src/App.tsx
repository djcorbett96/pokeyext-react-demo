import { Pagination, VerticalResults } from "@yext/search-ui-react";
import PokemonCard from "./components/cards/PokemonCard";
import Header from "./components/Header";
import TileFacet from "./components/TileFacet";
import "./App.css";
import Modal from 'react-modal';
import React, { useEffect } from "react";
import ShinyPokemon from "./components/ShinyPokemon";
import { useSearchState } from "@yext/search-headless-react";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
};

function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const queryRulesData = useSearchState((s) => s.queryRules.actions);

  const pokemonData = queryRulesData.find(
    (item) => item.key === "pokemonData"
  ) as any | undefined;

  useEffect(() => {
    if (pokemonData) {
      openModal();
    }
  },[queryRulesData]);

  return (
    <>
      <div>
        <Modal 
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="flex flex-col justify-center items-center">
            <h3 className="font-semibold">Showing All Sprites</h3>
            {pokemonData && <ShinyPokemon urls={pokemonData}/>}
            <button className="rounded-md px-8 text-white py-1 bg-[#CC0000]" onClick={closeModal}>Close</button>
          </div>
        </Modal>
      </div>
      <div className="bg-black flex flex-col justify-top items-center h-screen relative before:bg-[url('assets/grassbackground.jpeg')] before:bg-top before:bg-cover before:absolute before:inset-0 before:-top-1 before:opacity-50">
        <Header />
        <div className="px-4 py-6 w-full relative flex justify-center overflow-scroll mb-4">
          <div>
            <TileFacet fieldId="pokemon_types" displayName="Type" />
          </div>
          <div className="flex flex-col items-center">
            <VerticalResults CardComponent={PokemonCard} customCssClasses={{ verticalResultsContainer: "grid gap-4 grid-cols-5 pb-6"}} />
            <Pagination customCssClasses={{ paginationContainer: "bg-white w-min rounded-md" }}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

function rgba(arg0: number, arg1: number, arg2: number, arg3: number) {
  throw new Error("Function not implemented.");
}
