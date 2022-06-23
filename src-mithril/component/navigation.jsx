import m from 'mithril'
import settings from '../config/settings'

const SkipToTop = {
	showSkip: false,
	oninit(vnode) {
		window.onscroll = () => {
			vnode.state.showSkip = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
			m.redraw()
		}
	},
	view(vnode) {
		return vnode.state.showSkip ?
			<button aria- label="skip to top" type="button"
				class={"btn skip-to-top btn-"+settings.colorOutline}
				onclick={() => {
					window.scroll({
						top: 0,
						behavior: 'smooth'
					})
				}}>
				<i class="bi bi-arrow-up-circle-fill" style="font-size: 2rem;"></i>
			</button >
			: null
	}
}
const SkipToMain = {
	view(){
		return <a class="skip-link" href="#main">Skip to main</a>
	}
}

export {SkipToTop, SkipToMain}