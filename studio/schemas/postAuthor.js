export default {
  type: 'object',
  name: 'postAuthor',
  title: 'Post author',
  fields: [
    {
      title: 'Person',
      name: 'person',
      type: 'reference',
      to: { type: 'person' }
    },
    {
      title: 'Roles',
      name: 'roles',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'radio',
        list: [
          { title: 'Illustration', value: 'illustration' },
          { title: 'Text', value: 'text' },
          { title: 'Editor', value: 'editor' }
        ]
      }
    }
  ],
  preview: {
    select: {
      personName: 'person.name',
      roles: 'roles',
      image: 'person.image'
    },
    prepare (data) {
      return {
        ...data,
        title: data.personName,
        subtitle: data.roles && data.roles.join('/'),
        media: data.image
      }
    }
  }
}
