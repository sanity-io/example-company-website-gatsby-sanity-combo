/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import sanityClient from 'part:@sanity/base/client'
import Spinner from 'part:@sanity/components/loading/spinner'
import GoogleSearchResult from './GoogleSearchResult'
import TwitterCard from './TwitterCard'
import FacebookShare from './FacebookShare'

class SeoPreviews extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object
  }

  static defaultProps = {
    document: null
  }

  render () {
    const {options} = this.props
    const {displayed} = this.props.document

    return (
      <>
        <GoogleSearchResult document={displayed} options={options} />
        <TwitterCard document={displayed} options={options} />
        <FacebookShare document={displayed} options={options} />
      </>
    )
  }
}

export default SeoPreviews
