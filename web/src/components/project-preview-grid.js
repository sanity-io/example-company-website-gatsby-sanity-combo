import { Link } from 'gatsby'
import React from 'react'
import ProjectPreview from './project-preview'

import styles from './project-preview-grid.module.css'

function ProjectPreviewGrid (props) {
  return (
    <div className={styles.root}>
      {props.title && (
        <h2 className={styles.headline}>
          {props.browseMoreHref ? (
            <Link to={props.browseMoreHref}>{props.title}</Link>
          ) : (
            props.title
          )}
        </h2>
      )}
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.map(node => (
            <li key={node.id}>
              <ProjectPreview {...node} />
            </li>
          ))}
      </ul>
      {props.browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link to={props.browseMoreHref}>Browse more</Link>
        </div>
      )}
    </div>
  )
}

ProjectPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default ProjectPreviewGrid
