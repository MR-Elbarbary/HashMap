import { List } from "./linkedList.mjs";

export class HashMap {
    constructor() {
        this.capacity = 16;
        this.length = 0;
        this.loadFactor = 0.75;
        this.buckets = [];
    }
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }
    set(key, value){
        this.length++;
        if (this.loadFactor <= (this.length / this.capacity)) {
            let entries = this.entries();
            this.clear();
            this.capacity = this.capacity * 2
            entries.forEach(entry => {
                this.set(entry[0], entry[1]);
            });
        }
        let idx = this.hash(key);
        if (this.buckets[idx]) {
            let node = this.buckets[idx].find(key);
            if (node === -1) {
                this.buckets[idx].append(key, value);
            } else{
                node.value = value;
            }
                
        } else {
            this.buckets[idx] = new List();
            this.buckets[idx].append(key, value);
        }
    }
    get(key){
        let idx = this.hash(key);
        let node = this.buckets[idx].find(key);
        if (node === -1) {
            Error("Not in the HashMap");
        }
        return node.value
    }
    has(key){
        let idx = this.hash(key);
        return this.buckets[idx].contain(key)
    }
    remove(key){
        let idx = this.hash(key);
        let node = this.buckets[idx].findIdx(key);
        if (node === -1) {
            Error("Not in the HashMap")
        }
        this.buckets[idx].removeAt(node);
        return
    }
    keys(){
        let keys = [];
        this.buckets.forEach(bucket => {
            for (let i = 0; i < bucket.length; i++) {
                keys.push(bucket.findIdx(i).key);
            }
        });
        return keys
    }
    values(){
        let values = [];
        this.buckets.forEach(bucket => {
            for (let i = 0; i < bucket.length; i++) {
                values.push(bucket.findIdx(i).value);
            }
        });
        return values
    }
    entries(){
        let entries = [];
        this.buckets.forEach(bucket => {
            for (let i = 0; i < bucket.length; i++) {
                let node = (bucket.getAt(i));
                entries.push([node.key, node.value]);
            }
        });
        return entries
    }
    clear(){
        for (let i = 0; i < this.buckets.length; i++) {
            this.buckets[i] = null;
        }
    }
}