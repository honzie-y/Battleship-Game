import { createContext, useState } from "react";

export const HistoryContext = createContext();

export const HistoryProvider = ({children}) => {

    const [nameMode, setNameMode] = useState('');

    const [hasHistory, setHasHistory] = useState(false);

    const storeLastData = (latestMyGrid, latestEnemyGrid, latestMyPos, latestEnemyPos, latestMyShipsCon, latestEnemyShipsCon ,lastTime, lastThrew) => {
        const latestData = {latestMyGrid, latestEnemyGrid, latestMyPos, latestEnemyPos, latestMyShipsCon, latestEnemyShipsCon ,lastTime, lastThrew};
        localStorage.setItem(nameMode, JSON.stringify(latestData));
    };

    const getLastData = (nameMode) => {
        return localStorage.getItem(nameMode);
    }

    const removeData = (nameMode) => {
        localStorage.removeItem(nameMode);
    }

    return (
        <HistoryContext.Provider value={{nameMode, setNameMode, hasHistory, setHasHistory,storeLastData, getLastData, removeData}}>
            {children}
        </HistoryContext.Provider>
    );
};