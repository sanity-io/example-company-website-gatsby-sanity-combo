import { MdApps } from 'react-icons/md'

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: MdApps,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        // add a button to generate slug from the title field
        source: 'title'
      }
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage'
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      description: 'You can use this field to schedule post where you show them',
      type: 'datetime'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ],
  liveEdit: true
}
