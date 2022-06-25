import m from 'mithril'
import { file_from_path } from '../../utility.js'
import { routes } from '../../config/routes'
import Layout from '../../component/layout/layout'
import Single from '../../component/galery/single'
import Button from '../../component/button/button.js';
import  All from '../../component/galery/all'
import { get_galery_element} from '../../controller/galery.js'
import './galery.scss'
function Galery(initialVnode){
	var galery = initialVnode.attrs.galery
	var galery_elements = []
	var name = file_from_path(galery.path)
	var show_all = true
	var actions = [
			{
					perform: _ => routes.goto_base(),
					icon : 'arrow-return-left'
			},
			{
					perform: _ => show_all=!show_all,
					get icon(){ 
							return show_all ? "window" : "window-stack"
					}
			},
	]
	return {
		oninit(vnode){
			routes.settile(name)
			get_galery_element(galery.path,value => galery_elements =  value)
		},
		view(vnode) {
			return <Layout actions={actions} >
						<h1 class="title"> {name} </h1>
						{ show_all
								?<All elements={galery_elements}/>
								:<Single elements={galery_elements}/>
						}
				</Layout>		
		}
	}
}
export default Galery;
