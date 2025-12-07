class Resource {
    _id: string
    categoryId: string
    resourceType: string
    resourceUrl: string
    thumbnail: string
    title: string
    description: string
    isExternal: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string

    constructor(
        id: string,
        categoryId: string,
        resourceType: string,
        resourceUrl: string,
        thumbnail: string,
        title: string,
        description: string,
        isExternal: boolean,
        isActive: boolean,
        createdAt: string,
        updatedAt: string
    ) {
        this._id = id
        this.categoryId = categoryId
        this.resourceType = resourceType
        this.resourceUrl = resourceUrl
        this.thumbnail = thumbnail
        this.title = title
        this.description = description
        this.isExternal = isExternal
        this.isActive = isActive
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

export default Resource