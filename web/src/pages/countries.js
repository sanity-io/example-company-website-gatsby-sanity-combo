import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import CategoryPreviewGrid from '../components/category-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'

import { responsiveTitle1 } from '../components/typography.module.css'

export const query = graphql`
  query CategoriesPageQuery {
    categories: allSanityCategory( sort: { fields: [_createdAt, title], order: DESC }) {
      edges {
        node {
          id
          title
          mainImage {
            asset {
              _id
            }
            alt
          }
          description
          slug {
            current
          }
        }
      }
    }
  }
`

const CategoryPage = props => {
  const { data, errors } = props
  console.log(data)
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const categoryNodes = data && data.categories && mapEdgesToNodes(data.categories)

  return (
    <Layout>
      <SEO title='Countries' />
      <Container>
        <h1 className={responsiveTitle1}>Countries</h1>
        {categoryNodes && categoryNodes.length > 0 && <CategoryPreviewGrid nodes={categoryNodes} />}
      </Container>
    </Layout>
  )
}

export default CategoryPage
