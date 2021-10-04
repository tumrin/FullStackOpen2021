import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Check blog info', () => {
  const creationHandler = jest.fn()

  const component = render(<BlogForm creationHandler={creationHandler} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Testi title' },
  })
  fireEvent.change(author, {
    target: { value: 'Testaaja' },
  })
  fireEvent.change(url, {
    target: { value: 'testi.test' },
  })
  fireEvent.submit(form)

  expect(creationHandler.mock.calls[0][1]).toStrictEqual({
    title: 'Testi title',
    author: 'Testaaja',
    url: 'testi.test',
  })
})
