import m from 'mithril'
const Image = {
	view(vnode) {
		return <img width={vnode.attrs.width} height={vnode.attrs.height} onmousedown={vnode.attrs.onmousedown} onmouseup={vnode.attrs.onmouseup} onmousemove={vnode.attrs.onmousemove} onclick={vnode.attrs.onclick} alt={vnode.attrs.src} src={encodeURI(vnode.attrs.src)} class={vnode.attrs.class}></img>
	}
}

const Video = {
	view(vnode) {
		return <video controls width={vnode.attrs.width} height={vnode.attrs.height} onclick={vnode.attrs.onclick} class = {vnode.attrs.class} >
			<source src = {encodeURI(vnode.attrs.src)} type="video/mp4"></source>
		</video>
	}
}

function isImage(name) {
	return 	/.(jpg|png|gif|jpeg)$/.test(name);
}

const Media = {
	view(vnode){
		if(isImage(vnode.attrs.src)  )
			return <Image width={vnode.attrs.width} height={vnode.attrs.height} onclick={vnode.attrs.onclick} onmousedown={vnode.attrs.onmousedown} onmouseup={vnode.attrs.onmouseup} onmousemove={vnode.attrs.onmousemove} src={vnode.attrs.src} class={vnode.attrs.class}/>
		else if(vnode.attrs.type === "tumbnail")
			return <svg class='bd-placeholder-img card-img' width={vnode.attrs.width} height={vnode.attrs.height}
			 xmlns='http://www.w3.org/2000/svg'role='img' fill="#fffez" aria-label='Placeholder: Thumbnail' preserveAspectRatio='xMidYMid slice'
			focusable='false'>
				<text y="50%" x ="20%">{vnode.attrs.src} </text>
			</svg>
		else
			return <Video width={vnode.attrs.width} height={vnode.attrs.height} onclick={vnode.attrs.onclick} src={vnode.attrs.src} class={vnode.attrs.class}/>
			
	}
}
export default Media