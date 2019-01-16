import sanityConfig from '../../../studio/sanity.json'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanityConfig.api)

export function imageUrlFor (source) {
  return builder.image(source)
}
