const ShinyPokemon = (props: { urls: any }) => {
    const { urls } = props;
    const asArray = Object.entries(urls.data);
    asArray.splice(-2);
    const urlArr = asArray.map(sprite => sprite[1]);
    const filteredArr = urlArr.filter(sprite => sprite != null);

    return (
        <div className="grid grid-cols-4 py-10">
            {filteredArr.map((url: any) => {
                return <img key={Math.random()} className="w-[150px] l-[150px]" src={url} />
            })}
        </div>
    )
}

export default ShinyPokemon;