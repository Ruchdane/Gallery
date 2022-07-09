import m from "mithril";
import "./button.scss";
import Tooltip, { setupTooltip } from "../tooltip/tooltip";
const Button = {
    oncreate(vnode) {
        if (vnode.attrs.tooltip && !vnode.attrs.disabled) {
            setupTooltip(vnode.dom, vnode.attrs.tooltip_modifier);
        }
    },
    view(vnode) {
        return m(
            "",
            vnode.attrs.tooltip && !vnode.attrs.disabled
                ? m(Tooltip, vnode.attrs.tooltip)
                : null,
            m(
                "button" + (vnode.attrs.disabled ? ".disabled" : ""),
                {
                    disabled: vnode.attrs.disabled || false,
                    onclick: vnode.attrs.disabled
                        ? undefined
                        : vnode.attrs.onclick,
                    class: vnode.attrs.class || "",
                    type: vnode.attrs.type || "button",
                    "aria-label":
                        vnode.attrs["aria-label"] ||
                        vnode.attrs.tooltip ||
                        "button",
                },
                vnode.children
            )
        );
    },
};

export default Button;
