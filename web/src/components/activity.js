import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
import { Link } from 'gatsby'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockContent from './block-content'
import Container from './container'
import RoleList from './role-list'
import {getActivityUrl} from '../lib/helpers'
import styles from './blog-post.module.css'

function Activity (props) {
  const { _rawBody, categories, title, mainImage, publishedAt } = props
  return (
    <article className={styles.root}>
      {mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit('crop')
              .url()}
            alt={mainImage.alt}
          />
        </div>
      )}
      <Container>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <h1 className={styles.title}>{title}</h1>
            {categories && (
              <div className={styles.categories}>
                {categories.map(category => (
                  <Link to={`/categories/${category.slug.current}`}>{category.title}</Link>
                ))}
              </div>
            )}
            {_rawBody && <BlockContent blocks={_rawBody || []} />}
            {title}
          </div>
        </div>
      </Container>
    </article>
  )
}

export default Activity
