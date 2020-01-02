import { MdSettings } from 'react-icons/md'

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // You probably want to uncomment the next line once you've made a siteSettings document in the Studio. This will remove the settings document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  icon: MdSettings,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string'
    }
  ]
}
