import m from 'mithril'
import Navigation from '../navigation/navigation.jsx'
import {rounded} from '../../utility.js'
import './index.scss'

function  Single(initialVnode) {
	var index = 0
	var elements = initialVnode.attrs.elements
	function keyHandler(e){
	  if (e.key === "ArrowRight"){
		index = rounded(index + 1, elements.length)
		m.redraw()
	  }
        else if (e.key === "ArrowLeft"){
		index = rounded(index - 1, elements.length)
		m.redraw()
	  }

	}
	function clickHandler(e){
		var step = e.x > (e.target.scrollWidth / 2) ? 1 : -1;
		index = rounded(index + step, elements.length)
	}
	return {
		oninit() {
			document.addEventListener("keydown", keyHandler);
		},
	        onremove() {
        	        document.removeEventListener("keydown", keyHandler)
	        },

		view(vnode) {
			return <div class="viewport">
				<Navigation index={index} limit={elements.length} onchange={(value) => index = value}/>
				<div class="img-container" onclick={clickHandler}>
					<img class="fit" src={elements[index].src}/>
				</div>
				<Navigation index={index} limit={elements.length} onchange={(value) => index = value}/>
				</div>
		}
	}
}
export default Single
