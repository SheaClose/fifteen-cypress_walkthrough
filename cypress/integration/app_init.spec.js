// function addTwo(x) {
//   return x + 2;
// }
const GET_BEER = "Get Beer";
describe("On landing", () => {
  // it("Doesn't do much", () => {
  //   expect(addTwo(10)).to.eql(12);
  // });

  // beforeEach(() => {
  // //   cy.visit("/");
  // // });
  // it("AutoFocuses Input on landing", () => {
  //   cy.focused()
  //     .should("exist")
  //     .and("have.attr", "data-cy-input");
  // });
  // it("Accepts User Input", () => {
  //   cy.updateInput("[data-cy-input]", GET_BEER);
  //   // cy.get()
  //   //   .type(GET_BEER)
  //   //   .should("have.value", GET_BEER);
  // });
  it.only("Creates New Todo", () => {
    cy.fixture("todos").then(todos => {
      console.log("todos: ", todos);
      cy.server();
      cy.route("GET", "/api/todos", todos);
      cy.route({
        url: "/api/todos",
        method: "POST",
        response: [...todos, { id: 5, title: GET_BEER, isComplete: false }]
      });
      cy.route({
        url: "/api/todos",
        method: "DELETE",
        response: todos
      });
      cy.visit("/");
      cy.updateInput("[data-cy-input]", GET_BEER)
        .type("{enter}")
        .should("have.value", "");

      cy.get(".todos")
        .should("have.length", 5)
        .eq(1)
        .find("#delete")
        .as("lastDelete")
        .click();

      cy.get(".todos").should("have.length", 4);
    });
  });
});
