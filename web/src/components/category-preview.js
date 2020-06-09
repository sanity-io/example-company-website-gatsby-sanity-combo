import { Link } from 'gatsby'
import React from 'react'
import { imageUrlFor } from '../lib/image-url'
import { buildImageObj } from '../lib/helpers'
import BlockText from './block-text'

import styles from './project-preview.module.css'

function CategoryPreview (props) {
  return (
    <Link className={styles.root} to={`/country/${props.slug.current}`}>
        <div className={styles.leadMediaThumb}>
        {props.mainImage && props.mainImage.asset && (
          <img
            src={imageUrlFor(buildImageObj(props.mainImage))
              .width(600)
              .height(Math.floor((9 / 16) * 600))
              .url()}
            alt={props.mainImage.alt}
          />
        )}
      </div>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </Link>
  )
}

export default CategoryPreview
