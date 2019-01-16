import React from 'react'
import BlockText from './block-text'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'

import styles from './people-grid.module.css'
import { responsiveTitle2 } from '../components/typography.module.css'

function ProfileCard ({ image, name, _rawBio }) {
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileMediaThumb}>
        {image && image.asset && (
          <img
            src={imageUrlFor(buildImageObj(image))
              .width(600)
              .height(600)
              .fit('crop')
              .url()}
          />
        )}
      </div>
      <h2 className={styles.headline}>{name}</h2>
      {_rawBio && (
        <div className={styles.bio}>
          <BlockText blocks={_rawBio} />
        </div>
      )}
    </div>
  )
}

function PeopleGrid ({ items, title }) {
  return (
    <div className={styles.root}>
      {<h2 className={responsiveTitle2}>{title}</h2>}
      <ul className={styles.grid}>
        {items.map(item => (
          <li key={item.id}>
            <ProfileCard {...item} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PeopleGrid
