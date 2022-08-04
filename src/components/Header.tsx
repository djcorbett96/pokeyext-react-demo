import { useSearchActions, provideHeadless, useSearchState } from "@yext/search-headless-react";
import { FocusedItemData, DropdownItem, SearchBar } from "@yext/search-ui-react";
import classnames from "classnames";

const Header = () => {

    const answersActions = useSearchActions();

    const entityPreviewSearcher = provideHeadless({
        apiKey:"b083465ee2ad3d23460e150c6a297f7f",
        experienceKey:"pokemon",
        locale: "en",
        headlessId: "entity-preview-searcher"
    })

    const renderPokemonPreview = (pokemon: any) => {
       return ( 
            <div className="flex flex-col items-center cursor-pointer hover:bg-gray-100 ">
                <img className="w-32" src={pokemon.pokemon_pokemonImageUrl}></img>
                <div className="pl-3 capitalize">{pokemon.name}</div>
            </div>
       )
    }

    const renderEntityPreviews = (
        autocompleteLoading: boolean,
        verticalKeyToResults: any,
        dropdownItemProps: {
            onClick: (value: string, _index: number, itemData?: FocusedItemData) => void;
        }
    ): JSX.Element | null => {
        const pokemonResults = verticalKeyToResults["pokemon"]?.results.map((result: { rawData: any; }) => result.rawData) as any;
    
        return pokemonResults ? (
        <div
                    // laying out the product previews in a grid
            className={classnames("grid grid-cols-4 px-8", {
                    // fading the results if they're loading
            "opacity-50": autocompleteLoading,
            })}
        >
            {pokemonResults.map((result:any, i:any) => (
                        // DropdownItem is imported from @yext/search-ui-react
            <DropdownItem
                value={result.name ?? i.toString()}
                key={result.name}
                            // when an item is clicked, it will change the URL
                onClick={() => {
                    answersActions.setQuery(result.name);
                    answersActions.executeVerticalQuery();
                }}
            >
                {renderPokemonPreview(result)}
            </DropdownItem>
            ))}
        </div>
        ) : null;
    };
    
    return (
        <>
            <div className="w-full bg-black bg-opacity-70 flex flex-col justify-center items-center relative py-5">
                <div className="flex justify-center items-center mb-5">
                    <h1 className="mr-5 font-bold text-3xl text-white">Pokeyext</h1>
                    <img src="https://pictures.abebooks.com/isbn/9781695667099-us.jpg" className="w-auto h-10"></img>
                </div>
                <SearchBar
                    customCssClasses={{ searchBarContainer: "w-1/3" }}
                    visualAutocompleteConfig={{
                        entityPreviewSearcher: entityPreviewSearcher,
                        includedVerticals: ["pokemon"],
                        renderEntityPreviews: renderEntityPreviews,
                        universalLimit: { pokemon: 4 },
                        entityPreviewsDebouncingTime: 300,
                    }}
                />
            </div>
        </>
    )
}

export default Header;