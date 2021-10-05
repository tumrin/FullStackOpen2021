describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi Henkilö',
      username: 'tester',
      password: '1234',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.get('button').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('1234')
      cy.get('#loginButton').click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()

      cy.contains('Username or password incorrect')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tester', password: '1234' })
      cy.get('#username').type('tester')
      cy.get('#password').type('1234')
      cy.get('#loginButton').click()
    })

    it('A blog can be created', function () {
      cy.createBlog({
        title: 'Testing with Cypress',
        author: 'Tester',
        url: 'Testi.test',
      })
      cy.createBlog({
        title: 'Testing with Cypress2',
        author: 'Tester',
        url: 'Testi.test',
      })
      cy.contains('Testing with Cypress')
      cy.contains('Tester')
    })

    describe('When blog created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Testing with Cypress',
          author: 'Tester',
          url: 'Testi.test',
        })
      })

      it('A blog can be liked', function () {
        cy.get('#showButton').click()
        cy.get('#likeButton').click()
        cy.get('#likes').contains(1)
      })
      it('A blog can be removed', function () {
        cy.get('#showButton').click()
        cy.get('#removeButton').click()
        cy.contains('Testing with Cypress').should('not.exist')
      })
      describe('When two or more blogs', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Testing with Cypress2',
            author: 'Tester2',
            url: 'Testi.test2',
          })
        })

        it('The blog with most likes is first', function () {
          cy.get('.blog').first().should('contain', 'Testing with Cypress')
          cy.get(':nth-child(3) > #showButton').click()
          cy.get('#likeButton').click()
          cy.get('.blog').first().should('contain', 'Testing with Cypress2')
        })
      })
    })
  })
})
