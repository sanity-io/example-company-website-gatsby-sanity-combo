import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import BlockContent from '../components/block-content'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import useForm from '../utils/useForm'
import useContact from '../utils/useContact'

import { responsiveTitle1 } from '../components/typography.module.css'
import ContactStyles from '../styles/ContactStyles'

export const query = graphql`
  query ContactPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)contact/" }) {
      title
      _rawBody
    }
    services: allSanityService {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`

const ContactPage = props => {
  const { data, errors } = props
  const { values, updateValues } = useForm({
    name: '',
    email: '',
    message: '',
    contactNumber: '',
    services: {},
    mapleSyrup: ''
  })

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const page = data.page
  const services = data.services.edges

  if (!page) {
    throw new Error(
      'Missing "Contact" page data. Open the studio at http://localhost:3333 and add "Contact" page data and restart the development server.'
    )
  }

  if (!services) {
    throw new Error(
      'Missing "services" data. Open the studio at http://localhost:3333 and add "Services" data and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <h1 className={responsiveTitle1}>{page.title}</h1>
        <BlockContent blocks={page._rawBody || []} />

        <ContactStyles
          name="Contact Form"
          method="POST"
          action="/thankyou"
          onSubmit={event => useContact(event, values)}
        >
          <div className="form-item">
            <label className="contact-label" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              placeholder="Your name"
              id="name"
              className="contact-input"
              name="name"
              value={'...'}
              value={values.name}
              onChange={updateValues}
              required
            />
          </div>
          <div className="form-item">
            <label className="contact-label" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              placeholder="Your email"
              id="email"
              className="contact-input"
              name="email"
              value={'...'}
              value={values.email}
              onChange={updateValues}
              required
            />
          </div>
          <div className="form-item">
            <label className="contact-label" htmlFor="email">
              Contact Number:
            </label>
            <input
              type="text"
              placeholder="Your contact number"
              id="contactNumber"
              className="contact-input"
              name="contactNumber"
              value={'...'}
              value={values.contactNumber}
              onChange={updateValues}
              required
            />
          </div>
          <div className="form-item-honeypot">
            <label className="contact-label" htmlFor="mapleSyrup"></label>
            <input
              type="text"
              id="mapleSyrup"
              className="contact-input"
              name="mapleSyrup"
              value={'...'}
              value={values.mapleSyrup}
              onChange={updateValues}
              required
            />
          </div>
          <div className="form-item">
            <label className="contact-label" htmlFor="message">
              Message:
            </label>
            <textarea
              placeholder="Your message"
              rows="4"
              id="message"
              className="contact-textarea contact-input"
              name="message"
              value={'...'}
              value={values.message}
              onChange={updateValues}
              required
            ></textarea>
          </div>
          <div className="form-item">
            <button type="submit" value="Send" className="form-btn">
              Send
            </button>
          </div>
        </ContactStyles>
      </Container>
    </Layout>
  )
}
ContactPage.defaultProps = {
  data: {
    page: {
      title: 'Contact'
    }
  }
}
export default ContactPage
