describe('Auth', () => {
  //hook удалили из всех тестов visit. Before запуститься только перед 1 тестом. beforeEach перед всеми
  beforeEach(() => {
    cy.visit('/user/login') //in config BaseUrl ('/')
  })
  it('Sign in with valid credentials', () => {
    cy.get('#normal_login_email').type(Cypress.env('email'))
    cy.get('#normal_login_password').type(Cypress.env('password'))
    cy.get('.login-form-button').click()
    cy.wait(5000)
    cy.get('.ant-avatar-square').should('be.visible')
  })

  it('Sign in with invalid credentials', () => {
    cy.get('#normal_login_email').type('negative@gmail.com')
    cy.get('#normal_login_password').type(Cypress.env('password'))
    cy.get('.login-form-button').click()
    cy.get('.ant-notification-notice-error').should('have.text', 'Auth failed').should('be.visible')
  })

  it('Sing in form validation', () => {
    cy.get('#normal_login_email').should('be.empty')
    cy.get('#normal_login_password').should('be.empty')
    cy.get('.login-form-button').should('be.disabled')
  })

  it('Validation of the fields for Sing in', () => {
    cy.get('#normal_login_email').should('have.value', '')
    cy.get('#normal_login_password').should('have.value', '')
    cy.get('.login-form-button').should('be.disabled')

    cy.get('#normal_login_password').type('test')
    cy.get('#normal_login_password_help').should('not.exist')
    cy.get('.login-form-button').should('be.disabled')

    cy.get('#normal_login_email').type('test')
    cy.get('#normal_login_email_help')
      .should('have.text', "'email' is not a valid email")
      .should('be.visible')
    cy.get('.login-form-button').should('be.disabled')

    cy.get('#normal_login_email').type('@')
    cy.get('#normal_login_email_help')
      .should('have.text', "'email' is not a valid email")
      .should('be.visible')
    cy.get('.login-form-button').should('be.disabled')

    cy.get('#normal_login_email').type('example')
    cy.get('#normal_login_email_help')
      .should('have.text', "'email' is not a valid email")
      .should('be.visible')
    cy.get('.login-form-button').should('be.disabled')

    cy.get('#normal_login_email').type('.')
    cy.get('#normal_login_email_help')
      .should('have.text', "'email' is not a valid email")
      .should('be.visible')
    cy.get('.login-form-button').should('be.disabled')

    cy.get('#normal_login_email').type('com')
    cy.get('#normal_login_email_help').should('not.exist')
    cy.get('.login-form-button').should('be.enabled')

    cy.get('#normal_login_email').clear()
    cy.get('#normal_login_email_help').should('have.text', 'Required').should('be.visible')
    cy.get('.login-form-button').should('be.disabled')

    cy.get('#normal_login_email').type('test@example.com')
    cy.get('#normal_login_email_help').should('not.exist')
    cy.get('.login-form-button').should('be.enabled')

    cy.get('#normal_login_password').clear()
    cy.get('#normal_login_password_help').should('have.text', 'Required').should('be.visible')
    cy.get('.login-form-button').should('be.disabled')
  })
})
