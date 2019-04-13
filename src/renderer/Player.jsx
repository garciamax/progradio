import React,{useState, useEffect, useRef} from 'react';
import {useStateValue} from "./StateProvider";
import Loader from "./Loader";
import styled from 'styled-components';
import metadataFactory from "./lib/metadata";

const Player = styled.div`
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  font-size: 3em;
  padding-right: 1em;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
`;
const PlayerTime = styled.div`
  font-size: 0.5em;
`;
export default () => {
    const [{ currentStation }, dispatch] = useStateValue();
    const [waiting, setWaiting] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [playing, setPlaying] = useState(false);

    const stream = useRef(new Audio());
    const playingListener = () => {
        setPlaying(true);
    };
    const canplayListener = () => {
        setWaiting(false);
        setPlaying(true);
    };
    const waitingListener = () => {
        setPlaying(false);
        setWaiting(true)
    };
    const addZeroIfBelowTen = number => {
        return number > 9 ? number : "0" + number;
    };
    const timeupdateListener = () => {
        const time = stream.current.currentTime;
        const minutes = Math.floor(time / 60);
        const seconds = Math.round(time - minutes * 60);
        setCurrentTime(`${addZeroIfBelowTen(minutes)}:${addZeroIfBelowTen(seconds)}`);
    };
    const playListener = () => {
        setPlaying(true);
    };
    const pauseListener = () => {
        setPlaying(false);
    };

    useEffect(()=>{
        let timeoutID;
        (async()=>{
            try{
                if(!currentStation.id) return;
                const metadataFetcher = await metadataFactory(currentStation.id);
                const update = async () => {
                    clearTimeout(timeoutID);
                    const meta = await metadataFetcher.get();
                    const nextUpdate = meta.nextUpdate || 10000;
                    timeoutID = setTimeout(update, nextUpdate);
                    dispatch({
                        type: 'setMeta',
                        meta
                    });
                };
                await update();
            }catch (e) {
                console.log(e.stack)
            }
        })();
        return () => {
            clearTimeout(timeoutID);
        }
    }, [currentStation]);

    useEffect(()=>{
        const {url} = currentStation;
        if(!url) return;
        stream.current.addEventListener('playing', playingListener);
        stream.current.addEventListener('play', playListener);
        stream.current.addEventListener('pause', pauseListener);
        stream.current.addEventListener('canplay', canplayListener);
        stream.current.addEventListener('waiting', waitingListener);
        stream.current.addEventListener('timeupdate', timeupdateListener);

        stream.current.src = url;
        stream.current.play().catch(e => {console.log(e)});

        return () => {
            stream.current.pause();
            stream.current.removeEventListener('playing', playingListener);
            stream.current.removeEventListener('play', playListener);
            stream.current.removeEventListener('pause', pauseListener);
            stream.current.removeEventListener('canplay', canplayListener);
            stream.current.removeEventListener('waiting', waitingListener);
            stream.current.removeEventListener('timeupdate', timeupdateListener);
        }

    },[currentStation]);
    const play = () => {
        stream.current.src = currentStation.url;
        stream.current.play().catch(e => {console.log(e)});
    };
    const pause = () => {
        setPlaying(false);
        stream.current.pause();
        stream.current.src = "";
        stream.current.load();
    };
    return <Player>
        {waiting ? <Loader /> : <>
            {playing ? <a onClick={pause}>Pause</a> : <a onClick={play}>Play</a> }
            <PlayerTime>{currentTime}</PlayerTime>
        </>}
    </Player>;
}
