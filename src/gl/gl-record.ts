import style from './gl-record.styl'
import { Hybrids, html } from 'hybrids'
import gl from './base/glContext'

function Recorder({canvas}) {
	const mediaSource = new MediaSource()
	mediaSource.addEventListener('sourceopen', (e) => {
		sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"')
	}, false)
	let mediaRecorder
	let recordedChunks
	let sourceBuffer

	const stream = canvas.captureStream(24)

	/**
	 * Creates a new MediaRecorder or alerts
	 * @param stream The stream to record to
	 */
	function tryCreateRecorder(stream) {
		let recorder = null
		try {
			recorder = new (window as any).MediaRecorder(stream, {mimeType: 'video/webm'})
		} catch(err) {
			console.log(`Unable to create MediaRecorder with options: `, err)
			try {
				recorder = new (window as any).MediaRecorder(stream, {mimeType: 'video/webm,codecs=vp9'})
			} catch(err) {
				console.log('Unable to create MediaRecorder with options: ', err)
				try {
					recorder = new (window as any).MediaRecorder(stream, 'video/vp8')
				} catch(err) {
					alert('MediaRecorder is not supported by this browser.\n\n' +
						'Try Firefox 29 or later, or Chrome 47 or later, ' +
						'with Enable experimental Web Platform features enabled from chrome://flags.')
					console.error('Exception while creating MediaRecorder:', err)
				}
			}
		}
		return recorder
	}

	function start(host, e) {
		host.active = true
		recordedChunks = []

		mediaRecorder = tryCreateRecorder(stream)

		mediaRecorder.onstop = (e) => {
			const blob = new Blob(recordedChunks, {type: 'video/webm'})
			const url = URL.createObjectURL(blob)

			downloadRecording(url)
		}
		mediaRecorder.ondataavailable = (e) => {
			if(e.data && e.data.size > 0) {
				recordedChunks.push(e.data)
			}
		}
		mediaRecorder.start(100) // collect 100ms
	}

	function stop(host, e) {
		host.active = false
		mediaRecorder.stop()
	}

	function downloadRecording(url, filename = 'video-001') {
		let a = document.createElement('a')
		document.body.appendChild(a)
		a.style.display = 'none'
		a.href = url
		a.download = filename
		a.click()
		setTimeout(() => {
			document.body.removeChild(a)
			URL.revokeObjectURL(url)
		}, 100)
	}

	return {
		start,
		stop,
	}
}

interface GlRecord extends HTMLElement {
	[key: string]: any
}

export default {
	...gl,
	active: false,
	recorder: Recorder,
	render: ({recorder, active}) => html`
		<style>${style.toString()}</style>
		<div class="gl-record">
			<div class="record ${active ? 'active' : ''}"
				title="${active ? 'Stop' : 'Record'}"
				onclick="${!active ? recorder.start : recorder.stop}"></div>
		</div>
	`,
} as Hybrids<GlRecord>
