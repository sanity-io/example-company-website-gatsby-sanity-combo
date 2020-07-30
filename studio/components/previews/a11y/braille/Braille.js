import React, {useState} from 'react'
// remember to install this dependency if you use this in your own project
import br from 'braille'
import DefaultSelect from 'part:@sanity/components/selects/default'

import styles from './Braille.css'

const defaultFields = ['title', 'excerpt', 'body']

const blocksToText = (blocks, opts = {}) => {
  const defaultBehaviors = {nonTextBehavior: 'remove'}
  const options = Object.assign({}, defaultBehaviors, opts)
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }
      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}

function Braille ({document, fields}) {
  const {displayed} = document
  const [activeField, setActiveField] = useState('title')

  const fieldsAvailableForBraille = () => {
    return (fields || defaultFields).filter(field => !!displayed[field])
  }

  const textToBraille = () => {
    if (typeof displayed[activeField] === 'string') {
      return br.toBraille(displayed[activeField])
    }
    // we're in Portable Text now, digging into blocks
    return br.toBraille(blocksToText(displayed[activeField] || []))
  }
  const fieldObjects = fieldsAvailableForBraille().map(field => ({title: field}))
  const activeFieldObject = fieldObjects.find(obj => obj.title === activeField)

  return (<div className={styles.wrapper}>
    <div className={styles.selectionWrapper}>
      <DefaultSelect
        items={fieldObjects}
        value={activeFieldObject}
        onChange={({title}) => setActiveField(title)}
      />
    </div>
    <h3 className={styles.transcriptHeading}>Transcript</h3>
    <p className={styles.transcriptBody}>{textToBraille()}</p>
    <p className={styles.disclaimer}><small>This is of course only a visual representation of <a href='https://en.wikipedia.org/wiki/Braille'>six-point Braille</a>, and only useful for sighted people to get an impression of it will look like. For this to be actually useful for people who can read it, the component has to be connected to a Braille tablet. There are efforts bringing JavaScript, IoT, and accessibility together, <a href='https://www.youtube.com/watch?v=to_055yx3Rc'>such as this talk</a>.</small></p>
  </div>)
}

export default Braille
