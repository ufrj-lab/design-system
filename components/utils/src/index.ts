// tslint:disable: no-console
import { LitElement } from 'lit-element'

export function initThrowError(debugEnabled: boolean) {
  return (
    condition: boolean,
    message: string,
    parent: LitElement,
    enabled = debugEnabled,
  ): boolean | void => {
    if (condition && enabled) {
      console.error(parent, message)
      throw new Error(message)
    }
    return condition
  }
}

export function initLogWarning(debugEnabled: boolean) {
  return (
    condition: boolean,
    message: string,
    parent: LitElement,
    enabled = debugEnabled,
  ): boolean => {
    if (condition && enabled) {
      console.warn(parent, message)
    }
    return condition
  }
}

export function toCapitalizer(str: string) {
  return `${str[0].toUpperCase()}${str.slice(1)}`
}
