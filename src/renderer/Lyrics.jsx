import React,{useState, useEffect} from 'react';
import lyricsGetter from './lib/lyrics-getter';
import styled from 'styled-components';
import Loader from './Loader';
import {shell} from 'electron';

const LyricsContainer = styled.div`
  position: relative;
  color: white;
  text-align: center;
  font-weight: bold;
  text-shadow: 1px 1px 2px black;
  font-size: 1.5em;  
  transition: .3s ease-out;
  transform: ${({isOpen}) => isOpen ? 'translateX(0%)' : 'translateX(-100%)'};  
`;
const CloseButton = styled.a`
  position: absolute;
  cursor: pointer;
  ${({isOpen}) => isOpen 
    ? 'left: 20px' 
    : 'right: -44px'
  };
`;
const LyricsTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: center;
  cursor: pointer;
`
const LyricsBody = styled.pre`
  height: 50vh;
  overflow-y: scroll;
  overflow-x: hidden;
  a{
    cursor: pointer;
    color: #00cdff;
    white-space: initial;
    display: flex;
    text-align: left;
  }
`
export default ({meta}) => {
    const {title, artist} = meta;
    const [lyrics, setLyrics] = useState('');
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const getLyrics = async () => {
        setLoading(true);
        const {lyrics:_lyrics, error, links} = await lyricsGetter({title, artist});
        if(error) {
            setLyrics('');

        }else{
            setLyrics(_lyrics);
        }
        setLinks(links);
        setLoading(false);
    }

    useEffect( ()=>{
        (async()=>{
            if(title && artist){
                await getLyrics();
            }
        })();
    },[title, artist]);
    const onClick = async () => {
        await getLyrics();
    };
    const openExternal = (link) => () => {
        shell.openExternal(link)
    }
    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return <LyricsContainer isOpen={isOpen}>
        <CloseButton isOpen={isOpen} onClick={toggle}>{isOpen ? '⨉' : '🗒'}</CloseButton>
        <LyricsTitle>
            <span onClick={onClick}>Lyrics</span>&nbsp;
            {/*<a onClick={openExternal(`http://google.com/search?q=${encodeURIComponent(`${title} ${artist} lyrics`)}`)}>↗️</a>*/}
            {loading && <Loader />}
        </LyricsTitle>
        <LyricsBody>
            {lyrics}
            <ul>
                {links.map((link, index) => {
                    return <li key={`${Date.now()}+${index}`}><a onClick={openExternal(link.href)}>{link.text}</a></li>
                })}
            </ul>
        </LyricsBody>
    </LyricsContainer>
}
