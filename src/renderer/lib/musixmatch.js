import axios from 'axios';
const baseUrl = 'https://api.musixmatch.com/ws/1.1/';
const apiKey = '3b6eae6006cfb04261fdb1c526f1d614';


export const trackLyrics = async trackId => {
    const {data:{message:{body:{lyrics:{lyrics_body}}}}} = await axios(`${baseUrl}track.lyrics.get?format=json&track_id=${trackId}&apikey=${apiKey}`);
    return lyrics_body;
}
export const trackSearch = async ({title, artist}) => {
    const {data:{message:{header:{available}, body:{track_list}}}} = await axios(`${baseUrl}track.search?format=json&q_track=${title}&q_artist=${artist}&quorum_factor=1&apikey=${apiKey}`);
    return {available, track_list};
};
