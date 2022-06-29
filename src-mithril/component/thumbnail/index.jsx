import m from 'mithril';
import { file_from_path, is_undefined } from '../../utility';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import Tooltip,{setupTooltip} from '../tooltip/tooltip';
import './index.scss'

const Thumbnail = {
	oncreate(vnode){
		setupTooltip(vnode.dom, {
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
          },
	
		);
	},
    view(vnode) {
        /**
         * @type galery
         */
        var galery = vnode.attrs.galery
        return <>
		    <Tooltip>
          { file_from_path(galery.path)}
		    </Tooltip>
		    <div class={`thumbnail ${is_undefined(vnode.attrs.class)}`}>
	   <img src={convertFileSrc(galery.thumbnail)}>  </img>
            <div class='description'>
                <label class='name'> { galery.path.slice(galery.path.lastIndexOf('/')+1)} </label>
                <label class='size'> {galery.size} </label>
            </div>
        </div>
		    </>
    }
}
export default Thumbnail;
