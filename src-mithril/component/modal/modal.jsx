import m from 'mithril'
import './modal.scss'
const Modal = {
	modal: {
		style: "",
		Title: {
			view() {
				return <> </>
			}
		},
		Body: {
			view() {
				return <> </>
			}
		},
		SaveButton: {
			view() {
				return <> </>
			}
		}
	},
	setModal(modal) {
		this.modal = modal
	},
	view(vnode) {
		return <div class="modal fade" id="modal" tabindex="-1">
			<div class={"modal-dialog " + (this.modal.style == undefined ? "" : this.modal.style)}>
				<div class="modal-content">
					{
						this.modal.Title != undefined ?
							<div class="modal-header">
								<h5 class="modal-title">
									<this.modal.Title />
								</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick={() => this.modal.clean !== undefined ? this.modal.clean() : null}></button>
							</div>
							: null
					}
					<div class="modal-body">
						<p>	<this.modal.Body /></p>
					</div>
					{
						this.modal.SaveButton != undefined ?
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick={() => this.modal.clean()}>Fermer</button>
								<this.modal.SaveButton />
							</div>
							: null
					}
				</div>
			</div>
		</div>
	}
}
//data-bs-toggle="modal" data-bs-target="#modal"
export default Modal
// export { Modal }