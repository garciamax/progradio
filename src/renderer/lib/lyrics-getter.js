import axios from 'axios';

export default async ({title, artist}) => {
    const {data} = await axios(`http://localhost:3000?track=${encodeURI(title)}&artist=${encodeURI(artist)}`);
    return data;
}
