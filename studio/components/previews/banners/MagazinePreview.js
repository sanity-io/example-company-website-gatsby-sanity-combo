import React from 'react'
import IrlPreview from './IrlPreview'
import MagazineFrontpage from './MagazineFrontpage'

const nmatrix = [0.20825408585799626, -0.2525181970854367, 0, 0.09095416491609024, 0.32493141314502705, 0.24457387371585174, 0, -0.1070951029096336, 0, 0, 1, 0, 0.21450732447343718, -0.03460954310518022, 0, 1.000000215842422]

const NewyorkPreview = ({document}) => {
  if (!document.displayed) {
    return <div>No document to preview</div>
  }
  return (
    <IrlPreview nmatrix={nmatrix} adHeight={400} adWidth={400} bgSrc='https://cdn.sanity.io/images/uj2a9mdf/production/509e159dbd7ea243a82f2ec42a84fb563f99099a-4310x2952.jpg?w=1000&h=1000&fit=max'>
      <MagazineFrontpage document={document.displayed} />
    </IrlPreview>
  )
}

export default NewyorkPreview
