const axios = require('axios');
export const get = async () => {
    const {data:{songs}} = await axios('https://somafm.com/songs/groovesalad.json');
    const {title, artist, album} = songs[0];
    return {title, artist, album};
};
