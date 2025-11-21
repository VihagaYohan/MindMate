class Profile {
    _id: string
    userId: string
    firstName: string
    lastName: string
    gender: string
    birthDate: string
    createdAt: string
    updatedAt: string

    constructor(
        id: string,
        userId: string,
        firstName: string,
        lastName: string,
        gender: string,
        birthDate: string,
        createdAt: string,
        updatedAt: string
    ) {
        this._id = id
        this.userId = userId
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.birthDate = birthDate
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

export default Profile