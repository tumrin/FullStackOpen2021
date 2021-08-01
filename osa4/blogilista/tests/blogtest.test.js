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

describe('Most blogs', () => {

    test('Empty list', () => {
        const blogs = []
        expect(listHelper.mostBlogs(blogs)).toEqual(null)
    })

    test('One blog', () => {
        const blog = {
            title: "Testi",
            author: "Testi henkilö",
            url: "Unknown",
            likes: 1
        }
        const blogs = [blog]
        expect(listHelper.mostBlogs(blogs)).toEqual({author:'Testi henkilö', blogs: 1})
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
            author: "Testi henkilö1",
            url: "Unknown",
            likes: 3
        }
        const blog3 = {
            title: "Testi3",
            author: "Testi henkilö3",
            url: "Unknown",
            likes: 3
        }
       const  blogs = [blog, blog1, blog2, blog3]
        expect(listHelper.mostBlogs(blogs)).toEqual({author:'Testi henkilö1', blogs: 2})
    })

    test('Multiple most blogs', () => {
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
            author: "Testi henkilö1",
            url: "Unknown",
            likes: 3
        }
        const blog3 = {
            title: "Testi3",
            author: "Testi henkilö",
            url: "Unknown",
            likes: 3
        }
       const  blogs = [blog, blog1, blog2, blog3]
        expect(listHelper.mostBlogs(blogs)).toEqual({author:'Testi henkilö', blogs: 2})
    })
})

describe('Most Likes', () => {

    test('Empty list', () => {
        const blogs = []
        expect(listHelper.mostLikes(blogs)).toEqual(null)
    })

    test('One blog', () => {
        const blog = {
            title: "Testi",
            author: "Testi henkilö",
            url: "Unknown",
            likes: 1
        }
        const blogs = [blog]
        expect(listHelper.mostLikes(blogs)).toEqual({author:'Testi henkilö', likes: 1})
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
            author: "Testi henkilö1",
            url: "Unknown",
            likes: 3
        }
        const blog3 = {
            title: "Testi3",
            author: "Testi henkilö3",
            url: "Unknown",
            likes: 3
        }
       const  blogs = [blog, blog1, blog2, blog3]
        expect(listHelper.mostLikes(blogs)).toEqual({author:'Testi henkilö1', likes: 5})
    })
    test('Multiple most Likes', () => {
        const blog = {
            title: "Testi",
            author: "Testi henkilö",
            url: "Unknown",
            likes: 2
        }
        const blog1 = {
            title: "Testi1",
            author: "Testi henkilö1",
            url: "Unknown",
            likes: 2
        }
        const blog2 = {
            title: "Testi2",
            author: "Testi henkilö1",
            url: "Unknown",
            likes: 3
        }
        const blog3 = {
            title: "Testi3",
            author: "Testi henkilö",
            url: "Unknown",
            likes: 3
        }
       const  blogs = [blog, blog1, blog2, blog3]
        expect(listHelper.mostLikes(blogs)).toEqual({author:'Testi henkilö', likes: 5})
    })
})