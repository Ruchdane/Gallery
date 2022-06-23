import m from 'mithril'
import Galeries from '../view/Galery'
import Galery from '../view/Galery/galery'

function View(title, url, view) {
    return {
        title: title,
        url: url,
        view: view
    }
}
export const routes = {
    views: [
        View('Galeries', '/galery', Galeries),
        View('Galeries', '/galery/:id', Galery)
    ],
    setup() {
        var routes = {}
        this.views.forEach(view => {
            routes[view.url] = view.view
        });
        m.route(document.body, this.views[0].url, routes)
    },
    settile(title) {
        var url = m.route.get()
        for (const view of this.views) {
            if (view.url == url) {
                document.title = title == undefined ? view.title : title;
                return
            }
        }
    }
}