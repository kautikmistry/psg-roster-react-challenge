import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [players, setPlayers] = useState([]);
    const [playersActionIndex, setPlayersActionIndex] = useState([]);
    const [formationName, setFormationName] = useState("");

    const value = {
        players, setPlayers,
        playersActionIndex, setPlayersActionIndex,
        formationName, setFormationName
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}