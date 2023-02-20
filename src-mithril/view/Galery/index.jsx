import m from "mithril";
import {
    Pagination,
    PaginationObject,
} from "../../component/pagination/pagination";
import Layout, { layoutTooltipModifier } from "../../component/layout/layout";
import Thumbnail from "../../component/thumbnail";
import { routes } from "../../config/routes";
import { getGaleries, changeRoot, getGalery } from "../../controller/galery";

import "./galery.scss";
const model = {
    filter: "",
    /**
     * @type PaginationObject
     */
    pagination: new PaginationObject(0, 0, 16),
    root: {
        name: "",
        path: "",
        size: 0,
        thumbnail: "",
    },
    galeries: [],
    value: [],
    set_filter(e) {
        model.filter = e.target.value;
        model.update_value();
    },
    set_pagination(value) {
        model.pagination = value;
        model.update_value();
    },
    load() {
        // routes.settile(this.root.name)
        getGalery((value) => {
            model.root = value;
        });
        getGaleries((value) => {
            model.galeries = value;
            model.pagination = new PaginationObject(
                model.galeries.length,
                0,
                16
            );
            model.update_value();
        });
    },
    update_value() {
        const filtred = this.galeries.filter((galery) =>
            galery.name.includes(this.filter)
        );
        const begin = this.pagination.limit * this.pagination.index;
        const possibleEnd = this.pagination.limit * (this.pagination.index + 1);
        let end =
            possibleEnd + 1 > filtred.length ? filtred.length - 1 : possibleEnd;
        if (begin === end) end = end + 1;
        this.value = filtred.slice(begin, end);
    },
};
// HACK for reload bug
const actions = [
    {
        icon: "arrow-clockwise",
        tooltip: "Reload",
        tooltip_modifier: layoutTooltipModifier(),
        perform: (_) => m.redraw(),
    },
    {
        icon: "folder",
        tooltip: "Change folder",
        tooltip_modifier: layoutTooltipModifier(),
        perform: () => {
            changeRoot((_) => {
                model.load();
                m.redraw();
            });
        },
    },
];

const Galeries = {
    oninit: model.load,
    onupdate: model.load,
    view() {
        return (
            <Layout
                actions={actions}
                label={`${model.root.name}(${model.galeries.length})`}>
                <div class="title"> {model.root.name} </div>
                {/* TODO onchange or oninput which is better */}
                <div class="filter">
                    <input
                        type="search"
                        placeholder="Filter"
                        value={model.filter}
                        onchange={model.set_filter}
                    />
                </div>
                <Pagination
                    pagination={model.pagination}
                    onchange={model.set_pagination}
                />
                <div></div>
                <div class="grid">
                    {model.value.map((galery) =>
                        m(
                            ".row",
                            {
                                onclick: (_) => routes.open_galery(galery),
                            },
                            m(Thumbnail, {
                                galery,
                            })
                        )
                    )}
                </div>
            </Layout>
        );
    },
};
export default Galeries;
