describe('Blog app Login', function () {

    beforeEach(function () {
        cy.resetDB()
        cy.visit('http://localhost:3001')
    })

    it('front page can be opened', function () {
        cy.contains('Blogs')
    })

    it('login form can be opened', function () {
        cy.contains('login').click()
    })

    it('user can login', function () {
        cy.contains('login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
        cy.contains('Matti Luukkainen logged-in')
    })

    it('login fails with wrong password', function () {
        cy.contains('login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.error')
            .should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Matti Luukkainen logged-in')
    })
})