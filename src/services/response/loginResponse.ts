// model
import { User, Token } from '../../data/models'

interface LoginResponse {
    user: User,
    token: Token,
    message: string,
    success: boolean
}

export default LoginResponse