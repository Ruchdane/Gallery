import m from 'mithril';
import { is_undefined } from '../../utility';
import './index.scss'

const Thumbnail = {
    view(vnode) {
        /**
         * @type galery
         */
        var galery = vnode.attrs.galery
        return <div class={`thumbnail ${is_undefined(vnode.attrs.class)}`}>
	   <img src={`${galery.thumbnail}`}>  </img>
            <div class='description'>
                <label class='name'> { galery.path.slice(galery.path.lastIndexOf('/')+1)} </label>
                <label class='size'> {galery.size} </label>
            </div>
        </div>
    }
}
export default Thumbnail;
