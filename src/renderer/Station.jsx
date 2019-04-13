import React,{useState} from 'react';
import {useStateValue} from "./StateProvider";

export default (props) => {
    const {station:{id, url}, selected, station} = props;
    const [{ meta }, dispatch] = useStateValue();
    const selectStation = () => {
        dispatch({
            type: 'setCurrentStation',
            station
        });
    }
    return <div onClick={selectStation}>
        {selected && "📻"}
        {id}
    </div>
}
