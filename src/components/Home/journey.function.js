import { TOP_JOURNEY, FOTO_CATEGORY } from '../../constants';
// TODO: need to make it efficient. make back end call compatible with front end
export const showJourney = (journies, selectedIndex, showCategory) => {
    if(!journies) {
        return null;
    }
    const feed = journies.feed;
    let result = null;
    if (!(feed && feed.default && feed.default.length)) {
        return null;
    }
    switch (selectedIndex) {
        case TOP_JOURNEY:
            if (showCategory === FOTO_CATEGORY.FOOD) {
                result = {
                    id: feed.top.id,
                    user: feed.top.user,
                    fotos: feed.top.combinedFood.length >= 10 ? feed.top.combinedFood.slice(0, 11) : feed.top.combinedFood
                }
                break;
            }
            result = {
                id: feed.top.id,
                user: feed.top.user,
                fotos: feed.top.combined.length >= 10 ? feed.top.combined.slice(0, 11) : feed.top.combined
            }
            break;
        default:
            result = feed.default[selectedIndex]
            break;
    }
    return createSeperateFeed(result);
}

const createSeperateFeed = (result) => {
    const feed = [];
    console.log('result ', result);
    const set = new Set(result.fotos.map(item => item.locationId.global))
    set.forEach(item => feed.push(result.fotos.filter(foto => foto.locationId.global === item)))
    const data = feed.map(fotos => ({
        ...result, fotos: fotos
    }))
    console.log('data ', data);
    return data;
}