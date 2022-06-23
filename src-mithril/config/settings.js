import { invoke } from '@tauri-apps/api/tauri'
import  m  from 'mithril'
import { log } from './error'
var setting = {
	version: 0,
    path: "",
}
export function setup(){
	invoke("get_user_settings")
	.then(value=> {
		setting = value
		m.redraw()
	})
	.catch(err=>log(err))
}
