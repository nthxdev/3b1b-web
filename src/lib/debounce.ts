import debounce from 'lodash/debounce'

export const searchLater = debounce((query: string) => {
  console.log('Search:', query)
}, 250)
