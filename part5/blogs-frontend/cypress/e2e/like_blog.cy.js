describe('Like Blog', function () {
    describe('Create Blogs', function () {
        beforeEach(function () {
            cy.resetDB()
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

        it('like specific blog and check that position has changed in list', function () {
            cy.get('.blog').eq(0).should('contain', 'a blog created by cypress 1')
            cy.get('.blog').eq(1).should('contain', 'a blog created by cypress 2')
            cy.get('.blog').eq(2).should('contain', 'a blog created by cypress 3')

            cy.contains('a blog created by cypress 2').click()
                .contains('view').click()
            cy.contains('a blog created by cypress 2').contains('like').click()

            cy.get('.blog').eq(0).should('contain', 'a blog created by cypress 2')
            cy.get('.blog').eq(1).should('contain', 'a blog created by cypress 1')
            cy.get('.blog').eq(2).should('contain', 'a blog created by cypress 3')
        })
    })
})