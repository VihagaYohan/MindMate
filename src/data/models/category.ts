class Category {
    _id: string
    backgroundColor: string
    title: string
    imageUrl: string
    createdAt: string
    updatedAt: string

    constructor(id: string, title: string, backgroundColor: string, imageUrl: string, createdAt: string, updatedAt: string) {
        this._id = id
        this.title = title
        this.backgroundColor = backgroundColor
        this.imageUrl = imageUrl
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

export default Category