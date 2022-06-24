import m from 'mithril';
import Button from '../button/button';
import './header.scss'

const header = {
	view(vnode) {
		return <header>
			<m.route.Link href="/galery">
				<img src="favicon.svg" width="38" height="30" c alt="Galery" loading="lazy" />
			</m.route.Link>
			<div id="navigation">
				<Button aria-label="parametre" type="button" class="btn btn-outline-dark">
					<i class="bi bi-gear"/>
				</Button>
				<Button aria-label="previous page" type="button" class="btn btn-outline-dark">
					<i class="bi bi-caret-left-square-fill"/>
				</Button>
				<Button aria-label="reload" type="button" class="btn btn-outline-dark">
					<i class="bi bi-arrow-repeat"/>
				</Button>
				<Button aria-label="next page" type="button" class="btn btn-outline-dark">
					<i class="bi bi-caret-right-square-fill"/>
				</Button>
			</div>

		</header>
	}
}
export default header
