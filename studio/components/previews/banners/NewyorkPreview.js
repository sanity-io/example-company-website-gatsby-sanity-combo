import React from 'react'
import IrlPreview from './IrlPreview'
import NewyorkBanner from './NewyorkBanner'

const nmatrix = [0.2162859941465178, -0.010347087937701097, 0, -0.025618315956140374, -0.0020753476507044243, 0.557358985595646, 0, -0.2893248420055018, 0, 0, 1, 0, -0.2099979052341303, 0.0021023151699736853, 0, 1.0000001429799565]

const NewyorkPreview = ({document}) => {
  if (!document.displayed) {
    return <div>No document to preview</div>
  }
  return (
    <IrlPreview nmatrix={nmatrix} adHeight={170} adWidth={100} bgSrc='/static/new_york.png'>
      <NewyorkBanner document={document.displayed} />
    </IrlPreview>
  )
}

export default NewyorkPreview
