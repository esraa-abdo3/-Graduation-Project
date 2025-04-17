import { createContext, useEffect, useState } from "react";


export const WindowSize = createContext(null);

export default function Window({ children }) {
    const [windowsize, setwindowsize] = useState(window.innerWidth);
    

    useEffect(() => {
        function getsize() {
            setwindowsize(window.innerWidth);
        }

        window.addEventListener("resize", getsize);

        return () => {
            window.removeEventListener("resize", getsize);
        };
    }, []);

    return (
        <WindowSize.Provider value={{ windowsize }}>
            {children}
        </WindowSize.Provider>
    );
}
