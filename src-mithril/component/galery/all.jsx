import m from 'mithril'
import './index.scss'

function  All(initialVnode) {
	var index = 0
	var elements = initialVnode.attrs.elements
	return {
		view(vnode) {
			return 	<div class="imgs-container">
					{elements.map(element => <img class="fill" src={element.src}/>)}
				</div>
		}
	}
}
export default All
