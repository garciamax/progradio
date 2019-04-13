const axios = require('axios');

const _getArtwork = results => {
    try{
        const {artworkUrl100} = results[0];
        return artworkUrl100 ? artworkUrl100.replace(/100x100/, '500x500') : null;
    }catch (e) {
        return null;
    }
};
const prepareForSearch = value => value.replace(/\s/g,'+');

export const getArtwork = async query => {
    const {data:{results}} = await axios(`https://itunes.apple.com/search?term=${prepareForSearch(query)}`);
    return  _getArtwork(results);
}
