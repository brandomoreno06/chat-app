export const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar__container");
    if(sidebar?.classList.contains("sidebar__container--hide")) {
        sidebar?.classList.remove("sidebar__container--hide");
    }
}
