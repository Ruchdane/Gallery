import m from 'mithril'
import { file_from_path } from '../../utility.js'
import { Pagination, PaginationObject  } from "../../component/pagination/pagination";
import Layout,{  layout_tooltip_modifier } from '../../component/layout/layout'
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
    filter: "",
    /**
     * @type PaginationObject
     */
    pagination: new PaginationObject(0,0,16),
    value(){
        var filtred = galeries.filter(galery => file_from_path(galery.path).includes(this.filter))
        var begin = this.pagination.limit * this.pagination.index
        const possible_end = this.pagination.limit * (this.pagination.index + 1);
        var end = possible_end + 1 > filtred.length ? filtred.length - 1 : possible_end; 
        return filtred.slice(begin,end)
    },
    oninit(vnode) {
        routes.settile()
       	get_galeries(value =>  galeries = value)
    },
    view() {
        return <Layout 
        actions={actions}
        // TODO add label 
        // label={basedir}
        >
            <div class="title"> Galery </div>
            <div class='filter'> 
                <input type="search" placeholder="Filter" value={this.filter} onchange={(e)=> this.filter = e.target.value} /> 
            </div>
            <Pagination pagination={this.pagination} onchange={ value => this.pagination = value}/>
            <div>
                
            </div>
            <div class='grid'> 
            {
                this.value().map(galery => m('.row',{onclick: _ => routes.open_galery(galery)},
			m(Thumbnail, { galery:galery}))
		)
            }
            </div>
        </Layout>
    }
}
export default Galeries
