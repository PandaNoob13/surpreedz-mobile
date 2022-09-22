import { createContext } from "react";

export const DependencyContext = createContext({});

export const DependencyProvider = ({children, services}) => {
    return(
        <DependencyContext.Provider value={services}>
            {children}
        </DependencyContext.Provider>
    )
}
