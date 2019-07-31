import { initLogWarning, initThrowError } from '.'

declare global {
  export interface Window {
    mnv:
      | {
          debug: boolean
        }
      | undefined
  }
}

const { mnv } = window
const debugEnabled = !mnv || mnv.debug === true

if (debugEnabled) {
  console.dir('DEBUG', true)
}

export const throwError = initThrowError(debugEnabled)
export const logWarning = initLogWarning(debugEnabled)

export * from '.'
