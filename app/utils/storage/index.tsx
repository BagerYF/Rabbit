import AsyncStorage from '@react-native-async-storage/async-storage'

export const StorageKeys = {
  SearchHistoryKey: 'SearchHistoryKey',
  Cart: 'Cart',
  Region: 'Region',
  TokenInfo: 'TokenInfo',
  Customer: 'Customer',
  Address: 'Address',
}

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function getString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key)
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function setString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function getItem(key: string): Promise<any | null> {
  try {
    const almostThere = await AsyncStorage.getItem(key)
    if (typeof almostThere == 'string') {
      return JSON.parse(almostThere)
    } else {
      return null
    }
  } catch {
    return null
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function setItem(key: string, value: any): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key)
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear()
  } catch {}
}

export async function exist(key: string): Promise<boolean> {
  try {
    const item = await AsyncStorage.getItem(key)
    return !!item
  } catch {
    return false
  }
}
