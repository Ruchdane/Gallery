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
					{
						vnode.attrs.actions.map(
								action => <Button type="button" class="secondary" onclick={action.perform}>
											<i class={`bi bi-${action.icon}`}/>
										</Button>
						)
					}
			</div>

		</header>
	}
}
export default header
