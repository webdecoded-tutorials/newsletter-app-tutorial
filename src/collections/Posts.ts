import type { CollectionConfig } from 'payload'
import afterPostCreate from '../hooks/afterPostCreate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'postBody',
      type: 'richText',
      required: true,
    },
  ],
  hooks: {
    afterOperation: [afterPostCreate],
  },
  // upload: true,
}
