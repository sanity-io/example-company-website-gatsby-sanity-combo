/* eslint-disable react/jsx-no-bind */
import React from 'react'
import PropTypes from 'prop-types'
import Moveable from 'react-moveable'
import {ResizeObserver} from 'resize-observer'
import RadioButtons from 'part:@sanity/components/selects/radio'
import styles from './IrlPreview.css'

const IMG_FILTERS = [
  {title: 'Aden', name: 'aden'},
  {title: 'Brooklyn', name: 'brooklyn'},
  {title: 'Amaro', name: 'amaro'},
  {title: 'Gingham', name: 'gingham'}
]

/*
  The warp matrix that is created by Moveable is only valid for a certain pixel-space,
  which means that when you resize the image, the matrix is no longer valid.

  We solve this by storing a _normalized matrix_ which works in unit-space. The way
  to think about this is that we construct a scaling matrix which converts from
  pixel-space to unit-space.

    Let M' be the normalized matrix.

    Then M (the matrix that works in pixel-space) is:
      M = inv(S) * M' * S

    Thus:
      M' = S * M * inv(S)

    where scaling matrix is defined as:
      S = I*(1/width, 1/height, 1, 1)
*/

/*
  Converts a 4x4 matrix to work in a different linearly-spaced space.

  Let S be:
    x 0 0 0
    0 y 0 0
    0 0 1 0
    0 0 0 1

  Then this modified the matrix such that it becomes:
    inv(S) * M * S
*/

function scaleMatrix (matrix, x, y) {
  for (let i = 0; i < 4; i++) matrix[i] *= x
  for (let i = 4; i < 8; i++) matrix[i] *= y
  for (let i = 0; i < 16; i += 4) matrix[i] /= x
  for (let i = 1; i < 16; i += 4) matrix[i] /= y
}

function pct (n) {
  return n * 100 + '%'
}

const MATRIX_INITIAL = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]

class IrlPreview extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      imgFilter: IMG_FILTERS[0],
      isEditMode: false,
      nmatrix: this.props.nmatrix || MATRIX_INITIAL
    }
    this.bgRef = React.createRef()
    this.adWrapper = React.createRef()
    this.resizeObserver = undefined
  }

  static propTypes = {
    matrix: PropTypes.array,
    bgSrc: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    matrix: []
  }

  componentDidMount () {
    this.resizeObserver = new ResizeObserver(this.updateSize)
    if (this.bgRef && this.bgRef.current) {
      this.resizeObserver.observe(this.bgRef.current)
    }
  }

  componentWillUnmount () {
    if (this.resizeObserver && this.bgRef && this.bgRef.current) {
      this.resizeObserver.unobserve(this.bgRef.current)
    }
  }

  handleImgFilterChange = item => {
    this.setState({
      imgFilter: item
    })
  }

  handleShowEditMode = () => {
    this.setState({
      isEditMode: true
    })
  }

  handleHideEditMode = () => {
    this.setState({
      isEditMode: false
    })
  }

  updateSize = () => {
    const bg = this.bgRef.current

    if (bg) {
      this.setState({
        width: bg.clientWidth,
        height: bg.clientHeight
      })
    }
  }

  render () {
    const {bgSrc, children, adWidth = 400, adHeight = 400} = this.props
    const {isEditMode, imgFilter, nmatrix, width, height} = this.state

    const adTarget = this.adWrapper.current

    // const hasSize = width > 0 && height > 0
    // TODO: Show loading-indicator before we have size?

    // Convert to pixel-space.
    const matrix = nmatrix.slice()
    scaleMatrix(matrix, 1 / width, 1 / height)

    const scaleX = width / adWidth
    const scaleY = height / adHeight

    return (
      <div className={styles.root}>
        {/* UNCOMMENT TO ENABLE FILTER SELECTION */}
        {/* <div className={styles.radioWrapper}>
          <label>Filter</label>
          <RadioButtons
            value={imgFilter}
            items={IMG_FILTERS}
            onChange={this.handleImgFilterChange}
          />
        </div> */}
        <div
          className={`${styles.previewWrapper} ${styles.filter} ${styles[imgFilter.name]}`}
          onMouseEnter={this.handleShowEditMode}
          onMouseLeave={this.handleHideEditMode}
        >
          <img
            className={styles.backgroundImage}
            src={bgSrc}
            ref={this.bgRef}
            onLoad={this.updateSize}
          />

          {adTarget && isEditMode && (
            <Moveable
              target={adTarget}
              warpable
              onWarpStart={({set}) => {
                set(matrix)
              }}
              onWarp={({matrix}) => {
                // Convert to unit-space
                const nmatrix = matrix.slice()
                scaleMatrix(nmatrix, width, height)
                this.setState({nmatrix})
              }}
            />
          )}
          <div
            ref={this.adWrapper}
            className={styles.adWrapper}
            style={{transform: `matrix3d(${matrix.join(',')})`}}
          >
            <div
              style={{
                width: pct(1 / scaleX),
                height: pct(1 / scaleY),
                transform: `scale(${scaleX}, ${scaleY})`,
                transformOrigin: 'top left'
              }}
            >
              {children}
            </div>
          </div>
        </div>
        <div>
          <p>To save the position you have warped the ad into, replace the current <code>nmatrsanitix</code> array in your preview component with this new <code>nmatrix</code> array:</p>
          <pre className={styles.nmatrix}>nmatrix = {JSON.stringify(nmatrix)}</pre>
        </div>
      </div>
    )
  }
}

export default IrlPreview
