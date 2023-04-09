import { Fragment, useState } from 'react'
import { Leva } from 'leva'

import './app.css'
import { WaffleStory } from './stories/waffle'

export default function App(): JSX.Element {
  return (
    <Fragment>
      <Leva
        // oneLineLabels
        hideCopyButton
        titleBar={{
          title: '<Waffle/>',
          filter: false,
        }}
      />
      <main>
        <WaffleStory />
      </main>
    </Fragment>
  )
}
