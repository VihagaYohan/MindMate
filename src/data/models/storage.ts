class Storage {
    token: string
    userId: string
    email: string
    userType: string
    isActive: boolean

    constructor(
        token: string,
        userId: string,
        email: string,
        userType: string,
        isActive: boolean
    ) {
        this.token = token
        this.userId = userId
        this.email = email
        this.userType = userType
        this.isActive = isActive
    }
}

export default Storage