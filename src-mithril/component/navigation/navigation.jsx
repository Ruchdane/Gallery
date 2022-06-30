import m from 'mithril'
import Button from '../button/button.js'
import {random,rounded} from '../../utility.js'
import './navigation.scss'
const tooltip_modifier = {
	modifiers: [
	  {
		name: 'offset',
		options: {
		  offset: [0, 8],
		},
	  },
	  {
		name: 'arrow',
		options: {
		  padding: ({ popper, reference, placement }) =>
			popper.width / reference.width,
		},
	  }
	],
  }
  
function Navigation(initialVnode){
	function update(attrs,value){
		attrs.onchange(rounded(value,attrs.limit))
	}
	var edit = false
	return {
		view(vnode){
			return <div class="navigation">
					<div>
						<Button class="outlined primary" 
						//FIXME Tooltip bug on nnavigation

				onclick={ _=> update(vnode.attrs,0) } > {"<<"} </Button>
						<Button class="outlined primary" 
				onclick={ _=> update(vnode.attrs,vnode.attrs.index-1) }> {"<"} </Button>	
						<Button class="outlined primary" 
				onclick={ _=> update(vnode.attrs,random(vnode.attrs.index,vnode.attrs.limit-1)) }>  
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
								update(vnode.attrs,e.target.value -1 )
								edit=!edit}
						},vnode.attrs.index+1)
					}
					<div>
						<Button class="outlined primary" 
				onclick={ _=> update(vnode.attrs,random(vnode.attrs.index,vnode.attrs.limit-1)) }>  
							<i class="bi bi-dice-5-fill"/>
						</Button>
						<Button class="outlined primary" 
				onclick={ _=> update(vnode.attrs,vnode.attrs.index + 1) }> {">"}  </Button>	
						<Button class="outlined primary" 
				onclick={ _=> update(vnode.attrs,vnode.attrs.limit - 1) }> {">>"} </Button>
					</div>
				
				</div>
		}
	}
}
export default Navigation;
