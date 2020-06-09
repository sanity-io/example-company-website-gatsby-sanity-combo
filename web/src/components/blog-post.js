import { format, distanceInWords, differenceInDays } from 'date-fns'
import React from 'react'
import { Link } from 'gatsby'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockContent from './block-content'
import Container from './container'
import RoleList from './role-list'

import styles from './blog-post.module.css'

function BlogPost (props) {
  const { _rawBody, authors, categories, relatedProjects, title, mainImage, publishedAt } = props
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
            <div className={styles.metaContent}>
              {categories && (
                <span className={styles.categories}>
                  {categories.map(category => (
                    <Link to={`/country/${category.slug.current}`}>{category.title}</Link>
                  ))}
                </span>
              )}
              {relatedProjects && (
                <span className={styles.relatedProjects}>
                  {relatedProjects.map(project => (
                    <span key={`related_${project._id}`}>
                      <Link to={`/place/${project.slug.current}`}>{project.title}</Link>
                    </span>
                  ))}
                </span>
              )}
              {publishedAt && (
                <div className={styles.publishedAt}>
                  {differenceInDays(new Date(publishedAt), new Date()) > 3
                    ? distanceInWords(new Date(publishedAt), new Date())
                    : format(new Date(publishedAt), 'MMMM Do YYYY')}
                </div>
              )}
            </div>
            {_rawBody && <BlockContent blocks={_rawBody} />}
          </div>
          <aside className={styles.metaContent}>
            {authors && <RoleList items={authors} title='Author' />}
          </aside>
        </div>
      </Container>
    </article>
  )
}

export default BlogPost
