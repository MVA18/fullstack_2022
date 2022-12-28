describe('Like Blog', function () {
    describe('Like a Blog', function () {
        beforeEach(function () {
            cy.login({ username: 'mluukkai', password: 'salainen' })
            cy.createBlog({ title: 'a blog created by cypress 1', author: 'cypress 1', url: 'cypress.com'})
            cy.createBlog({ title: 'a blog created by cypress 2', author: 'cypress 2', url: 'cypress.com'})
            cy.createBlog({ title: 'a blog created by cypress 3', author: 'cypress 3', url: 'cypress.com'})
        })

        it('like specific blog', function () {
            cy.contains('a blog created by cypress 2').click()
            .contains('view').click()
            cy.contains('a blog created by cypress 2').contains('like').click()
            cy.contains('a blog created by cypress 2').contains('likes 1')
        })
    })
})