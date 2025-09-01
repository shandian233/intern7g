class CallbackInfo {
    constructor() {
        this.reset();
    }

    reset() {
        this.callback = undefined;
        this.target = undefined;
        this.once = false;
    }
}

import { Pool } from "./Pool";

class EventManager {
    constructor() {
        this.pool = new Pool(CallbackInfo);
        this.listeners = {};
    }

    _on(id, callback, target) {
        let info = this.pool.get();
        info.callback = callback;
        info.target = target;
        info.once = false;
        this._off(info.target, id);
        this.listeners[id].push(info);
    }

    _off(target, id) {
        let infos = this.listeners[id];
        if (!infos) return;
        for (let i = infos.length - 1; i >= 0; i--) {
            if (infos[i].target === target) {
                let info = infos.splice(i, 1)[0];
                info.reset();
                this.pool.put(info);
            }
        }
    }

    _once(id, callback, target) {
        let info = this.pool.get();
        info.callback = callback;
        info.target = target;
        info.once = true;
        this._off(info.target, id);
        this.listeners[id].push(info);
    }

    _emit(id, ...args) {
        let infos = this.listeners[id].filter(info => info.callback && info.target);
        for (let info of infos) {
            info.callback.call(info.target, ...args);
            if (info.once) {
                this._off(info.target, id);
            }
        }
    }

    addListener(id, callback, target) {
        if (!this.listeners[id]) {
            this.listeners[id] = [];
        }
        this._on(String(id), callback, target);
    }

    removeListener(target, id) {
        if (id === undefined) {
            for (let id in this.listeners) {
                this._off(target, id);
            }
        } else {
            this._off(target, String(id));
        }
    }

    eventOnce(id, callback, target) {
        if (!this.listeners[id]) {
            this.listeners[id] = [];
        }
        this._once(String(id), callback, target);
    }

    dispatchEvent(id, ...args) {
        if (!id || !this.listeners[id]) {
            return;
        }
        this._emit(String(id), ...args);
    }
}

export const eventMgr = new EventManager();
