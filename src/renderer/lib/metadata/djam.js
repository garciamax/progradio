const axios = require('axios');
export const get = async () => {
    const bodyFormData = new FormData();
    bodyFormData.set('origin', 'website');
    const {data:{tracks}} = await axios({
        method: 'post',
        url: 'https://www.djamradio.com/actions/infos.php',
        data: bodyFormData,
        config: { headers: {'Content-Type': 'multipart/form-data' }},
    });
    const {artist, title, timetoplay} = tracks[0];
    const nextUpdate = (parseInt(timetoplay) + 2 ) * 1000; //taking extra 2 secs

    return {artist, title, album:null, nextUpdate}
};
