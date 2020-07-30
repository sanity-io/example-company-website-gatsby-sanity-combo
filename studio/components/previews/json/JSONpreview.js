import React from 'react'

function JSONpreview ({options, document}) {
  const {displayed} = document
  const {indentation = 2} = options
  const JSONstring = JSON.stringify(displayed, null, indentation)

  return (<pre>{JSONstring}</pre>)
}

export default JSONpreview
