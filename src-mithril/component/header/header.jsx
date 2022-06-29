import m from 'mithril';
import Button from '../button/button';
import './header.scss'

const header = {
	view(vnode) {
		return <header>
			<div>
				{vnode.attrs.label || ''}
				<m.route.Link href="/galeries">
					<img src="favicon.svg" width="38" height="30" c alt="Galery" loading="lazy" />
				</m.route.Link>
			</div>
			<div class='actions'>
					{
						vnode.attrs.actions.map(
								action => <Button type="button" tooltip_modifier={action.tooltip_modifier} tooltip={action.tooltip}  class="secondary" onclick={action.perform}>
											<i class={`bi bi-${action.icon}`}/>
										</Button>
						)
					}
			</div>

		</header>
	}
}
export default header
