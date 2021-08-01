const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Total likes', () => {

    test('Empty list', ()=>{
        const blogs = []
        expect(listHelper.totalLikes(blogs)).toBe(0)
    })

    test('List has 1 blog', ()=>{
        const blog = {
            title: "Testi",
            author: "Testi henkilö",
            url: "Unknown",
            likes: 1
        }
       const  blogs = [blog]
        expect(listHelper.totalLikes(blogs)).toBe(1)
    })

    test('Has multiple blogs', ()=>{
        const blog = {
            title: "Testi",
            author: "Testi henkilö",
            url: "Unknown",
            likes: 1
        }
        const blog1 = {
            title: "Testi1",
            author: "Testi henkilö1",
            url: "Unknown",
            likes: 2
        }
        const blog2 = {
            title: "Testi2",
            author: "Testi henkilö2",
            url: "Unknown",
            likes: 3
        }
       const  blogs = [blog, blog1, blog2]
        expect(listHelper.totalLikes(blogs)).toBe(6)
    })
})

describe('Favorite blog', () => {

    test('Empty list', () => {
        const blogs = []
        expect(listHelper.favoriteBlog(blogs)).toEqual(null)
    })

    test('One blog', () => {
        const blog = {
            title: "Testi",
            author: "Testi henkilö",
            url: "Unknown",
            likes: 1
        }
        const blogs = [blog]
        expect(listHelper.favoriteBlog(blogs)).toEqual(blog)
    })

    test('Has multiple blogs', ()=>{
        const blog = {
            title: "Testi",
            author: "Testi henkilö",
            url: "Unknown",
            likes: 1
        }
        const blog1 = {
            title: "Testi1",
            author: "Testi henkilö1",
            url: "Unknown",
            likes: 2
        }
        const blog2 = {
            title: "Testi2",
            author: "Testi henkilö2",
            url: "Unknown",
            likes: 3
        }
       const  blogs = [blog, blog1, blog2]
        expect(listHelper.favoriteBlog(blogs)).toEqual(blog2)
    })
})