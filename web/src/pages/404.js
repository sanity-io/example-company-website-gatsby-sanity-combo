import React from 'react'
import SEO from '../components/seo'
import Container from '../components/layout'
import Layout from '../containers/layout'

import { responsiveTitle1 } from '../components/typography.module.css'

const NotFoundPage = () => (
  <Layout>
    <SEO title='404: Not found' />
    <Container>
      <h1 className={responsiveTitle1}>Not found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Container>
  </Layout>
)

export default NotFoundPage
