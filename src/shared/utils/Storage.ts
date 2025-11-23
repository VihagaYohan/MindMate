import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'

export interface savePayload {
    key: string,
    value: any
}

// set item
const storeItem = async (payload: savePayload) => {
    await RNSecureStorage.setItem(
        payload.key,
        JSON.stringify(payload.value),
        { accessible: ACCESSIBLE.WHEN_UNLOCKED })
}

// get item
const getItem = async (key: string) => {
    const result = await RNSecureStorage.getItem(key)
    return result ? JSON.parse(result) : null
}

// remove item
const removeItem = async (key: string) => {
    await RNSecureStorage.removeItem(key)
}

// remove all data
const removeAllData = async () => {
    await RNSecureStorage.clear()
}

// get all keys
const getAllKeys = async () => {
    return await RNSecureStorage.getAllKeys()
}

export default {
    storeItem,
    getItem,
    removeItem,
    removeAllData,
    getAllKeys
}