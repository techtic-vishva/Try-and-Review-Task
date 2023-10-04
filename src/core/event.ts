import { TinyEmitter } from 'tiny-emitter'

const emitter = new TinyEmitter()

const IsAuthenticated = 'is-authenticated'

export const emitIsAuthenticated = (event: boolean) => {
	emitter.emit(IsAuthenticated, event)
}

export const onIsAuthenticated = (callback: (event: boolean) => void) => {
	emitter.on(IsAuthenticated, callback)
	return () => {
		emitter.off(IsAuthenticated, callback)
	}
}

