class Endpoint {
    baseUrl: string;
    login: string;
    register: string;
    categories: string;
    profile: string

    constructor() {
        this.baseUrl = "http://192.168.1.137:3000/api/v1/"
        this.login = `${this.baseUrl}auth/login`
        this.register = `${this.baseUrl}auth`
        this.categories = `${this.baseUrl}categories`
        this.profile = `${this.baseUrl}profiles/by-user`
    }
}

export default Endpoint