import React, { createContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const handleLogOut = () => {
        setUser(null); 
      };

    return (
        <UserContext.Provider value={{ user, setUser, handleLogOut }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;