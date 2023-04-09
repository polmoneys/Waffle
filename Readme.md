## TLDR

Simplest Waffle with `svg` & `react`. [Demo](https://polmoneys.github.io/Waffle/)

### Waffle

Some props to get you started. 

```ts

export interface WaffleItem {
label: string
value: number
color?: string
id: string
}

interface WaffleChartProps {
data: WaffleItem[]
layout?: string[]
columns: number
rows?: number
cellSize?: number
cellGap?: number
onSelectItem?: (point: WaffleItem) => void
canSelect?: boolean
onSelect?: (summary: any) => void
}


```

### Free the Waffles

DIY version available, you `draw a map` with empty spaces as `e` and filled with `x`. 

```ts

<WaffleChart
data={waffleData}
layout={[
'x',
'x',
'x',
'e',
'e',
'x',
'x',
'x',
'x',
'x',
'e',
'e',
'x',
'x',
'x',
'x',
'x',
'e',
'e',
'x',
'x',
'x',
'x',
'x',
'e',
'e',
'x',
'x',
'x',
'x',
'x',
'e',
'e',
'x',
'x',
'x',
'x',
'x',
'e',
'e',
'x',
'x',
]}
columns={7}
cellSize={20}
cellGap={2}
/> 

```


### Related

Previous work with [Sparklines](https://github.com/polmoneys/Sparkline) and [Charts](https://github.com/polmoneys/charts).


### Inspiration 💐

> Our requirements are more modest but at the same time more responsible: 
> buildings, furniture, drinking glasses may well be consumer items that 
> we can destroy without regret after they have served for some short or 
> long period, but while we use them we expect them to fullfill their role and serve us perfectly, so perfectly that we can also derive aesthetic 
> enjoyment from observing them in use. 

Erik Gunnar Asplund on **Swedish Grace**.


