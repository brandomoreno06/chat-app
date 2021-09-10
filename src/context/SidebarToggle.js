import React, { createContext, useContext, useState} from 'react';


const SidebarContext = createContext();

export const SidebarContextProvider = ({ children }) => {

    const [sidebarDisplay, setSidebarDisplay] = useState(true);

    const toggleSidebar = () => {
        // const sidebar = document.querySelector(".sidebar_container");
        // sidebar.classList.toggle("sidebar_container--hide");
        // console.log("TEST>>>>>>>>>>>")
        setSidebarDisplay(!sidebarDisplay);
    }

    return(
        <SidebarContext.Provider value={[sidebarDisplay, toggleSidebar]} >
            {children}
        </SidebarContext.Provider>
    )
}

export const useSideBarcontext = () => useContext(SidebarContext);
