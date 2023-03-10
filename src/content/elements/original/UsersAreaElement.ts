import { Selector } from "@/content/core/selector"
export interface usersAreaElementInterface {
  getElement(): HTMLElement | null
  findUserAreaElement: (name: string) => Element | undefined
  findScreenSharingAreaElement: () => Element | undefined
  findUserVideoElement: (name: string) => HTMLVideoElement | undefined
}

/**
 * ユーザーエリアのElementに関するクラス
 */
export class UsersAreaElement implements usersAreaElementInterface {
  getElement = (): HTMLElement | null => {
    return document.querySelector<HTMLElement>(
      Selector.getInstance().getSelector().usersArea
    )
  }

  // ユーザーエリアの要素を取得
  findUserAreaElement = (name: string): Element | undefined => {
    const usersAreaElement = this.getElement()
    if (!usersAreaElement) return undefined
    const userAreaList = Array.from(usersAreaElement.children)
    return userAreaList.find((element) => {
      // 画面共有ようのエリアはinnerTextが取得できないのでその対応
      const userNameArea = element.querySelector("[data-self-name]")
      if (!userNameArea) return false
      if (userNameArea.textContent?.startsWith(name)) {
        return true
      }
      return false
    })
  }

  // 画面共有エリアの要素を取得
  findScreenSharingAreaElement = (): Element | undefined => {
    const usersAreaElement = this.getElement()
    if (!usersAreaElement) return undefined
    const userAreaList = Array.from(
      usersAreaElement.children
    ) as HTMLDivElement[]
    // 画面共有中は先頭のdivタグ内にZY8hPcクラスが含まれない。
    if (userAreaList[0].querySelector(".ZY8hPc")) {
      return undefined
    }
    return userAreaList[0]
  }

  // 画面共有エリアのvideo要素を取得
  findScreenSharingVideoElement = (): Element | undefined => {
    const screenSharingAreaElement = this.findScreenSharingAreaElement()
    if (!screenSharingAreaElement) return undefined

    // 非表示のVideoタグが紛れる事があるのでその対応。
    const videoAreaElements = screenSharingAreaElement.querySelectorAll("video")
    let userVideoElement: HTMLVideoElement | null = null
    if (videoAreaElements.length >= 2) {
      videoAreaElements.forEach((element) => {
        if (element.style.display == "none") return
        userVideoElement = element
      })
    } else {
      userVideoElement = videoAreaElements[0]
    }
    return userVideoElement !== null ? userVideoElement : undefined
  }

  // ユーザーのvideo要素を取得
  findUserVideoElement = (name: string): HTMLVideoElement | undefined => {
    const userAreaElement = this.findUserAreaElement(name)
    if (!userAreaElement) return undefined

    // 非表示のVideoタグが紛れる事があるのでその対応。
    const videoAreaElements = userAreaElement.querySelectorAll("video")
    let userVideoElement: HTMLVideoElement | null = null
    if (videoAreaElements.length >= 2) {
      videoAreaElements.forEach((element) => {
        if (element.style.display == "none") return
        userVideoElement = element
      })
    } else {
      userVideoElement = videoAreaElements[0]
    }
    return userVideoElement !== null ? userVideoElement : undefined
  }
}
