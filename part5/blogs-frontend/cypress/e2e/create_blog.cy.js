describe('Create new Blog', function () {
    describe('when logged in', function () {
        beforeEach(function () {
            cy.resetDB()
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })

        it('a new blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#input_blog_title').type('a blog created by cypress')
            cy.get('#input_blog_author').type('cypress')
            cy.get('#input_blog_url').type('cypress.com')
            cy.get('#btn_create_blog').click()
            cy.contains('a blog created by cypress')
        })
    })
})