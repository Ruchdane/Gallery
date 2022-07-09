import m from "mithril";
import "./pagination.scss";
import Select from "../select/select";
import Button from "../button/button";

const tooltipModifier = {
    placement: "top",
    modifiers: [
        {
            name: "offset",
            options: {
                offset: [0, 8],
            },
        },
        {
            name: "arrow",
            options: {
                padding: ({ popper, reference, placement }) =>
                    popper.width / reference.width,
            },
        },
    ],
};

class PaginationObject {
    /**
     *
     * @param {number} size la taille de la donne
     * @param {number} index la page actuelle
     * @param {number} limit le nombre d'element sur une page
     * @returns PaginationObject
     */
    static limits = [16, 32, 64, 100];
    constructor(size, index, limit) {
        const result = {
            _index: 0,
            _size: 0,
            _limit: 0,
            get index() {
                return this._index;
            },
            set index(value) {
                this._index =
                    value * this._limit >= this.size
                        ? this.count() - 1
                        : (this._index = value);
            },
            _update_index() {
                if (this._index * this._limit >= this.size)
                    this._index = this.count() - 1;
            },
            get size() {
                return this._size;
            },
            set size(value) {
                this._size = value;
                this._update_index();
            },
            get limit() {
                return this._limit;
            },
            set limit(value) {
                this._limit = value;
                this._update_index();
            },

            count() {
                return Math.ceil(this.size / this._limit);
            },
            isCurrent(i) {
                return this.index === i;
            },

            prevDisabled() {
                return this.index === 0;
            },
            nextDisabled() {
                return this.index + 1 === this.count();
            },
        };
        result.size = size;
        result.index = index;
        result.limit = limit;
        return result;
    }
}

/**
 * @argument PaginationObject setter
 * @argument PaginationObject getter
 * @returns Pagination
 */
function Pagination(initVnode) {
    /**
     * @type PaginationObject
     */

    return {
        view(vnode) {
            const pagination = vnode.attrs.pagination;

            return pagination === undefined ? null : (
                <nav aria-label="Page navigation" class="pagination">
                    <ul>
                        <li>
                            <Button
                                disabled={pagination.prevDisabled()}
                                tooltip="prev"
                                tooltip_modifier={tooltipModifier}
                                class="outlined primary"
                                aria-label="Previous"
                                onclick={(_) => {
                                    pagination.index = pagination.index - 1;
                                    vnode.attrs.onchange(pagination);
                                }}>
                                <span aria-hidden="true">&laquo;</span>
                            </Button>
                        </li>
                        {Array.from(new Array(pagination.count()), (_, i) => (
                            <li>
                                <Button
                                    class={`${
                                        pagination.isCurrent(i) ? "active" : ""
                                    } outlined primary`}
                                    onclick={(_) => {
                                        pagination.index = i;
                                        vnode.attrs.onchange(pagination);
                                    }}>
                                    {i + 1}
                                </Button>
                            </li>
                        ))}
                        <li>
                            <Button
                                disabled={pagination.nextDisabled()}
                                tooltip="next"
                                tooltip_modifier={tooltipModifier}
                                class="outlined primary"
                                aria-label="Next"
                                onclick={(_) => {
                                    pagination.index = pagination.index + 1;
                                    vnode.attrs.onchange(pagination);
                                }}>
                                <span aria-hidden="true">&raquo;</span>
                            </Button>
                        </li>
                    </ul>
                    <div>
                        <Select
                            options={PaginationObject.limits}
                            onchange={(value) => {
                                pagination.limit = value;
                                vnode.attrs.onchange(pagination);
                            }}
                        />
                    </div>
                </nav>
            );
        },
    };
}
export { Pagination, PaginationObject };
