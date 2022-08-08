import m from "mithril";
import { random, rounded } from "../../utility.js";
import "./navigation.scss";
import { Button, Tooltip } from "construct-ui";

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
                <nav className="navigation">
                    <div>
                        <Tooltip
                            content="First"
                            trigger={
                                <Button
                                    class="outlined primary"
                                    aria-label="First"
                                    disabled={navigation.firstDisabled()}
                                    onclick={(_) => {
                                        navigation.first();
                                        update(navigation);
                                    }}>
                                    {"<<"}
                                </Button>
                            }
                        />

                        <Tooltip
                            content="Previous"
                            trigger={
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
                            }
                        />

                        <Tooltip
                            content="Random"
                            trigger={
                                <Button
                                    class="outlined primary"
                                    aria-label="Random"
                                    onclick={(_) => {
                                        navigation.random();
                                        update(navigation);
                                    }}>
                                    <i className="bi bi-dice-5-fill" />
                                </Button>
                            }
                        />
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
                        <Tooltip
                            content="Random"
                            trigger={
                                <Button
                                    class="outlined primary"
                                    aria-label="Random"
                                    onclick={(_) => {
                                        navigation.random();
                                        update(navigation);
                                    }}>
                                    <i className="bi bi-dice-5-fill" />
                                </Button>
                            }
                        />
                        <Tooltip
                            content="Next"
                            trigger={
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
                            }
                        />

                        <Tooltip
                            content="Last"
                            trigger={
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
                            }
                        />
                    </div>
                </nav>
            );
        },
    };
}
export default Navigation;
