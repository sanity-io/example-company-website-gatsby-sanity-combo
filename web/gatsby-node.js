const { format } = require('date-fns')

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createBlogPostPages (graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityPost(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityPost || {}).edges || []

  postEdges.forEach((edge, index) => {
    const { id, slug = {}, publishedAt } = edge.node
    const dateSegment = format(publishedAt, 'YYYY/MM')
    const path = `/blog/${dateSegment}/${slug.current}/`

    reporter.info(`Creating blog post page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/blog-post.js'),
      context: { id }
    })
  })
}

async function createProjectPages (graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityProject(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const projectEdges = (result.data.allSanityProject || {}).edges || []

  projectEdges.forEach(edge => {
    const id = edge.node.id
    const slug = edge.node.slug.current
    const path = `/place/${slug}/`

    reporter.info(`Creating project page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/project.js'),
      context: { id }
    })
  })
}

async function createCategoryPages (graphql, actions) {
  // Get Gatsby‘s method for creating new pages
  const {createPage} = actions
  // Query Gatsby‘s GraphAPI for all the categories that come from Sanity
  // You can query this API on http://localhost:8000/___graphql
  const result = await graphql(`{
    allSanityCategory {
      nodes {
        title
        slug {
          current
        }
        id
      }
    }
  }
  `)
  // If there are any errors in the query, cancel the build and tell us
  if (result.errors) throw result.errors

  // Let‘s gracefully handle if allSanityCatgogy is null
  const categoryNodes = (result.data.allSanityCategory || {}).nodes || []

  categoryNodes
    // Loop through the category nodes, but don't return anything
    .forEach((node) => {
      // Desctructure the id and slug fields for each category
      const {id, slug = {}} = node
      // If there isn't a slug, we want to do nothing
      if (!slug) return

      // Make the URL with the current slug
      const path = `/country/${slug.current}`

      // Create the page using the URL path and the template file, and pass down the id
      // that we can use to query for the right category in the template file
      createPage({
        path,
        component: require.resolve('./src/templates/category.js'),
        context: {id}
      })
    })
}

async function createActivityPages (graphql, actions) {
  // Get Gatsby‘s method for creating new pages
  const {createPage} = actions
  // Query Gatsby‘s GraphAPI for all the categories that come from Sanity
  // You can query this API on http://localhost:8000/___graphql
  const result = await graphql(`{
    allSanityActivity {
      nodes {
        title
        slug {
          current
        }
        id
      }
    }
  }
  `)
  // If there are any errors in the query, cancel the build and tell us
  if (result.errors) throw result.errors

  // Let‘s gracefully handle if allSanityCatgogy is null
  const activityNodes = (result.data.allSanityActivity || {}).nodes || []

  activityNodes
    // Loop through the activity nodes, but don't return anything
    .forEach((node) => {
      // Desctructure the id and slug fields for each activity
      const {id, slug = {}} = node
      // If there isn't a slug, we want to do nothing
      if (!slug) return

      // Make the URL with the current slug
      const path = `/activities/${slug.current}`

      // Create the page using the URL path and the template file, and pass down the id
      // that we can use to query for the right activity in the template file
      createPage({
        path,
        component: require.resolve('./src/templates/activity.js'),
        context: {id}
      })
    })
}

exports.createResolvers = ({createResolvers}) => {
  const resolvers = {
    SanityCategory: {
      posts: {
        type: ['SanityPost'],
        resolve (source, args, context, info) {
          return context.nodeModel.runQuery({
            type: 'SanityPost',
            query: {
              filter: {
                categories: {
                  elemMatch: {
                    _id: {
                      eq: source._id
                    }
                  }
                }
              }
            }
          })
        }
      },
      activities: {
        type: ['SanityActivity'],
        resolve (source, args, context, info) {
          return context.nodeModel.runQuery({
            type: 'SanityActivity',
            query: {
              filter: {
                categories: {
                  elemMatch: {
                    _id: {
                      eq: source._id
                    }
                  }
                }
              }
            }
          })
        }
      },
      projects: {
        type: ['SanityProject'],
        resolve (source, args, context, info) {
          return context.nodeModel.runQuery({
            type: 'SanityProject',
            query: {
              filter: {
                categories: {
                  elemMatch: {
                    _id: {
                      eq: source._id
                    }
                  }
                }
              }
            }
          })
        }
      }
    }
  }
  createResolvers(resolvers)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createBlogPostPages(graphql, actions, reporter)
  await createProjectPages(graphql, actions, reporter)
  await createCategoryPages(graphql, actions, reporter) // <= add the function here
  await createActivityPages(graphql, actions, reporter) // <= add the function here
}
