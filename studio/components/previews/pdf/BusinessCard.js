/* eslint-disable react/no-unused-prop-types, react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'

// remember to install these dependencies
import {of} from 'rxjs'
import {map, switchMap, throttleTime} from 'rxjs/operators'
import imageUrlBuilder from '@sanity/image-url'

// the dependencies below are already present in the studio
import Spinner from 'part:@sanity/components/loading/spinner'
import sanityClient from 'part:@sanity/base/client'
import styles from './BusinessCard.css'

const fileType = 'png'
const cardServiceHost = 'https://json-to-pdf.sanity-io.now.sh'
// const cardServiceHost = 'http://localhost:3000'
const cardServiceBaseUrl = `${cardServiceHost}/api/business-card`

const builder = imageUrlBuilder(sanityClient)

const urlFor = source => {
  return builder.image(source)
}

const arrayBufferToBase64 = arrbuf => {
  const u8bit = new Uint8Array(arrbuf)
  return btoa(u8bit.reduce((data, byte) => data + String.fromCharCode(byte), ''))
}

class BusinessCard extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object
  }

  static defaultProps = {
    document: null
  }

  state = {
    businessCardImage: null,
    cardServiceUrls: null,
    isFlipped: false,
    error: null
  }

  componentDidMount () {
    this.fetchData()
  }

  componentWillUnmount () {
    if (this.fetchSubscription) {
      this.fetchSubscription.unsubscribe()
    }
  }

  componentDidUpdate (prevProps) {
    const oldDoc = JSON.stringify(prevProps.document.displayed)
    const currentDoc = JSON.stringify(this.props.document.displayed)
    if (oldDoc !== currentDoc) {
      this.fetchData()
    }
  }

  assembleCardServiceUrls = () => {
    const {displayed} = this.props.document
    return sanityClient.observable.fetch('*[_id == "siteSettings"][0]').pipe(
      map(siteConfig => {
        const doc = {...displayed}
        if (siteConfig.logo) {
          const siteLogoImageUrl = urlFor(siteConfig.logo)
            .width(500)
            .url()
          doc.imageUrl = siteLogoImageUrl
        }
        const stringifiedDoc = encodeURIComponent(JSON.stringify(doc))

        return {
          png: `${cardServiceBaseUrl}?fileType=png&document=${stringifiedDoc}`,
          pdf: `${cardServiceBaseUrl}?fileType=pdf&document=${stringifiedDoc}`
        }
      })
    )
  }

  fetchData = async () => {
    if (this.fetchSubscription) {
      this.fetchSubscription.unsubscribe()
    }

    console.log('fetchData')
    this.fetchSubscription = of(null)
      .pipe(
        throttleTime(1000),
        switchMap(() => this.assembleCardServiceUrls()),
        switchMap(cardServiceUrls => {
          this.setState({cardServiceUrls})
          return fetch(cardServiceUrls.png)
        }),
        switchMap(response => response.arrayBuffer()),
        map(arrayBuffer => `data:image/${fileType};base64,${arrayBufferToBase64(arrayBuffer)}`)
      )
      .subscribe({
        next: businessCardImage => this.setState({businessCardImage}),
        error: error => this.setState({error})
      })
  }

  handleCardFlip = () => {
    this.setState(({isFlipped}) => ({
      isFlipped: !isFlipped
    }))
  }

  render () {
    const {displayed} = this.props.document
    const {businessCardImage, cardServiceUrls, isFlipped, error} = this.state
    const {name} = displayed

    if (error) {
      return (
        <div>
          <p>Ooops. Got an error while fetching preview :/</p>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )
    }
    if (!businessCardImage) {
      return <Spinner center message='Fetching business card' />
    }

    return (
      <div className={styles.root}>
        <h3>{`Business card for: ${name}`}</h3>
        <div className={styles.cardScene} onClick={this.handleCardFlip}>
          <div className={`${styles.card} ${isFlipped ? styles.isFlipped : ''}`}>
            <div className={styles.cardFace}>
              <img src={businessCardImage} />
            </div>
            <div className={`${styles.cardFace} ${styles.cardBack}`} />
          </div>
        </div>
        <div className={styles.downloadLink}>
          <a href={cardServiceUrls.pdf}>Download PDF</a>
        </div>
      </div>
    )
  }
}

export default BusinessCard
