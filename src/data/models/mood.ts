class Mood {
    _id: string
    userId: string
    level: string
    description: string
    notes: string
    prediction: string
    isActive: boolean
    createdAt: string
    updatedAt: string

    constructor(
        id: string,
        userId: string,
        level: string,
        description: string,
        notes: string,
        prediction: string,
        isActive: boolean,
        createdAt: string,
        updatedAt: string
    ) {
        this._id = id
        this.userId = userId
        this.level = level
        this.description = description
        this.notes = notes
        this.prediction = prediction
        this.isActive = isActive
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

export default Mood