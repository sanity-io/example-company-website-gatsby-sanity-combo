const path = require('path')

module.exports = {
  extends: ['standard', 'standard-react'],
  rules: {
    'react/prop-types': 0
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.2.0'
    }
  }
}
