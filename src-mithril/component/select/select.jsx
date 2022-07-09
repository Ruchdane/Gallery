import m from "mithril";
import "./select.scss";
const Select = {
    // TODO Add tootltip
    view(vnode) {
        if (!Array.isArray(vnode.attrs.options)) return null;
        return (
            <select
                class={vnode.attrs.class}
                name={vnode.attrs.name}
                id={vnode.attrs.id}
                onchange={(e) => {
                    if (typeof vnode.attrs.onchange === "function") {
                        vnode.attrs.onchange(e.target.value);
                    }
                }}>
                {vnode.attrs.options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    },
};
export default Select;
