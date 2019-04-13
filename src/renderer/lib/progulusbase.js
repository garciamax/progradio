const axios = require('axios');
import {getArtwork} from "./itunes";

export default type => {
    return async () => {
        const {data:{currentSong}} = await axios(`https://www.progulus.com/${type}/currentsong.json.php`);
        const {title, artist, album, picture, starttime, duration} = currentSong;
        const end = parseInt(starttime)*1000 + parseInt(duration);
        const nextUpdate = end - Date.now();
        const artwork =`http://www.progulus.com/pictures/${picture.replace(/\s/g,'%20')}`;
        return  {title, artist, album, artwork, nextUpdate};
    }
}
