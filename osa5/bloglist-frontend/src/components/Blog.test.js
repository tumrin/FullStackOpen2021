import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

test('Renders url and likes', () => {
  const user = {
    name: 'Toinen Testaaja',
    username: 'tt',
  }
  const blog = {
    title: 'Tastauksen alkeet',
    author: 'Testi Henkilö',
    url: 'testaus.test',
    likes: 2,
    user: user,
  }

  const component = render(<Blog blog={blog} user={user} />)
  const button = component.container.querySelector('button')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Testauksen alkeet' && 'Testi Henkilö' && 'testaus.test' && 2
  )
})

test('Call handler 2 times', () => {
  const user = {
    name: 'Toinen Testaaja',
    username: 'tt',
  }
  const blog = {
    title: 'Tastauksen alkeet',
    author: 'Testi Henkilö',
    url: 'testaus.test',
    likes: 2,
    user: user,
  }
  const blogs = [blog]

  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} user={user} setBlogs={mockHandler} blogs={blogs} />
  )
  const button = component.container.querySelector('button')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
