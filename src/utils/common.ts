import { BASE_URL } from "../consts";
import type { CollectionEntry } from 'astro:content';
const commonCharacter = `,:;.?!()[]{}，。“”""！（）【】；：`

export function formatUrl(item: CollectionEntry<'blog'>) {
  return `${BASE_URL || '/'}${item.collection
    }/${item.id.split('.md')[0]
      ?.split(' ')
      .join('-')}/`
}

export function getWordCount(str: string) {
  return str.split(' ').filter?.(item => !commonCharacter.includes(item)).length
}