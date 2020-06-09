import React from 'react'
import {graphql, Link} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
// Import a function to build the blog URL
import {getBlogUrl} from '../lib/helpers'
import {getProjectUrl} from '../lib/helpers'
import {getActivityUrl} from '../lib/helpers'

import styles from './category.module.css'

// Add “posts” to the GraphQL query
export const query = graphql`
  query CategoryTemplateQuery($id: String!) {
    category: sanityCategory(id: {eq: $id}) {
      title
      description
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
      posts {
        _id
        title
        publishedAt
        slug {
          current
        }
      }
      projects {
        _id
        title
        slug {
          current
        }
      }
      activities {
        _id
        title
        slug {
          current
        }
      }
    }
  }
`
const CategoryPostTemplate = props => {
  const {data = {}, errors} = props
  // Destructure the new posts property from props
  const {title, description, mainImage, posts, projects, activities} = data.category || {}
  console.log(data)
  return (
    <Layout>
      {mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit('crop')
              .url()}
            alt={mainImage.alt}
          />
        </div>
      )}
      <Container>
        {errors && <GraphQLErrorList errors={errors} />}
        {!data.category && <p>No category data</p>}
        <SEO title={title} description={description} />
        <article>
          <h1>{title}</h1>
          <p>{description}</p>
          {/*
            If there are any posts, add the heading,
            with the list of links to the posts
          */}
          {projects && (
            <React.Fragment>
              <h3>Places</h3>
              <ul>
                { projects.map(project => (
                  <li key={project._id}>
                    <Link to={getProjectUrl(project.slug)}>{project.title}</Link>
                  </li>))
                }
              </ul>
            </React.Fragment>)
          }
          {/*
            If there are any posts, add the heading,
            with the list of links to the posts
          */}
          {posts && (
            <React.Fragment>
              <h3>Posts</h3>
              <ul>
                { posts.map(post => (
                  <li key={post._id}>
                    <Link to={getBlogUrl(post.publishedAt, post.slug)}>{post.title}</Link>
                  </li>))
                }
              </ul>
            </React.Fragment>)
          }
          {activities && (
            <React.Fragment>
              <h3>Activities</h3>
              <ul>
                { activities.map(activity => (
                  <li key={activity._id}>
                    <Link to={getActivityUrl(activity.slug)}>{activity.title}</Link>
                  </li>))
                }
              </ul>
            </React.Fragment>)
          }
        </article>
      </Container>
    </Layout>
  )
}

export default CategoryPostTemplate