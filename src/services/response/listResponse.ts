class ListResponse<DataType extends any[]> {
    currentPage: number
    totalPages: number
    totalItems: number
    data: DataType

    constructor(currentPage: number,
        totalPages: number,
        totalItems: number,
        data: DataType
    ) {
        this.currentPage = currentPage
        this.totalPages = totalPages
        this.totalItems = totalItems
        this.data = data
    }
}

export default ListResponse