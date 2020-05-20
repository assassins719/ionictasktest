import { TaskActionTypes } from "../shared/enum/task-action-types.enum";
import { ActionParent } from "../actions/task.action";
import { Task } from "../models/Task";

export const initialState: Task[] = [
    {
        title: "Test",
        cost: 1000,
        price: 20,
        rate: "0",
        duration: 1,
        durationtype: "day",
        address: "test",
        total: 1020,
    }
];

export function TaskReducer(state = initialState, action: ActionParent) {
    const updatedState = [...state];
    switch (action.type) {
        case TaskActionTypes.Add:
            const { cost, price, rate } = action.payload;
            return [...updatedState, { ...action.payload, total: (cost + price) * (100 + parseFloat(rate)) / 100 }];
        case TaskActionTypes.Remove:
            updatedState.splice(action.payload, 1);
            return updatedState;
        case TaskActionTypes.Edit:
            const { cost: cost1, price: price1, rate: rate1 } = action.payload.data;
            updatedState.splice(action.payload.index, 1, { ...action.payload.data, total: (cost1 + price1) * (100 + parseFloat(rate1)) / 100 });
            return updatedState;
        default:
            return state;
    }
}
