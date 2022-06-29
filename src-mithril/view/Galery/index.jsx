import m from 'mithril'
import Layouti,{  layout_tooltip_modifier } from '../../component/layout/layout'
import Thumbnail from '../../component/thumbnail'
import { routes } from '../../config/routes'
import { get_galeries,change_root } from '../../controller/galery'

import './galery.scss'

var galeries = []
var actions = [{
		icon:'folder',
        tooltip:'Change folder',
        tooltip_modifier:layout_tooltip_modifier(),
		perform: () => {
				change_root(
					_ => get_galeries(value => {
							galeries = value
							m.redraw()
					})
				)
		}
}
]


const Galeries =  {
    oninit(vnode) {
        routes.settile()
       	get_galeries(value =>  galeries = value)
    },
    view() {
        return <Layout actions={actions}>
            <div class="title"> Galery </div>
            <div class='filter'> 
				{/*TODO implement filter*/}
                <input type="search" placeholder="Filter"/> 
            </div>
				{/*TODO Add Pagination maximum 4 row so limit = 4*4*/}
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
