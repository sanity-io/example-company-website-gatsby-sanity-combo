import React from 'react'
import Container from '../components/container'
import SEO from '../components/seo'
import Layout from '../containers/layout'

import { responsiveTitle1 } from '../components/typography.module.css'

const ThankYouPage = () => {
  return (
    <Layout>
      <SEO title="Thanks" />
      <Container>
        <h1 className={responsiveTitle1}>Thanks :) I'll be in touch 📱</h1>
        <p>Thank you!</p>
      </Container>
    </Layout>
  )
}

export default ThankYouPage
