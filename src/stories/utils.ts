import { WaffleItem } from '@/Waffle'
import {
  type Dispatch,
  useCallback,
  useState,
  type SetStateAction,
} from 'react'

export const waffleDataEmpty = [
  {
    id: 'alpha',
    label: 'Still to count',
    value: 80,
    color: 'var(--white-200)',
  },
  { id: 'beta', label: 'Left', value: 250, color: 'red' },
  { id: 'delta', label: 'Center', value: 100, color: 'yellow' },
  { id: 'omega', label: 'Right', value: 50, color: '#919294' },
]

export interface DateTimeFormatOptions {
  locale?: string | string[]
  timeZone?: Intl.DateTimeFormatOptions['timeZone']
  hour12?: Intl.DateTimeFormatOptions['hour12']
  weekday?: Intl.DateTimeFormatOptions['weekday']
  era?: Intl.DateTimeFormatOptions['era']
  year?: Intl.DateTimeFormatOptions['year']
  month?: Intl.DateTimeFormatOptions['month']
  day?: Intl.DateTimeFormatOptions['day']
  hour?: Intl.DateTimeFormatOptions['hour']
  minute?: Intl.DateTimeFormatOptions['minute']
  second?: Intl.DateTimeFormatOptions['second']
  timeZoneName?: Intl.DateTimeFormatOptions['timeZoneName']
}

export function formatDateTime(
  date: Date,
  options: DateTimeFormatOptions = {},
): string {
  const {
    locale = 'en-US',
    timeZone = undefined,
    hour12 = options.timeZoneName !== undefined,
    weekday,
    era,
    year = 'numeric',
    month = 'numeric',
    day = 'numeric',
    hour,
    minute,
    second,
    timeZoneName,
  } = options

  const dateTimeFormat = new Intl.DateTimeFormat(locale, {
    timeZone,
    hour12,
    weekday,
    era,
    year,
    month,
    day,
    ...(hour !== undefined ? { hour } : {}),
    ...(minute !== undefined ? { minute } : {}),
    ...(second !== undefined ? { second } : {}),
    timeZoneName,
  })

  return dateTimeFormat.format(date)
}

export interface NumberFormatOptions {
  locale?: string | string[]
  style?: Intl.NumberFormatOptions['style']
  currency?: Intl.NumberFormatOptions['currency']
  currencyDisplay?: Intl.NumberFormatOptions['currencyDisplay']
  useGrouping?: Intl.NumberFormatOptions['useGrouping']
  minimumIntegerDigits?: Intl.NumberFormatOptions['minimumIntegerDigits']
  minimumFractionDigits?: Intl.NumberFormatOptions['minimumFractionDigits']
  maximumFractionDigits?: Intl.NumberFormatOptions['maximumFractionDigits']
  minimumSignificantDigits?: Intl.NumberFormatOptions['minimumSignificantDigits']
  maximumSignificantDigits?: Intl.NumberFormatOptions['maximumSignificantDigits']
}

export function formatNumber(
  value: number,
  options: NumberFormatOptions = {},
): string {
  const {
    locale = 'en-US',
    style = 'decimal',
    currency = 'USD',
    currencyDisplay = 'symbol',
    useGrouping = true,
    minimumIntegerDigits = 1,
    minimumFractionDigits = 0,
    maximumFractionDigits = 3,
    minimumSignificantDigits,
    maximumSignificantDigits,
  } = options

  const numberFormat = new Intl.NumberFormat(locale, {
    style,
    currency,
    currencyDisplay,
    useGrouping,
    minimumIntegerDigits,
    minimumFractionDigits,
    maximumFractionDigits,
    minimumSignificantDigits,
    maximumSignificantDigits,
  })

  return numberFormat.format(value)
}

export function pluralize(word: string, count: number): string {
  if (count === 1) {
    return word
  }

  const irregularPlurals: Record<string, string> = {
    child: 'children',
    foot: 'feet',
    man: 'men',
    woman: 'women',
    tooth: 'teeth',
    mouse: 'mice',
    person: 'people',
  }

  if (irregularPlurals[word] !== undefined && irregularPlurals[word] !== '') {
    return irregularPlurals[word]
  }

  const lastLetter = word.slice(-1)
  const secondToLastLetter = word.slice(-2, -1)

  if (
    lastLetter === 's' ||
    lastLetter === 'x' ||
    lastLetter === 'z' ||
    secondToLastLetter + lastLetter === 'sh' ||
    secondToLastLetter + lastLetter === 'ch'
  ) {
    return word + 'es'
  } else if (lastLetter === 'y' && !/[aeiou]/.test(secondToLastLetter)) {
    return word.slice(0, -1) + 'ies'
  } else {
    return word + 's'
  }
}

export const classes = (...params: unknown[]): string =>
  params.filter(Boolean).join(' ')

interface ListItem extends WaffleItem {}

export const useItems = (
  initial: WaffleItem[],
): [
  WaffleItem[],
  {
    setItems: Dispatch<SetStateAction<WaffleItem[]>>
    clearItems: () => void
    prependItem: (item: WaffleItem) => void
    appendItem: (item: WaffleItem) => void
    removeItemById: (id: string) => void
    removeItemByIndex: (index: number) => void
    isInList: (id: string) => boolean
  },
] => {
  const [items, setItems] = useState(initial)
  return [
    items,
    {
      setItems,
      clearItems: useCallback(() => {
        setItems(() => [])
      }, []),
      prependItem: useCallback((item: WaffleItem) => {
        setItems(previousItems => [item, ...previousItems])
      }, []),
      appendItem: useCallback((item: WaffleItem) => {
        setItems(previousItems => [...previousItems, item])
      }, []),
      removeItemById: useCallback((id: string) => {
        setItems(oldItems => oldItems.filter(oldItem => oldItem.id !== id))
      }, []),
      removeItemByIndex: useCallback((index: number) => {
        setItems(oldItems => oldItems.filter((_, i) => i !== index))
      }, []),
      isInList: useCallback(
        (id: string) => items.map(item => item.id).includes(id),
        [items],
      ),
    },
  ]
}
