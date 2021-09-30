import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('Does not render url and likes', () => {
  const blog = {
    title: 'Tastauksen alkeet',
    author: 'Testi Henkilö',
    url: 'testaus.test',
    likes: 2,
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent(
    'Testauksen alkeet' && 'Testi Henkilö'
  )
  expect(component.container).not.toHaveTextContent('testaus.test' && 2)
})
