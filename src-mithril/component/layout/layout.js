import m from 'mithril'
import Navbar from '../header/header';
import './layout.scss'
export function layout_tooltip_modifier(){
	return {
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
}
var layout_collapsed = false

const Layout = {
	view(vnode) {
		return [
				m(Navbar,{
          label: vnode.attrs.label,
					actions: vnode.attrs.actions  || [] }),
					m('main',vnode.children)
		]
	}
};

export default Layout;
