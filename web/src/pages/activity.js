import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ActivityPreviewGrid from '../components/activity-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'

import { responsiveTitle1 } from '../components/typography.module.css'

export const query = graphql`
  query ActivitiesPageQuery {
    activities: allSanityActivity( sort: { fields: [publishedAt], order: DESC }) {
      edges {
        node {
          id
          mainImage {
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

const ActivitiesPage = props => {
  const { data, errors } = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const activityNodes =
    data && data.activities && mapEdgesToNodes(data.activities).filter(filterOutDocsWithoutSlugs)
  return (
    <Layout>
      <SEO title='Places' />
      <Container>
        <h1 className={responsiveTitle1}>Places</h1>
        {activityNodes && activityNodes.length > 0 && <ActivityPreviewGrid nodes={activityNodes} />}
      </Container>
    </Layout>
  )
}

export default ActivitiesPage
