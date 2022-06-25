import m from 'mithril'
import { convertFileSrc } from '@tauri-apps/api/tauri';
import './index.scss'

function  All(initialVnode) {
	return {
		view(vnode) {
			return 	<div class="imgs-container">
					{vnode.attrs.elements.map(element => <img class="fill" src={convertFileSrc(element.src)}/>)}
				</div>
		}
	}
}
export default All
