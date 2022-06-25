//FIXME UI not updating after galery media are loaded
//HOTFIX Reassign elements in single media view component
import m from 'mithril'
import { file_from_path } from '../../utility.js'
import { routes } from '../../config/routes'
import Layout from '../../component/layout/layout'
import Single from '../../component/galery/single'
import Button from '../../component/button/button.js';
import  All from '../../component/galery/all'
import { get_galery_media } from '../../controller/galery.js'
import './galery.scss'
const model = {
		galery:undefined,
		name:"",
		elements:[{src:""}],
		show_all:false,
		s_witch(){
				this.show_all=!this.show_all
		},
		init(attrs){
			this.galery = attrs.galery
			this.name = file_from_path(this.galery.path)
		},
		load(){
			get_galery_media(this.galery,elements=> { 
					model.elements = elements
					m.redraw()
			})
		},
		reset(){
			this.galery = {}
			this.name = undefined
			this.element = []
		}
}

var actions = [
		{
				perform: _ => routes.goto_base(),
				icon : 'arrow-return-left'
		},
		{
				perform: _ => model.s_witch(),
				get icon(){ 
						return model.show_all ? "window" : "window-stack"
				}
		},
]
function Galery(initialVnode){

	return {
		oninit(vnode){
			routes.settile(name)
			model.init(vnode.attrs)
			model.load()
		},
		onremvove(vnode){
			model.reset()
		},
		view(vnode) {
			return <Layout actions={actions} >
						<h1 class="title"> {name} </h1>
						{ model.elements.length > 0
								?model.show_all 
									?m(All ,{elements: model.elements})
									:m(Single ,{elements: model.elements})
								:m("","Loading")
						}
				</Layout>		
		}
	}
}
export default Galery;
