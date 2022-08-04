import { useSearchActions, useSearchState, NumberRangeValue, Matcher } from "@yext/search-headless-react";
import classNames from "classnames";

interface TileFacetProps {
  fieldId: string;
  displayName?: string;
}

const TileFacet = ({ fieldId, displayName }: TileFacetProps) => {
  const imageMappings = {
    water: "assets/watertype.png",
    flying: "assets/flyingtype.png",
    normal: "assets/normaltype.png",
    grass: "assets/grasstype.png",
    psychic: "assets/psychichtype.png",
    bug: "assets/bugtype.png",
    rock: "assets/rocktype.png",
    electric: "assets/electrictype.png",
    fire: "assets/firetype.png",
    poison: "assets/poinsontype.png",
    ground: "assets/groundtype.png",
    dragon: "assets/dragontype.png",
    fighting: "assets/fightingtype.png",
    dark: "assets/darktype.png",
    steel: "assets/steeltype.png",
    ghost: "assets/ghosttype.png",
    fairy: "assets/fairtytype.png",
    ice: "assets/icetype.png"
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
      <span className="text-neutral-dark text-sm font-medium text-left mb-2">{displayName ?? facet.displayName}</span>
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