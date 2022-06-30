import m from 'mithril'
import { Pagination, PaginationObject  } from "../../component/pagination/pagination";
import Layout,{  layout_tooltip_modifier } from '../../component/layout/layout'
import Thumbnail from '../../component/thumbnail'
import { routes } from '../../config/routes'
import { get_galeries,change_root, get_galery } from '../../controller/galery'

import './galery.scss'

var galeries = []
//HOTFIXE for reload bug
var actions = [,
    {
		icon:'arrow-clockwise',
        tooltip:'Reload',
        tooltip_modifier:layout_tooltip_modifier(),
		perform: _ => m.redraw()
},
    {
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
    root:{
        name:"",
        path: "",
        size: 0,
        thumbnail: "",
    },
    filter: "",
    /**
     * @type PaginationObject
     */
    pagination: new PaginationObject(0,0,16),
    value(){
        var filtred = galeries.filter(galery => galery.name.includes(this.filter))
        var begin = this.pagination.limit * this.pagination.index
        const possible_end = this.pagination.limit * (this.pagination.index + 1);
        var end = possible_end + 1 > filtred.length ? filtred.length - 1 : possible_end; 
        return filtred.slice(begin,end)
    },
    oninit(vnode) {
        // routes.settile(this.root.name)
        get_galery(value => { this.root = value })
       	get_galeries(value => {
               galeries = value 
               Galeries.pagination = new PaginationObject(galeries.length,0,16)
        })
    },
    view() {
        return <Layout 
        actions={actions}
        label={`${this.root.name}(${galeries.length})`}
        >
            <div class="title"> {this.root.name} </div>
            {/*TODO onchange or oninput which is better*/}
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
