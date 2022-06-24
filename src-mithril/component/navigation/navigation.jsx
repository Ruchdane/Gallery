import m from 'mithril'
import Button from '../button/button.js'
import {random,rounded} from '../../utility.js'
import './navigation.scss'

function Navigation(initialVnode){
	function update(value){
		initialVnode.attrs.onchange(rounded(value,initialVnode.attrs.limit))
	}
	var edit = false
	return {
		view(vnode){
			return <div class="navigation">
					<div>
						<Button onclick={ _=> update(0) } > {"<<"} </Button>
						<Button onclick={ _=> update(vnode.attrs.index-1) }> {"<"} </Button>	
						<Button onclick={ _=> update(random(vnode.attrs.index,vnode.attrs.limit-1)) }>  
							<i class="bi bi-dice-5-fill"/>
						</Button>
					</div>
					{!edit 
						? m('label',{
							onclick: _ => edit=!edit
						},`${vnode.attrs.index + 1} / ${vnode.attrs.limit}`)
						: m('input',{
							type:"number",
							min:1,
							max:vnode.attrs.limit,
							onchange:(e)=> {
								update(e.target.value -1 )
								edit=!edit}
						},vnode.attrs.index+1)
					}
					<div>
						<Button onclick={ _=> update(random(vnode.attrs.index,vnode.attrs.limit-1)) }>  
							<i class="bi bi-dice-5-fill"/>
						</Button>
						<Button onclick={ _=> update(vnode.attrs.index + 1) }> {">"}  </Button>	
						<Button onclick={ _=> update(vnode.attrs.limit - 1) }> {">>"} </Button>
					</div>
				
				</div>
		}
	}
}
export default Navigation;
