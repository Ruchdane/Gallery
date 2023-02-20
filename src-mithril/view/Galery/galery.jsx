// FIXME UI not updating after galery media are loaded
// HACK Reassign elements in single media view component
import m from "mithril";
import { routes } from "../../config/routes";

import Layout, { layoutTooltipModifier } from "../../component/layout/layout";
import Single from "../../component/galery/single";
import All from "../../component/galery/all";
import { getGaleryMedia } from "../../controller/galery.js";
import "./galery.scss";
const model = {
    galery: undefined,
    name: "",
    elements: [],
    show_all: false,
    s_witch() {
        this.show_all = !this.show_all;
    },
    init(attrs) {
        this.galery = attrs.galery;
        this.name = this.galery.name;
    },
    load() {
        getGaleryMedia(this.galery, (elements) => {
            model.elements = elements;
            m.redraw();
        });
    },
    reset() {
        this.galery = {};
        this.name = undefined;
        this.element = [];
    },
};

const actions = [
    {
        perform: (_) => routes.goto_base(),
        icon: "arrow-return-left",
        tooltip: "return",
        tooltip_modifier: layoutTooltipModifier(),
    },
    {
        perform: (_) => model.s_witch(),
        get tooltip() {
            return model.show_all ? "Single" : "Multiple";
        },
        tooltip_modifier: layoutTooltipModifier(),
        get icon() {
            return model.show_all ? "window" : "window-stack";
        },
    },
];
function Galery(initialVnode) {
    return {
        oninit(vnode) {
            routes.settile(model.name);
            model.init(vnode.attrs);
            model.load();
        },
        onremvove(vnode) {
            model.reset();
        },
        view(vnode) {
            return (
                <Layout actions={actions} label={model.name}>
                    <h1 className="title"> {model.name} </h1>
                    {model.elements.length > 0
                        ? model.show_all
                            ? m(All, {
                                  elements: model.elements,
                              })
                            : m(Single, {
                                  index: 0,
                                  medias: model.elements,
                              })
                        : m("", "Loading")}
                </Layout>
            );
        },
    };
}
export default Galery;
