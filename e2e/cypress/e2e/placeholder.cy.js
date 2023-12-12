describe('Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/') // Tämä on URL-polku juureen. Varmista, että tämä vastaa kehityspalvelimesi URL:ää.
    cy.contains('Column1') // Korvaa 'Your Expected Title' sillä tekstillä, jonka odotat löytyvän sivulta.
  })
})
