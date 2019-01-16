export default {
  type: 'object',
  name: 'projectMember',
  title: 'Project Member',
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
          { title: 'Designer', value: 'designer' },
          { title: 'Developer', value: 'developer' },
          { title: 'Editor', value: 'editor' },
          { title: 'Manager', value: 'manager' }
        ]
      }
    }
  ],
  preview: {
    select: {
      personName: 'person.name',
      roles: 'roles',
      media: 'person.image'
    },
    prepare (data) {
      return {
        ...data,
        title: data.personName,
        subtitle: data.roles && data.roles.join('/')
      }
    }
  }
}
