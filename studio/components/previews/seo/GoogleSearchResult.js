/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import {assemblePageUrl, toPlainText} from './frontendUtils'
import Truncate from './Truncate'
import styles from './GoogleSearchResult.css'

class GoogleSearchResult extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object,
    width: PropTypes.number,
    route: PropTypes.object
  }

  static defaultProps = {
    document: null,
    width: 500
  }

  render () {
    const {document, options, width} = this.props
    const {title, excerpt, mainImage: openGraphImage} = document
    const url = assemblePageUrl({document, options})

    return (
      <div className={styles.seoItem}>
        <h3>Google search result preview</h3>
        <div className={styles.googleWrapper} style={{width}}>
          <Truncate maxWidth={width} className={styles.title}>
            {title}
          </Truncate>
          <div className={styles.url}>{url}</div>
          {excerpt && <Truncate maxChars={300} className={styles.description}>
            {toPlainText(excerpt)}
          </Truncate>}
        </div>
      </div>
    )
  }
}

export default GoogleSearchResult
