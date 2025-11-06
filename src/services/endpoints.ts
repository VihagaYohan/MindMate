class Endpoint {
    baseUrl: string;
    categories: string;

    constructor() {
        this.baseUrl = "http://192.168.1.137:3000/api/v1/"
        this.categories = `categories`
    }
}

export default Endpoint