import m from 'mithril'
import './pagination.scss'
import Select from '../select/select'
import Button from '../button/button'

const tooltip_modifier = {
	placement: 'top',
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

class PaginationObject {
	/**
	 * 
	 * @param {number} size la taille de la donne
	 * @param {number} index la page actuelle
	 * @param {number} limit le nombre d'element sur une page
	 * @returns PaginationObject
	 */
	static limits = [16,32,64,,100]
	constructor(size, index, limit) {
		return {
			size: size,
			index: index,
			limit: limit,
			count() {
				return Math.ceil(this.size / this.limit)
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
				return this.index == 0
			},
			nextDisabled() {
				return this.index + 1 == this.count()
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
			return <nav aria-label="Page navigation" class='pagination'>
				<ul>
					<li>
						<Button disabled={pagination.prevDisabled()} 
							tooltip="prev" 
							tooltip_modifier={tooltip_modifier} 
							class="outlined primary"
							  aria-label="Previous"
							onclick={_ => {
								pagination.index = pagination.index - 1
								vnode.attrs.onchange(pagination)
							}}>
							<span aria-hidden="true">&laquo;</span>

						</Button>
					</li>
					{
						Array.from(new Array(pagination.count()), (_, i) =>
							<li >
								<Button class={`${pagination.isCurrent(i)} outlined primary`}  onclick={_ => {
									pagination.index = i
									vnode.attrs.onchange(pagination)
								}} >
									{i + 1}
								</Button>
							</li>)
					}
					<li>
						<Button
							disabled={pagination.nextDisabled()} 
						 	tooltip="next"
							tooltip_modifier={tooltip_modifier} 
							class="outlined primary"  
							aria-label="Next"
							onclick={_ => {
								pagination.index = pagination.index + i
								vnode.attrs.onchange(pagination)
							}}>
							<span aria-hidden="true">&raquo;</span>
						</Button>
					</li>
				</ul>
				<div>
					<Select options={PaginationObject.limits} onchange={value=>{
						pagination.limit = value
						vnode.attrs.onchange(pagination)
					}}/>
				</div>
			</nav >
		}
	}
}
export { Pagination, PaginationObject }