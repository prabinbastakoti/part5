describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/user', {
      username: 'prabinbastakoti',
      name: 'Prabin Bastakoti',
      password: 'acerswift3',
    });
    cy.visit('http://localhost:3000');
  });
  it('Login form is shown', function () {
    cy.contains('label', 'Username').next().should('have.id', 'username');
    cy.contains('label', 'Password').next().should('have.id', 'password');
    cy.contains('button', 'login');
  });

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('prabinbastakoti');
      cy.get('#password').type('acerswift3');
      cy.contains('button', 'login').click();
      cy.contains('Prabin Bastakoti logged in');
    });
    it('fails with wrong credentials', function () {
      cy.get('#username').type('prabinbastakoti');
      cy.get('#password').type('acerswift');
      cy.contains('button', 'login').click();
      cy.contains('wrong username or password').should('have.class', 'error');
    });

    describe('when logged in', function () {
      beforeEach(function () {
        cy.get('#username').type('prabinbastakoti');
        cy.get('#password').type('acerswift3');
        cy.contains('button', 'login').click();
      });

      it('A blog can be created', function () {
        cy.contains('button', 'Create new Blog').click();
        cy.get('#title').type('This is a blog title');
        cy.get('#author').type('This is a blog author');
        cy.get('#url').type('This is a blog url');
        cy.contains('button', 'create').click();
        cy.contains('This is a blog title This is a blog author');
      });

      describe('When there is blog post', function () {
        beforeEach(function () {
          cy.contains('button', 'Create new Blog').click();
          cy.get('#title').type('This is a blog title');
          cy.get('#author').type('This is a blog author');
          cy.get('#url').type('This is a blog url');
          cy.contains('button', 'create').click();
        });
        it('a blog post can be liked', function () {
          cy.contains('button', 'show').click();
          cy.contains('button', 'like').click();
          cy.get('#likesCount').should('contain', '1');
        });

        it.only('a blog post can be deleted', function () {
          cy.contains('button', 'show').click();
          // cy.contains('button', 'Remove').click();
          // cy.contains('This is a blog title This is a blog author').should(
          // 'not.exist'
          // );
        });
      });
    });
  });
});
