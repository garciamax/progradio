import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import Loader from './Loader';
import {shell, ipcRenderer} from 'electron';

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
const LyricsBody = styled.div`
  font-family: 'Montserrat', sans-serif;
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
  p > span {
    font-size: 0.7em;
  }
`
export default ({meta}) => {
    const {title, artist} = meta;
    const [lyrics, setLyrics] = useState({});
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const getLyrics = () => {
        setLoading(true);
        ipcRenderer.send('getLyrics', JSON.stringify({title, artist}))
    }
    useEffect(()=>{
        ipcRenderer.on('lyrics', (event, message) => {
            setLoading(false);
            // setLinks(links);
            setLyrics(message);

            // console.log(message);
        });
        return () => {
            ipcRenderer.removeAllListeners(['lyrics'])
        }
    });
    useEffect( ()=>{
        if(title && artist){
            getLyrics();
        }
    },[title, artist]);
    const onClick = async () => {
        getLyrics();
    };
    const openExternal = (link) => () => {
        shell.openExternal(link)
    }
    const toggle = () => {
        setIsOpen(!isOpen)
    };

    const {artist:artistL = '', title:titleL = '', searchResults = [], credits = '', paragraphs = []} = lyrics;

    return <LyricsContainer isOpen={isOpen}>
        <CloseButton isOpen={isOpen} onClick={toggle}>{isOpen ? '⨉' : '🗒'}</CloseButton>
        <LyricsTitle>
            <span onClick={onClick}>Lyrics</span>&nbsp;
            {/*<a onClick={openExternal(`http://google.com/search?q=${encodeURIComponent(`${title} ${artist} lyrics`)}`)}>↗️</a>*/}
            {loading && <Loader />}
        </LyricsTitle>
        <LyricsBody>
            <h3>{artistL}</h3>
            <h4>{titleL}</h4>
            {paragraphs.map((paragraph, index) => {
                if(!paragraph) return null;
                return <p key={`p_${index}`}>
                    {(paragraph.lines && paragraph.lines.length > 0) && paragraph.lines.map((line,index) => {
                        return <React.Fragment  key={`li_${index}`}><span>{line}</span><br /></React.Fragment>
                    })}
                </p>
            })}
            <p>{credits}</p>
            {searchResults.map((searchResult, index) => {
                if(!searchResult) return null;
                const {title, link} = searchResult;
                return <div key={`p_${index}`}>
                    <a onClick={openExternal(link)}>{title}</a>
                </div>
            })}
            <ul>
                {links.map((link, index) => {
                    return <li key={`${Date.now()}+${index}`}><a onClick={openExternal(link.href)}>{link.text}</a></li>
                })}
            </ul>
        </LyricsBody>
    </LyricsContainer>
}
