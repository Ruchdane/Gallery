import m from "mithril";
import Galeries from "../view/Galery";
import Galery from "../view/Galery/galery.jsx";

function View(title, url, view) {
    return {
        title,
        url,
        view,
    };
}
export const routes = {
    views: [
        View("Galeries", "/galeries", Galeries),
        View("Galeries", "/galery", Galery),
    ],
    setup() {
        const routes = {};
        this.views.forEach((view) => {
            routes[view.url] = view.view;
        });
        m.route(document.body, this.views[0].url, routes);
    },
    open_galery(galery) {
        m.route.set("/galery", {
            galery,
        });
    },
    goto_base() {
        m.route.set("/galeries");
    },
    settile(title) {
        if (title !== undefined) {
            document.title = title;
            return;
        }
        const url = m.route.get();
        for (const view of this.views) {
            if (view.url === url) {
                document.title = title === undefined ? view.title : title;
                return;
            }
        }
    },
};
