
// share
import { Constants, Storage } from '../'


const checkForKey = async (key: string): Promise<boolean> => {
    const keys = await Storage.getAllKeys()
    if (keys?.length == 0) {
        return false
    }
    else {
        if (keys?.includes(key)) {
            return true
        }
    }
    return false
}

export const getUserDetails = async () => {
    try {
        const isAvailable = await checkForKey(Constants.KEYS.user)
        if (isAvailable) {
            const result = await Storage.getItem(Constants.KEYS.user)
            return result
        }
        console.log(`There are no entries for the key ${Constants.KEYS.user}`)
        return
    } catch (error) {
        console.log('error occured')
    }
}

export const clearAllData = async () => {
    try {
        await Storage.removeAllData()
    } catch (error) {
        console.log("Error occured")
    }
}

export const deleteUserDetails = async () => {
    try {
        const isAvailable = await checkForKey(Constants.KEYS.user)
        if (isAvailable) {
            await Storage.removeItem(Constants.KEYS.user)
        }
        console.log(`There are no entries for the key ${Constants.KEYS.user}`)
        return
    } catch (error) {
        console.log('error occured')
    }
}
