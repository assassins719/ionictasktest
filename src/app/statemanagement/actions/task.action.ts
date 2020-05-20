import { Action, Store, select } from "@ngrx/store";
import { TaskActionTypes } from "../shared/enum/task-action-types.enum";
import { Task } from "../models/Task";

export class ActionParent implements Action {
    type: any;
    payload: any;
    constructor() { }
}

export class TaskAdd implements ActionParent {
    type = TaskActionTypes.Add;
    constructor(public payload: any) { }
}

export class TaskRemove implements ActionParent {
    type = TaskActionTypes.Remove;
    constructor(public payload: any) { }
}

export class TaskEdit implements ActionParent {
    type = TaskActionTypes.Edit;
    constructor(public payload: any) { }
}
