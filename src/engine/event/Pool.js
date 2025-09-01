export class Pool {
    constructor(type) {
        this.func = type;
        this.pool = [];
    }

    clear() {
        this.pool = [];
    }

    size() {
        return this.pool.length;
    }

    get() {
        if (this.pool.length) {
            return this.pool.shift();
        } else {
            return new this.func();
        }
    }

    put(obj) {
        if (obj && this.pool.indexOf(obj) < 0) {
            this.pool.push(obj);
        }
    }
}
