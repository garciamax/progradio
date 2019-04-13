const axios = require('axios');

export const get = async () => {
    const {data} = await axios('http://198.255.34.130:8512/7.html');
    const content = data.match(/<body>(.*)<\/body>/)[1];
    const parts = content.split(',');
    if (parts.length < 7 || !parts[6]) {
        console.log(parts)
    }else{
        const moreParts = parts[6].split(' - ');
        let artist, title, album;
        if(moreParts.length === 3) {
            [artist, album, title] = moreParts;
        }else{
            [artist, title] = moreParts;
        }
        return {artist, title, album}
    }
};
