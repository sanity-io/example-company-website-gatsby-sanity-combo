import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
import { Link } from 'gatsby'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockContent from './block-content'
import Container from './container'
import RoleList from './role-list'
import {getBlogUrl} from '../lib/helpers'

import styles from './project.module.css'

function Project (props) {
  const { _rawBody, title, categories, mainImage, members, publishedAt, relatedProjects, relatedPosts } = props
  return (
    <article className={styles.root}>
      {props.mainImage && mainImage.asset && (
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
                  <Link to={`/country/${category.slug.current}`}>{category.title}</Link>
                ))}
              </div>
            )}
            {_rawBody && <BlockContent blocks={_rawBody || []} />}
            {relatedPosts && (
              <div className={styles.relatedPosts}>
                <h3 className={styles.relatedPostsHeadline}>Posts</h3>
                <ul>
                  {relatedPosts.map(post => (
                    <li key={post._id}>
                      <Link to={getBlogUrl(post.publishedAt, post.slug)}>{post.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </article>
  )
}

export default Project
