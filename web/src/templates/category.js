import React from 'react'
import {graphql, Link} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
// Import a function to build the blog URL
import {getBlogUrl} from '../lib/helpers'
import {getProjectUrl} from '../lib/helpers'
import {getActivityUrl} from '../lib/helpers'

// Add “posts” to the GraphQL query
export const query = graphql`
  query CategoryTemplateQuery($id: String!) {
    category: sanityCategory(id: {eq: $id}) {
      title
      description
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
  const {title, description, posts, projects, activities} = data.category || {}
  console.log(data)
  return (
    <Layout>
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