import m from "mithril";
import Button from "../button/button.js";
import { random, rounded } from "../../utility.js";
import "./navigation.scss";
// Tooltip bug
// eslint-disable-next-line no-unused-vars
const tooltipModifier = {
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

export function NavigationObject(index, limit, edit = false) {
    return {
        index,
        limit,
        edit,
        first() {
            this.index = 0;
        },

        firstDisabled() {
            return this.index === 0;
        },

        next() {
            this.index = rounded(this.index + 1, this.limit);
        },

        random() {
            random(0, this.limit - 1);
        },

        toogleEdit() {
            this.edit = !this.edit;
        },

        prev() {
            this.index = rounded(this.index - 1, this.limit);
        },

        lastDisabled() {
            return this.index === this.limit - 1;
        },

        last() {
            this.index = this.limit - 1;
        },
    };
}

function Navigation(initialVnode) {
    return {
        view(vnode) {
            /**
             * @type NavigationObject
             */
            const navigation = vnode.attrs.navigation;
            const update = vnode.attrs.update;
            return (
                <div className="navigation">
                    <div>
                        <Button
                            class="outlined primary"
                            // FIXME Tooltip bug on navigation
                            aria-label="First"
                            disabled={navigation.firstDisabled()}
                            onclick={(_) => {
                                navigation.first();
                                update(navigation);
                            }}>
                            {"<<"}
                        </Button>
                        <Button
                            class="outlined primary"
                            aria-label="Previous"
                            disabled={navigation.firstDisabled()}
                            onclick={(_) => {
                                navigation.prev();
                                update(navigation);
                            }}>
                            {"<"}
                        </Button>
                        <Button
                            class="outlined primary"
                            aria-label="Random"
                            onclick={(_) => {
                                navigation.random();
                                update(navigation);
                            }}>
                            <i className="bi bi-dice-5-fill" />
                        </Button>
                    </div>
                    {!navigation.edit
                        ? m(
                              "label",
                              {
                                  onclick: (_) => {
                                      navigation.toogleEdit();
                                      update(navigation);
                                  },
                              },
                              `${navigation.index + 1} / ${navigation.limit}`
                          )
                        : m(
                              "input",
                              {
                                  type: "number",
                                  min: 1,
                                  max: navigation.limit,
                                  onchange: (e) => {
                                      navigation.index = e.target.value - 1;
                                      navigation.toogleEdit();
                                      update(navigation);
                                  },
                              },
                              navigation.index + 1
                          )}
                    <div>
                        <Button
                            class="outlined primary"
                            aria-label="Random"
                            onclick={(_) => {
                                navigation.random();
                                update(navigation);
                            }}>
                            <i className="bi bi-dice-5-fill" />
                        </Button>
                        <Button
                            class="outlined primary"
                            aria-label="Next"
                            disabled={navigation.lastDisabled()}
                            onclick={(_) => {
                                navigation.next();
                                update(navigation);
                            }}>
                            {">"}
                        </Button>
                        <Button
                            class="outlined primary"
                            aria-label="Last"
                            disabled={navigation.lastDisabled()}
                            onclick={(_) => {
                                navigation.last();
                                update(navigation);
                            }}>
                            {">>"}
                        </Button>
                    </div>
                </div>
            );
        },
    };
}
export default Navigation;
