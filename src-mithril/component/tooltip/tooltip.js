import m from "mithril";
import "./tooltip.scss";
import { createPopper } from "@popperjs/core";

export function setupTooltip(dom, modifier) {
    const tooltip = dom.querySelector(".tooltip");
    const popperInstance = createPopper(
        dom,
        tooltip,
        modifier === undefined ? {} : modifier
    );
    function show() {
        tooltip.setAttribute("data-show", "");
        popperInstance.update();
    }

    function hide() {
        tooltip.removeAttribute("data-show");
    }

    const showEvents = ["mouseenter", "focus"];
    const hideEvents = ["mouseleave", "blur"];

    showEvents.forEach((event) => {
        dom.addEventListener(event, show);
    });

    hideEvents.forEach((event) => {
        dom.addEventListener(event, hide);
    });
}

const Tooltip = {
    view(vnode) {
        return m(".tooltip", vnode.children, m(".arrow"));
    },
};
export default Tooltip;
