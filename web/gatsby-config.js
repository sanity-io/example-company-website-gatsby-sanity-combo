require('dotenv').config()
const {
  api: { projectId, dataset }
} = requireConfig('../studio/sanity.json')

module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId,
        dataset,
        // To enable preview of drafts, copy .env-example into .env,
        // and add a token with read permissions
        token:
          process.env.SANITY_TOKEN ||
          'skWOMYX7ArXZPzXm5QYNKQrqgoEGzBwFdQbmvnrLcD5D38iH67LaAYnQrgTUeh9Zu6otP0ZLrL8APHFTCTtXclDIw6sX6Ab0axqx7CQ8xjefzBCRQh4p5k1aCsCEv0e43p3yXXpGjzd75dIBjrdxjIXrDPpSo1gav0twYJ60FVHDQ0wxH6JG',
        watchMode: true,
        overlayDrafts: true
      }
    }
  ]
}

/**
 * We're requiring a file in the studio folder to make the monorepo
 * work "out-of-the-box". Sometimes you would to run this web frontend
 * in isolation (e.g. on codesandbox). This will give you an error message
 * with directions to enter the info manually or in the environment.
 */

function requireConfig(path) {
  try {
    return require('../studio/sanity.json')
  } catch (e) {
    console.error(
      'Failed to require sanity.json. Fill in projectId and dataset name manually in gatsby-config.js'
    )
    return {
      api: {
        projectId: process.env.SANITY_PROJECT_ID || '',
        dataset: process.env.SANITY_DATASET || ''
      }
    }
  }
}
