class ServerResponse<DataType> {
    succeess: boolean
    message: string
    statusCode: number
    data: DataType

    constructor(success: boolean, message: string, data: DataType, statusCode: number = 200) {
        this.succeess = success
        this.message = message
        this.data = data
        this.statusCode = statusCode
    }

}

export default ServerResponse