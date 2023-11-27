import { Order } from "src/app/interfaces/common/order";

export const ALL_ORDERS: any[] = [
    {
        "orderId": "0069",
        "name": "Alex Jonson",
        "phoneNo": "01648879969",
        "shippingAddress": "Dhaka, Bangladesh",
        "paymentType": "cash-on-delivery",
        "paymentStatus": "unpaid",
        "orderStatus": 1,
        "orderedItems": [
            {
                "_id": "642d371017667cfb5e1fa913",
                "name": "Leather Purse for Women | LW-1033",
                "slug": "purse_for_women_lw_1033",
                "image": "/assets/images/temp/product/thirteen.jpg",
                "category": {
                    "_id": "6422b0576708a38c66b461d9",
                    "name": "Ladies Collections",
                    "slug": "ladies-collections"
                },
                "subCategory": {
                    "_id": "6422ba4d6708a38c66b4655a",
                    "name": "Purse",
                    "slug": "ladies-collections"
                },
                "brand": {
                    "_id": "6422ab726708a38c66b460b3",
                    "name": "Soft Commerce",
                    "slug": "ladies-collections"
                },
                "regularPrice": 1200,
                "unitPrice": 700,
                "quantity": 3,
                "orderType": "regular",
                "color": "null",
                "size": "null"
            }
        ],
        "subTotal": 2100,
        "deliveryCharge": 150,
        "discount": 0,
        "totalSave": 1500,
        "grandTotal": 2100,
        "checkoutDate": "2023-08-05",
        "orderTimeline": null,
        "hasOrderTimeline": false,
        "user": null,
        "deliveryType": "express"
    }
]
