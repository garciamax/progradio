import React from 'react';
import { hot } from 'react-hot-loader/root'
import Radio from "./Radio";
import {StateProvider} from "./StateProvider";

const initialState = {
    meta: {},
    currentStation: {}
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'setMeta':
            if(JSON.stringify(state.meta ) === JSON.stringify(action.meta)){
                return state;
            }else{
                return {
                    ...state,
                    meta: action.meta
                };
            }

        case 'setCurrentStation':
            return {
                ...state,
                currentStation: action.station
            };

        default:
            return state;
    }
};
const App = () => {
    return <StateProvider initialState={initialState} reducer={reducer}>
        <Radio />
    </StateProvider>;
};
export default hot(App)
