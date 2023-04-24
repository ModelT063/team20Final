export enum OrderStatus {
    submitted = 0,
    out_for_delivery = 1,
    completed = 2,
    cancelled = 3
}

export type Order = {
    Order_ID?: number,
    User_ID?: string,
    Point_Change_ID?: number,
    Order_Status: OrderStatus,
    Product: string,
    Order_Time: Date
}