import { Link } from 'gatsby'
import React from 'react'
import { imageUrlFor } from '../lib/image-url'
import BlockText from './block-text'

import styles from './project-preview.module.css'

function CategoryPreview (props) {
  return (
    <Link className={styles.root} to={`/categories/${props.slug.current}`}>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </Link>
  )
}

export default CategoryPreview
