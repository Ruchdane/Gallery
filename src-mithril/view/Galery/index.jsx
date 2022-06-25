import m from 'mithril'
import Layout from '../../component/layout/layout'
import Thumbnail from '../../component/thumbnail'
import { routes } from '../../config/routes'
import { get_galeries } from '../../controller/galery'

import './galery.scss'

var galeries = []
const Galeries =  {
    oninit(vnode) {
        routes.settile()
       get_galeries(value =>  galeries = value)
    },
    view() {
        return <Layout>
            <div class="title"> Galery </div>
            <div class='filter'> 
                <input type="search" placeholder="Filter"/> 
            </div>
            <div class='grid'> {
                galeries.map(galery => m('.row',{onclick: _ => routes.open_galery(galery)},
			m(Thumbnail, { galery:galery}))
		)
            }
            </div>
        </Layout>
    }
}
export default Galeries
