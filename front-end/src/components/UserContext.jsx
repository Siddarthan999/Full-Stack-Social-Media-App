import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [globalUserName, setGlobalUserName] = useState('');

    return (
        <UserContext.Provider value={{ globalUserName, setGlobalUserName, }}>
            {children}
        </UserContext.Provider>
    );
};
