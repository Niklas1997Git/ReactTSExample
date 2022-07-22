import ApprovableBaseModel, {PendingState} from "./ApprovableBaseModel";

export default class Meal extends ApprovableBaseModel {
    restaurant: number;

    constructor(id:number,name:string, restaurant: number,reason:string, pending:PendingState) {
        super(id, pending, reason);
        this.name = name;
        this.restaurant = restaurant;
    }

    getName() {
        return this.name;
    }
    getProperties() {
        return "restaurant: " + this.restaurant;
    }
}