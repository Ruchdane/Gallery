import m from 'mithril'
import './button.scss'
import {is_undefined} from '../../utility'
import Tooltip,{setupTooltip} from '../tooltip/tooltip';
const Button = {
    oncreate(vnode){
        if(vnode.attrs.tooltip){
            setupTooltip( vnode.dom,vnode.attrs.tooltip_modifier);
        }
    },
    view(vnode){
        return m('',
        vnode.attrs.tooltip ? m(Tooltip,vnode.attrs.tooltip) : null,
        m('button',{
		onclick:vnode.attrs.onclick,
		class: `${is_undefined(vnode.attrs.class)}`
        },vnode.children))
    }
}

export default Button
