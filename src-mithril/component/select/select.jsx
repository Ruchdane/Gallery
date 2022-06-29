import m from 'mithril'
import './select.scss'
const Select = {
	//TODO Add tootltip
	view(vnode) {
		return <select class={vnode.attrs.class} name={vnode.attrs.name} id={vnode.attrs.id} onchange={(e) => {
			vnode.attrs.onchange === undefined ? null : vnode.attrs.onchange(vnode.attrs.options[e.target.value])
		}}>{
				vnode.attrs.options === undefined ? null :
					vnode.attrs.options.map((option, index) =>
						<option value={index}> {option} </option>)
			}
		</select>
	}
}
export default Select