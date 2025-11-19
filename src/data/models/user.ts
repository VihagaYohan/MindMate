class User {
    _id: string
    email: string
    password: string
    userType: string
    isActive: boolean
    createdAt: string
    updatedAt: string

    constructor(
        id: string,
        email: string,
        password: string,
        userType: string,
        isActive: boolean,
        createdAt: string,
        updatedAt: string
    ) {
        this._id = id
        this.email = email
        this.password = password
        this.userType = userType
        this.isActive = isActive
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

export default User