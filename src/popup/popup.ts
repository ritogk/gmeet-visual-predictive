import { Config, ConfigObjectInterface, DisplayOriginalCc } from "@/core/config"
import { Elements } from "@/popup/elements"
export const main = async (): Promise<void> => {
  console.log("start: popup")

  const config = new Config((config: ConfigObjectInterface) => {})
  await config.loadConfig()
  const configData = config.getConfig()
  console.log(`load config: ${JSON.stringify(configData)}`)

  // elementsの初期設定
  const elements = new Elements(
    configData.opacityRate,
    configData.displayOriginalCc
  )

  // 監視処理
  const observe = (): void => {
    // chromeStorageを監視して変更されたらContents側にメッセージを送る
    chrome.storage.onChanged.addListener((changes, namespace) => {
      console.log("change storage")
      console.log(`send active tab: ${configData}`)
      chrome.tabs.query(
        { active: true, currentWindow: true },
        function (tabs: any) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            JSON.stringify(configData),
            function (response) {}
          )
        }
      )
    })
  }
  observe()
}

window.addEventListener("load", main, false)
