/// <reference types="cypress" />

const url = 'http://localhost:3000';

describe('login', () => {
  // afterEach(() => {
  //   localStorage.clear();
  //   sessionStorage.clear();
  // });
  // it('redirects to auth page if user not authorized', () => {
  //   cy.visit(url);
  //   cy.location('pathname').then((loc) => assert(loc === '/auth'));
  // });

  // it('shows error message if trying to authorize with invalid credentials', () => {
  //   cy.visit(url);
  //   cy.get('[data-test="email-input"]').type('valid@mail.com');
  //   cy.get('[data-test="password-input"]').type('asdasdasd');
  //   cy.get('[data-test="submit-button"]').click();
  //   cy.get('.ant-message-error').should('be.visible');
  // });

  // it('redirects to /opportunities if admin logged in', () => {
  //   cy.visit(url);
  //   cy.location('pathname').then((loc) => assert(loc === '/auth'));
  //   cy.get('[data-test="email-input"]').type('admin@localhost.com');
  //   cy.get('[data-test="password-input"]').type('secret');
  //   cy.get('[data-test="submit-button"]').click();
  //   cy.wait(1000);
  //   cy.location('pathname').then((loc) => assert(loc === '/opportunities'));
  // });

  // it('redirects to /dashboard if regular user logged in', () => {
  //   cy.visit(url);
  //   cy.location('pathname').then((loc) => assert(loc === '/auth'));
  //   cy.get('[data-test="email-input"]').type('regularuser@localhost.com');
  //   cy.get('[data-test="password-input"]').type('secret');
  //   cy.get('[data-test="submit-button"]').click();
  //   cy.wait(1000);
  //   cy.location('pathname').then((loc) => assert(loc === '/dashboard'));
  // });
});
