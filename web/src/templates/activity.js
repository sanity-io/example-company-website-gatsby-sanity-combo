import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Activity from '../components/activity'
import Layout from '../containers/layout'

export const query = graphql`
  query ActivityTemplateQuery($id: String!) {
    activity: sanityActivity(id: { eq: $id }) {
      id
      publishedAt
      categories {
        _id
        title
        slug {
          current
        }
      }
      mainImage {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
        }
        alt
      }
      title
      slug {
        current
      }
      relatedProjects {
        title
        _id
        slug {
          current
        }
      }
      _rawBody
    }
  }
`

const ActivityTemplate = props => {
  const { data, errors } = props
  console.log(data)
  const activity = data && data.activity
  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      {activity && <SEO title={activity.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {activity && <Activity {...activity} />}
    </Layout>
  )
}

export default ActivityTemplate
