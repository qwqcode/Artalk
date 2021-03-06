export default class Utils {
  public static createElement (htmlStr: string = ''): HTMLElement {
    const div = document.createElement('div')
    div.innerHTML = htmlStr.trim()
    return div.firstElementChild as HTMLElement || div
  }

  public static getHeight (el: HTMLElement) {
    return parseFloat(getComputedStyle(el, null).height.replace('px', ''))
  }

  public static htmlEncode (str: string) {
    let temp = document.createElement('div')
    temp.innerText = str
    const output = temp.innerHTML
    temp = null
    return output
  }

  public static htmlDecode (str: string) {
    let temp = document.createElement('div')
    temp.innerHTML = str
    const output = temp.innerText
    temp = null
    return output
  }

  public static getLocationParmByName (name: string) {
    const match = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

  public static getOffset (el: HTMLElement) {
    const rect = el.getBoundingClientRect()
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    }
  }

  public static timeAgo (date: Date) {
    try {
      const oldTime = date.getTime()
      const currTime = new Date().getTime()
      const diffValue = currTime - oldTime

      const days = Math.floor(diffValue / (24 * 3600 * 1000))
      if (days === 0) {
        // 计算相差小时数
        const leave1 = diffValue % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
        const hours = Math.floor(leave1 / (3600 * 1000))
        if (hours === 0) {
          // 计算相差分钟数
          const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
          const minutes = Math.floor(leave2 / (60 * 1000))
          if (minutes === 0) {
            // 计算相差秒数
            const leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
            const seconds = Math.round(leave3 / 1000)
            return `${seconds} 秒前`
          }
          return `${minutes} 分钟前`
        }
        return `${hours} 小时前`
      }
      if (days < 0) return '刚刚'

      if (days < 8) {
        return `${days} 天前`
      }

      return this.dateFormat(date)
    } catch (error) {
      console.error(error)
      return ' - '
    }
  }

  public static padWithZeros (vNumber: number, width: number) {
    let numAsString = vNumber.toString()
    while (numAsString.length < width) {
      numAsString = `0${numAsString}`
    }
    return numAsString
  }

  public static dateFormat (date: Date) {
    const vDay = this.padWithZeros(date.getDate(), 2)
    const vMonth = this.padWithZeros(date.getMonth() + 1, 2)
    const vYear = this.padWithZeros(date.getFullYear(), 2)
    // var vHour = padWithZeros(date.getHours(), 2);
    // var vMinute = padWithZeros(date.getMinutes(), 2);
    // var vSecond = padWithZeros(date.getSeconds(), 2);
    return `${vYear}-${vMonth}-${vDay}`
  }
}
