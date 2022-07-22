export default class BaseModel {
    id: number = -1;

    name: String = "";

    constructor(id: number) {
        this.id = id;
    }

    toString(): String {
        return "id: " + this.id;
    }

    getId(): number {
        return this.id;
    }

    getName() :String{
        return "";
    }

    getProperties() {
        return "";
    }
}