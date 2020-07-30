import React from 'react'
import IrlPreview from './IrlPreview'
import OsakaBanner from './OsakaBanner'

const nmatrix = [0.21577131124299567, 0.040267097929579006, 0, 0.15328549787705295, -0.0036966826969444494, 0.7092047925882513, 0, -0.16488080908566455, 0, 0, 1, 0, 0.04924368485178665, -0.07263236962611863, 0, 1.0000005830670946]

const OsakaPreview = ({document}) => {
  if (!document.displayed) {
    return <div>No document to preview</div>
  }
  return (
    <IrlPreview nmatrix={nmatrix} adWidth={150} adHeight={260} bgSrc='/static/osaka.png'>
      <OsakaBanner document={document.displayed} />
    </IrlPreview>
  )
}

export default OsakaPreview
