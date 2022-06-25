import m from 'mithril'
import './button.scss'
import {is_undefined} from '../../utility'
const Button = {
    view(vnode){
        return m('button',{
		onclick:vnode.attrs.onclick,
		class: `${is_undefined(vnode.attrs.class)}`
        },vnode.children)
    }
}

export default Button
