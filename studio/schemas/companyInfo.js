import { MdBusiness } from 'react-icons/md'

export default {
  name: 'companyInfo',
  title: 'Company Info',
  type: 'document',
  liveEdit: false,
  __experimental_actions: ['update', 'publish' /* 'create', 'delete' */],
  icon: MdBusiness,
  fields: [
    {
      name: 'name',
      title: 'Company name',
      type: 'string'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email'
    },
    {
      name: 'address1',
      title: 'Address 1',
      type: 'string'
    },
    {
      name: 'address2',
      title: 'Address 2',
      type: 'string'
    },
    {
      name: 'zipCode',
      title: 'ZIP Code',
      type: 'string'
    },
    {
      name: 'city',
      title: 'City',
      type: 'string'
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string'
    }
  ]
}
