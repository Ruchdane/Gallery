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

class GaleryIndexModel {
    constructor(galery, galeries) {
        this.root = galery;
        this.pagination = new PaginationObject(galeries.length, 0, 16);
        this.filter = "";
        this.galeries = galeries;
        this.value = [];
        this.updateValue();
    }

    get label() {
        return `${this.root.name}(${this.root.size})`;
    }

    get name() {
        return this.root.name;
    }

    setFilter(value) {
        this.filter = value;
        this.updateValue();
    }

    setPagination(value) {
        this.pagination = value;
        this.updateValue();
    }

    load() {
        getGalery((value) => {
            this.root = value;
            getGaleries((value) => {
                this.galeries = value;
                this.pagination = new PaginationObject(
                    this.galeries.length,
                    0,
                    16
                );
                this.updateValue();
            });
        });
    }

    updateValue() {
        const filtred = this.galeries.filter((galery) =>
            galery.name.includes(this.filter)
        );
        const begin = this.pagination.limit * this.pagination.index;
        const end = this.pagination.limit * (this.pagination.index + 1);
        this.value = filtred.slice(begin, end);
    }
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
        if (this.model === undefined)
            getGalery((galery) => {
                getGaleries((galeries) => {
                    Galeries.model = new GaleryIndexModel(galery, galeries);
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
                    onchange={(value) => model.setPagination(value)}
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
