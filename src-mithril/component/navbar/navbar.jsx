import m from "mithril";
import Button from "../button/button";
import "./navbar.scss";

const Navbar = {
    view(vnode) {
        return (
            <nav class="Navvbar">
                <div class="info">
                    <m.route.Link href="/galeries">
                        <img
                            src="favicon.svg"
                            width="38"
                            height="30"
                            alt="Galery"
                            loading="lazy"
                        />
                    </m.route.Link>
                    <span>{vnode.attrs.label || ""}</span>
                </div>
                {Array.isArray(vnode.attrs.actions)
                    ? m(
                          ".actions",
                          vnode.attrs.actions.map((action, id) => (
                              <Button
                                  type="button"
                                  key={id}
                                  tooltip_modifier={action.tooltip_modifier}
                                  tooltip={action.tooltip}
                                  class="secondary"
                                  onclick={action.perform}>
                                  <i class={`bi bi-${action.icon}`} />
                              </Button>
                          ))
                      )
                    : null}
            </nav>
        );
    },
};
export default Navbar;
