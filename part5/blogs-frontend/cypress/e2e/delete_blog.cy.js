describe('Delete Blog', function () {
    describe('Create Blogs', function () {
        beforeEach(function () {
            cy.resetDB()
            cy.login({ username: 'mluukkai', password: 'salainen' })
            cy.createBlog({ title: 'a blog created by cypress 1', author: 'cypress 1', url: 'cypress.com'})
            cy.createBlog({ title: 'a blog created by cypress 2', author: 'cypress 2', url: 'cypress.com'})
            cy.createBlog({ title: 'a blog created by cypress 3', author: 'cypress 3', url: 'cypress.com'})

            cy.login({ username: 'admin', password: 'admin' })
            cy.createBlog({ title: 'a blog created by admin 1', author: 'admin 1', url: 'admin.com'})
            cy.createBlog({ title: 'a blog created by admin 2', author: 'admin 2', url: 'admin.com'})
            cy.createBlog({ title: 'a blog created by admin 3', author: 'admin 3', url: 'admin.com'})
        })

        it('delete own blog', function () {
            cy.contains('a blog created by admin 2').click()
            .contains('view').click()
            cy.contains('a blog created by admin 2').contains('delete').click()
            cy.should('not.contain','a blog created by admin 2')
        })

        it('try delete different owned blog', function () {
            cy.contains('a blog created by cypress 2').click()
                .contains('view').click()
            cy.contains('a blog created by cypress 2').contains('delete').click()
            cy.contains('a blog created by cypress 2')
        })
    })
})