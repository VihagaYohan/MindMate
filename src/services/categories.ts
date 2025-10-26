import { Category } from "../data/models";
import Endpoint from "./endpoints";

class CategoriesService {
    endpoint: Endpoint
    static categories: Category[] = [
        new Category(
            "68e26cf3e034a1559778ee48",
            "Anger",
            "#D32F2F",
            "https://res.cloudinary.com/dat02tisy/image/upload/v1752934990/icons8-anger-64_azlp4o.png",
            "2025-10-05T13:04:51.104Z",
            "2025-10-05T13:04:51.104Z"
        ),
        new Category(
            "68e26d32e034a1559778ee4a",
            "Anxiety",
            "#9575CD",
            "https://res.cloudinary.com/dat02tisy/image/upload/v1752934990/icons8-anxiety-64_ufd3bp.png",
            "2025-10-05T13:05:54.328Z",
            "2025-10-05T13:05:54.328Z"
        ),
        new Category(
            "68e26956ecafb9e684d9b184",
            "Depression",
            "#5C6BC0",
            "https://res.cloudinary.com/dat02tisy/image/upload/v1752934990/icons8-depression-64_hpb9bw.png",
            "2025-10-05T12:49:26.714Z",
            "2025-10-05T12:49:26.714Z"
        ),
        new Category(
            "68e26d5de034a1559778ee4e",
            "Panic",
            "#00838F",
            "https://res.cloudinary.com/dat02tisy/image/upload/v1752934990/icons8-panic-64_p0nnvo.png",
            "2025-10-05T13:06:37.500Z",
            "2025-10-05T13:06:37.500Z"
        ),
        new Category(
            "68e26d49e034a1559778ee4c",
            "Stress",
            "#B0BEC5",
            "https://res.cloudinary.com/dat02tisy/image/upload/v1752934990/icons8-stress-64_fkoo50.png",
            "2025-10-05T13:06:17.879Z",
            "2025-10-05T13:06:17.879Z"
        )
    ]

    constructor() {
        this.endpoint = new Endpoint();
    }

    /*     // get services
        getServices = async () => {
            try {
                return this.categories
            } catch (e) {
                console.log(e)
            }
        } */
}

export default CategoriesService