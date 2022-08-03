import { useSearchActions, useSearchState, NumberRangeValue, Matcher } from "@yext/search-headless-react";
import classNames from "classnames";

interface TileFacetProps {
  fieldId: string;
  displayName?: string;
}

const TileFacet = ({ fieldId, displayName }: TileFacetProps) => {
  const imageMappings = {
    water: "/src/assets/watertype.png",
    flying: "/src/assets/flyingtype.png",
    normal: "/src/assets/normaltype.png",
    grass: "/src/assets/grasstype.png",
    psychic: "/src/assets/psychichtype.png",
    bug: "/src/assets/bugtype.png",
    rock: "/src/assets/rocktype.png",
    electric: "/src/assets/electrictype.png",
    fire: "/src/assets/firetype.png",
    poison: "/src/assets/poinsontype.png",
    ground: "/src/assets/groundtype.png",
    dragon: "/src/assets/dragontype.png",
    fighting: "/src/assets/fightingtype.png",
    dark: "/src/assets/darktype.png",
    steel: "/src/assets/steeltype.png",
    ghost: "/src/assets/ghosttype.png",
    fairy: "/src/assets/fairtytype.png",
    ice: "/src/assets/icetype.png"
  }
  
  const answersActions = useSearchActions();
  const facet = useSearchState((state) =>
    state.filters.facets?.find((f) => f.fieldId === fieldId)
  );

  const handleFacetClick = (
    value: string | number | boolean | NumberRangeValue,
    selected: boolean
  ) => {
    answersActions.setFacetOption(
      fieldId,
      { matcher: Matcher.Equals, value },
      selected
    );
    answersActions.executeVerticalQuery();
  };

  // component returns null if the facet isn't found in the search state or has no options for a partiaular set of results
  return facet && facet.options.length > 0 ? (
    <div className="w-fit max-w-md p-4 rounded-md bg-white h-fit mr-10 flex flex-col justify-center items-center">
      <span className="font-bold mb-2">{displayName ?? facet.displayName}</span>
      <div className="flex justify-center flex-wrap p-2">
        {facet.options.map((o, i) => (
          <div
						key={`${fieldId}_${i}`}
            className={classNames("p-1 m-2 flex flex-col justify-center items-center border rounded-md border-transparent hover:cursor-pointer hover:bg-slate-300",
              {
                "bg-slate-300": o.selected,
                "bg-white": !o.selected,
              }
            )}
            onClick={() => handleFacetClick(o.value, !o.selected)}
          >
            {/* <div className="w-full h-full text-sm flex flex-col justify-center items-center"> */}
							{/* Each facet option contains a display name and count */}
              <img src={imageMappings[o.displayName as keyof typeof imageMappings]} className="w-12 h-12" alt="type-picture" />
              <span className="mt-1 capitalize">{o.displayName}</span>
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default TileFacet;