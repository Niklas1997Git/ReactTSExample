import BaseModel from "./BaseModel"

export default class Restaurant extends BaseModel {
    constructor(id: number, name: String) {
        super(id);
        this.name = name;
    }
    toString(): String {
        return "id: " + this.id + ", name: " + this.name;
    }

    getName() {
        return this.name;
    }
    getProperties() {
        return "";
    }
}