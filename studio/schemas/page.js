export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  liveEdit: false,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ]
}
