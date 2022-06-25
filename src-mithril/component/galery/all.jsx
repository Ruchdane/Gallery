import m from 'mithril'
import './index.scss'

function  All(initialVnode) {
	return {
		view(vnode) {
			return 	<div class="imgs-container">
					{vnode.attrs.elements.map(element => <img class="fill" src={element.src}/>)}
				</div>
		}
	}
}
export default All
