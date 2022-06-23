import m from 'mithril'
import Select from '../select/select'
class PaginationObject {
	/**
	 * 
	 * @param {number} size la taille de la donne
	 * @param {number} index la page actuelle
	 * @param {number} limit le nombre d'element sur une page
	 * @returns PaginationObject
	 */
	static limits = [10,15,25,50,100]
	constructor(size, index, limit) {
		return {
			size: size,
			index: index,
			limit: limit,
			count() {
				return this.size / this.limit
			},
			/**
			 *
			 * @param {Number} i
			 * @returns
			 */
			isCurrent(i) {
				return this.index == i ? "active" : ""
			},

			prevDisabled() {
				return this.index == 0 ? "disabled" : ""
			},
			nextDisabled() {
				return this.index == this.count() ? "disabled" : ""
			}
		}
	}
}

/**
 * @argument PaginationObject setter
 * @argument PaginationObject getter
 * @returns Pagination
 */
function Pagination(initVnode) {
	/**
	 * @type PaginationObject
	 */
	var pagination = initVnode.attrs.pagination
	return {
		view(vnode) {
			return <nav aria-label="Page navigation">
				<ul>
					<li class={pagination.prevDisabled()}>
						<button aria-label="Previous"
							onclick={_ => {
								pagination.index = pagination.index - 1
								vnode.attrs.onchange(pagination)
							}}>
							<span aria-hidden="true">&laquo;</span>
							<span>Previous</span>
						</button>
					</li>
					{
						Array.from(new Array(pagination.count()), (_, i) =>
							<li class={pagination.isCurrent(i)}>
								<button onclick={_ => {
									pagination.index = i
									vnode.attrs.onchange(pagination)
								}} >
									{i + 1}
								</button>
							</li>)
					}
					<li class={pagination.nextDisabled()}>
						<button aria-label="Next"
							onclick={_ => {
								pagination.index = pagination.index + i
								vnode.attrs.onchange(pagination)
							}}>
							<span aria-hidden="true">&raquo;</span>
							<span class="visually-hidden">Next</span>
						</button>
					</li>
				</ul>
				<Select options={PaginationObject.limits} onchange={value=>{
					pagination.limit = value
					vnode.attrs.onchange(pagination)
				}}/>
			</nav >
		}
	}
}
export { Pagination, PaginationObject }