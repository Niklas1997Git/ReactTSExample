import BaseModel from "./BaseModel";
export enum PendingState {
    APPROVED,
    UNAPPROVED
}


export default class ApprovableBaseModel extends BaseModel {
    private reason: String;
    pending: PendingState;

    constructor(id: number, pending: PendingState, reason: String) {
        super(id);
        this.pending = pending;
        this.reason = reason;
    }
}