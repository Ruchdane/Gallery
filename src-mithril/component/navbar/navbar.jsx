import { Button, Tooltip } from "construct-ui";
import m from "mithril";
import "./navbar.scss";

const Navbar = {
    view(vnode) {
        return (
            <nav class="navbar">
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
                              <Tooltip
                                  key={"tooltip-" + id}
                                  content={action.tooltip}
                                  trigger={
                                      <Button
                                          key={id}
                                          type="button"
                                          class="secondary"
                                          label={
                                              <i
                                                  class={`bi bi-${action.icon}`}
                                              />
                                          }
                                          aria-label={action.tooltip}
                                          onclick={action.perform}
                                      />
                                  }
                              />
                          ))
                      )
                    : null}
            </nav>
        );
    },
};
export default Navbar;
