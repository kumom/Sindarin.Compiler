
class EventEmitter {
    _listeners: {[event: string]: EventHandler[]} = {}

    addListener(event: string, handler: EventHandler): this {
        (this._listeners[event] ||= []).push(handler);
        return this;
    }

    on(event: string, handler: EventHandler): this {
        return this.addListener(event, handler);
    }

    emit(event: string, ...eventData: any[]) {
        for (let h of this._listeners[event] || []) {
            try { h(...eventData); }
            catch (e) { console.error(e); }
        }
    }

    /** @todo removeListener/off */
}

interface EventHandler {
    (...eventData: any[]): void
}


export { EventEmitter }