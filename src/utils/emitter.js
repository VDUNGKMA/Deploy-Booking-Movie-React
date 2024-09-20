import EventEmitter from 'events'

const _emitter = new EventEmitter()
_emitter.setMaxListeners(0) // unlitmit listen
// sử lý sự kiện bên phía con để gửi lên cho phía cha
export const emitter =_emitter