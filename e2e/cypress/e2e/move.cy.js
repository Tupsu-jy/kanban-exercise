describe('Task Movement', () => {
  beforeEach(() => {
    // Reset the database before each test
    cy.task('resetDb')
  })
  it('should move a task from Column1 to Column2', () => {
    cy.visit('/demo')

    // Hae Column1 sisällä oleva Task1
    cy.contains('.column', 'Column1')
      .find(
        `[data-rbd-drag-handle-draggable-id="e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"]`
      )
      .as('draggableTask')

    // Hae Column2 droppable container
    cy.contains('.column', 'Column2')
      .find('[data-rbd-droppable-id="030ebc99-9c0b-4ef8-bb6d-6bb9bd380a11"]')
      .as('dropZone')

    // Suoritetaan drag & drop
    cy.get('@draggableTask').dragAndDrop('@draggableTask', '@dropZone')

    // Varmistetaan, että tehtävä siirtyi Column2:een
    cy.contains('.column', 'Column2').should('contain', 'Task1')
  })

  it('should move a task from Column1 to Column3', () => {
    cy.visit('/demo')

    // Hae Column1 sisällä oleva Task2
    cy.contains('.column', 'Column1')
      .find(
        `[data-rbd-drag-handle-draggable-id="f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"]`
      )
      .as('draggableTask2')

    // Hae Column3 droppable container
    cy.contains('.column', 'Column3')
      .find('[data-rbd-droppable-id="040ebc99-9c0b-4ef8-bb6d-6bb9bd380a11"]')
      .as('dropZone3')

    // Suoritetaan drag & drop
    cy.get('@draggableTask2').dragAndDrop('@draggableTask2', '@dropZone3')

    // Varmistetaan, että tehtävä siirtyi Column3:een
    cy.contains('.column', 'Column3').should('contain', 'Task2')
  })

  it('should move a task from Column2 to Column4', () => {
    cy.visit('/demo')

    // Hae Column2 sisällä oleva Task3
    cy.contains('.column', 'Column2')
      .find(
        `[data-rbd-drag-handle-draggable-id="010ebc99-9c0b-4ef8-bb6d-6bb9bd380a11"]`
      )
      .as('draggableTask3')

    // Hae Column4 droppable container
    cy.contains('.column', 'Column4')
      .find('[data-rbd-droppable-id="050ebc99-9c0b-4ef8-bb6d-6bb9bd380a11"]')
      .as('dropZone4')

    // Suoritetaan drag & drop
    cy.get('@draggableTask3').dragAndDrop('@draggableTask3', '@dropZone4')

    // Varmistetaan, että tehtävä siirtyi Column4:een
    cy.contains('.column', 'Column4').should('contain', 'Task3')
  })
})
