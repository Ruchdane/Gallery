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

function galeryIndexModel(galery, galeries) {
    /**
     * @type GaleryObject
     */
    const root = galery;
    /**
     * @type PaginationObject
     */
    const pagination = new PaginationObject(galeries.length, 0, 16);

    const result = {
        filter: "",
        pagination,
        root,
        /**
         * @type Array<GaleryObject>
         */
        galeries,
        /**
         * @type Array<GaleryObject>
         */
        value: [],
        setFilter(value) {
            this.filter = value;
            this.update_value();
        },
        set_pagination(value) {
            this.pagination = value;
            this.update_value();
        },
        load() {
            getGalery((value) => {
                this.root = value;
                getGaleries((value) => {
                    this.model.galeries = value;
                    this.model.pagination = new PaginationObject(
                        this.model.galeries.length,
                        0,
                        16
                    );
                    this.model.update_value();
                });
            });
            getGaleries((value) => {
                this.model.galeries = value;
                this.model.pagination = new PaginationObject(
                    this.model.galeries.length,
                    0,
                    16
                );
                this.model.update_value();
            });
        },
        update_value() {
            const filtred = this.galeries.filter((galery) =>
                galery.name.includes(this.filter)
            );
            const begin = this.pagination.limit * this.pagination.index;
            const end = this.pagination.limit * (this.pagination.index + 1);
            this.value = filtred.slice(begin, end);
        },
        get label() {
            return `${this.root.name}(${this.root.size})`;
        },
        get name() {
            return this.root.name;
        },
    };
    result.update_value();
    return result;
}

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
                Galeries.model.load();
                m.redraw();
            });
        },
    },
];
const Galeries = {
    model: undefined,
    oninit() {
        if (model === undefined)
            getGalery((galery) => {
                getGaleries((galeries) => {
                    Galeries.model = galeryIndexModel(galery, galeries);
                    m.redraw();
                });
            });
    },
    view() {
        const model = Galeries.model;
        return model === undefined ? (
            <Layout actions={actions} label="Loading">
                <span> Loading </span>
            </Layout>
        ) : (
            <Layout actions={actions} label={model.label}>
                <div class="title"> {model.name} </div>
                {/* TODO onchange or oninput which is better */}
                <div class="filter">
                    <input
                        type="search"
                        placeholder="Filter"
                        value={model.filter}
                        onchange={(e) => {
                            model.setFilter(e.target.value);
                        }}
                    />
                </div>
                <Pagination
                    pagination={model.pagination}
                    onchange={model.set_pagination}
                />
                <div></div>
                <ul class="grid">
                    {model.value.map((galery, id) => {
                        return m(
                            "li",
                            m(
                                "article.row",
                                {
                                    id: `galery-${id + 1}`,
                                    onclick: (_) => routes.open_galery(galery),
                                },
                                m(Thumbnail, {
                                    galery,
                                })
                            )
                        );
                    })}
                </ul>
            </Layout>
        );
    },
};
export default Galeries;
