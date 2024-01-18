describe('Kanban Board Task Movement Test', () => {
  beforeEach(() => {
    cy.visit('/') // Oletetaan, että sovellus on käynnissä tässä osoitteessa
  })

  it('moves a task around the board and returns it to its original position', () => {
    // Taskin ja Columnin tunnistaminen tekstisisällön perusteella
    const taskContent = 'Task1'
    const originalColumnTitle = 'Column1'
    const destinationColumnTitle = 'Column2'

    // Alkuperäisen taskin sijainnin tallentaminen
    cy.contains(taskContent).closest('.column').as('originalColumn')

    // Varmista, että elementti on näkyvissä ja siirtää taskin ensimmäisestä sarakkeesta toiseen
    cy.contains(taskContent).scrollIntoView().as('taskToMove')

    // Simuloi "drag and drop" käyttämällä force: true ohittamaan elementin näkyvyyden tarkistuksen
    cy.get('@taskToMove').trigger('mousedown', { which: 1, force: true })
    cy.contains(destinationColumnTitle)
      .scrollIntoView()
      .trigger('mousemove')
      .trigger('mouseup', { force: true })

    // Tarkista, että taski on siirtynyt toiseen sarakkeeseen
    cy.contains(destinationColumnTitle).should('contain', taskContent)

    // Palauta taski alkuperäiseen sijaintiinsa
    cy.get('@taskToMove').trigger('mousedown', { which: 1, force: true })
    cy.get('@originalColumn')
      .trigger('mousemove')
      .trigger('mouseup', { force: true })

    // Tarkista, että taski on palannut alkuperäiseen Columniinsa
    cy.get('@originalColumn').should('contain', taskContent)

    // Varmista, että kaikki taskit ovat alkuperäisillä paikoillaan
    cy.contains(originalColumnTitle)
      .should('contain', 'Task1')
      .and('contain', 'Task2')
    cy.contains('Column2').should('contain', 'Task3')
    cy.contains('Column3').should('contain', 'Task4')
    cy.contains('Column4').should('contain', 'Task5')
  })
})
