import m from 'mithril'
import Navbar from '../header/header';
import './layout.scss'
var layout_collapsed = false

const Layout = {
	view(vnode) {
		return [
				m(Navbar,{
						actions: vnode.attrs.actions == undefined 	? [] 
						:vnode.attrs.actions}),
					m('main',vnode.children)
		]
	}
};

export default Layout;
