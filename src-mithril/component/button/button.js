import m from 'mithril'
import './button.scss'

const Button = {
    view(vnode){
        return m('button',{
            onclick:vnode.attrs.onclick
        },vnode.children)
    }
}

export default Button