class Storage {
    constructor(name) {
        this.storage_name = name;
    }

    save(obj) {
        return localStorage.setItem(this.storage_name, JSON.stringify(obj));
    }

    get() {
        return JSON.parse(localStorage.getItem(this.storage_name));
    }

    clear() {
        localStorage.removeItem(this.storage_name);
    }
}

export default Storage;