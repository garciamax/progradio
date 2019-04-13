import React,{useState, useEffect} from 'react';
import {stations} from "./stations";
import Station from "./Station";
import styled, {css} from 'styled-components';
import Lyrics from "./Lyrics";
import {useStateValue} from "./StateProvider";
import Player from "./Player";
import {getArtwork} from "./lib/itunes";

const backgroundImage = url => css`
  background: url('${url}') center center;
  background-size: cover;
  //filter: blur(8px);
  //transform: scale(1.2);
  //transform-origin: center;
`

const Cover = styled.div`
  position: absolute;
  height: 100%;  
  width: 100%;
  z-index: -1;
  transition: background-image 0.2s ease-in-out;
  //opacity: 0.6;
  ${({bg}) => bg ? backgroundImage(bg) : 'background-color: black'};
`;
const Stations = styled.div`
  color: white;
  padding: 20px;
  font-family: 'Montserrat', sans-serif;
`;
const RadioContainer = styled.div`
  background-color: rgba(0,0,0,0.6);
  height: 100%;
  color: white;
`
const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TitlesContainer = styled.div`
  color: white;
  font-family: 'Montserrat', sans-serif;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 1em;
  text-align: right;
`
const TitleBase = styled.div`
`;
const Title =  styled(TitleBase)`
  font-size: 3em;
  font-weight: bold;
`;
const Artist =  styled(TitleBase)`
  font-size: 2em;
  padding-bottom: 0.2em;
`;
const Album =  styled(TitleBase)``;
export default () => {
    const [loadedBg, setLoadedBg] = useState(null);
    const [{ meta, currentStation }, dispatch] = useStateValue();
    useEffect(()=>{
        (async()=>{
            let {artwork, title, artist} = meta;
            if(!artwork && title && artist) {
                artwork = await getArtwork(`${title} ${artist}`);
            }
            if(artwork){
                const img = new Image();
                img.onload = () => {
                    setLoadedBg(artwork);
                };
                img.src = artwork;
            }else{
                setLoadedBg(null)
            }
        })();
    },[meta]);

    return <>
        <Cover bg={loadedBg}/>
        <RadioContainer>
            <TopSection>
            <Stations>{stations.map(station=>{
                return <Station key={station.id} selected={currentStation.id === station.id} station={station} />
            })}</Stations>
            <Player />
            </TopSection>
            <Lyrics meta={meta} />
            <TitlesContainer>
                <Title>{meta.title}</Title>
                <Artist>{meta.artist}</Artist>
                <Album>{meta.album}</Album>
            </TitlesContainer>
        </RadioContainer>
    </>
}
