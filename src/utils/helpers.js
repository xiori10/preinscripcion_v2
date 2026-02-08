// src/utils/helpers.js

export const getInitials = (name = '') => {
  if (!name) return ''

  return name
    .trim()
    .split(' ')
    .map(word => word[0].toUpperCase())
    .slice(0, 2)
    .join('')
}
