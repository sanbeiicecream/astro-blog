import { BASE_URL } from "../consts";
import type { CollectionEntry } from 'astro:content';
const commonCharacter = `,:;.?!()[]{}，。“”""！（）【】；：`


export const formatStr = (val: string) => {
  return val?.toLowerCase().replace(/[^\w\u4e00-\u9fa5\s-]+/g, '').replaceAll(' ', '-') || ''
}

export function formatUrl(value: CollectionEntry<'blog'> | string, extra?: string) {
  if (typeof value === 'string') {
    // Astro render生成html标题会去掉非中文、字母、数字、-、_，空格字符，并将空格变成-
    return `${BASE_URL || '/'}${value}${formatStr(extra || '')}`
  }
  return `${BASE_URL || '/'}${value.collection}/${value.slug}/`
}

export function getWordCount(str: string) {
  return str.split(' ').filter?.(item => !commonCharacter.includes(item)).length
}


export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastExecuted = 0;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    const now = Date.now();

    if (now - lastExecuted >= delay) {
      func.apply(context, args);
      lastExecuted = now;
    }
  };
}


export const baseUrl =
  import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL;