import { OrderProcessing } from "src/app/interfaces/common/order-processing";


export const ORDERPROCESSING: OrderProcessing[] = [
    {
        date: "7/22/2023",
        time: "12:23 PM",
        processTitle: "Order Placed",
        processDetails: "Your order is successfully placed to Medicinedipo. Order id #450206",
        processLineShow: true
    },
    {
        date: "7/22/2023",
        time: "12:23 PM",
        processTitle: "Processing",
        processDetails: "We have received your order, our pharmacist will check and confirm shortly.",
        processLineShow: true
    },
    {
        date: "7/22/2023",
        time: "12:40 PM",
        processTitle: "Confirmed",
        processDetails: "We have confirmed your order.",
        processLineShow: true
    },
    {
        date: "7/22/2023",
        time: "12:40 PM",
        processTitle: "Packing",
        processDetails: "We are currently packing your order.",
        processLineShow: true
    },
    {
        date: "7/22/2023",
        time: "12:40 PM",
        processTitle: "Packed",
        processDetails: "Your order is packed now.",
        processLineShow: true
    },
    {
        date: "7/22/2023",
        time: "5:43 PM",
        processTitle: "Payment",
        processDetails: "869 Taka payment received by Medicinedipo through bKash.",
        processLineShow: true
    },
    {
        date: "7/22/2023",
        time: "4:10 PM",
        processTitle: "Delivering",
        processDetails: "Rider has picked up your order for delivering.",
        processLineShow: true
    },
    {
        date: "7/22/2023",
        time: "5:44 PM",
        processTitle: "Delivered",
        processDetails: "You have received your order.",
        processLineShow: false
    },
]
