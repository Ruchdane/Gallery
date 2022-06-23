import m from 'mithril'
import Layout from '../../component/layout/layout'
import Thumbnail from '../../component/thumbnail'
import { routes } from '../../config/routes'
import { get_galeries } from '../../controller/galery'

import './galery.scss'

var galeries = [{
    path: '/home/ruchdane/Pictures/walpaper/a',
    size: 16,
    thumbnail: '/home/ruchdane/Pictures/walpaper/a/736461.png'
}, {
    path: '/home/ruchdane/Pictures/walpaper/b',
    size: 16,
    thumbnail: '/home/ruchdane/Pictures/walpaper/b/wallpaperflare.com_wallpaper.jpg'
}]
const Galeries = {
    oninit(vnode) {
        routes.settile()
        get_galeries(value => {
            galeries = value
            m.redraw()
        })

    },
    view() {
        return <Layout>
            <div class="title"> Galery </div>
            <div class='from'> FIlter </div>
            <div class='grid'> {
                galeries.map(galery => m(Thumbnail, { class:"row",galery: galery }))
            }
            </div>
        </Layout>
    }
}
export default Galeries