import React from 'react'
import GatsbyImage from 'gatsby-image'
import { getFluidGatsbyImage } from 'gatsby-source-sanity'
import { api as sanityConfig } from '../../../../studio/sanity.json'

import styles from './figure.module.css'

function Figure (props) {
  return (
    <figure className={styles.root}>
      {props.asset && (
        <GatsbyImage
          fluid={getFluidGatsbyImage(props, { maxWidth: 1200 }, sanityConfig)}
          alt={props.alt}
        />
      )}
      <figcaption className={styles.caption}>{props.caption}</figcaption>
    </figure>
  )
}

export default Figure
