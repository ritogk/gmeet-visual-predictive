type ChromeStorageKey =
  | "configOpacityRate"
  | "configBackgroundOpacityRate"
  | "configDisplayOriginalCc"
  | "configCcSizeRate"
  | "configCcRows"
  | "configCcMarginRate"

export const getStorage = async <T>(
  key: ChromeStorageKey
): Promise<T | null> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (data) => {
      if (key in data) resolve(<T>data[key])
      resolve(null)
    })
  })
}

export const setStorage = (key: ChromeStorageKey, value: any): void => {
  chrome.storage.local.set({ [key]: value })
}
