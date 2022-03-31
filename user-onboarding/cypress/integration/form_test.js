describe("User-Onboarding", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    })

    const fNameInput = () => cy.get("input[name=first_name]")
    const lNameInput = () => cy.get("input[name=last_name]")
    const emailInput = () => cy.get("input[name=email]")
    const passwordInput = () => cy.get("input[name=password]")
    const tosInput = () => cy.get("input[name=tos]")
    const submitBtn = () => cy.get("button[name=submitBtn]")

    it("Mandatory sanity check!", () => {
        expect(1 + 2).to.equal(3);
        cy.url().should("include", "localhost");
    })

    it("Checking to see if inputs are showing", () => {
        fNameInput().should("exist")
        cy.contains("submit").should("exist");
        cy.contains(/SuBmIt/i).should("exist")
    })

    describe("Get the inputs and type corresponding information in it", () => {
        it("Getting the first name, last name, email, password", () => {
            fNameInput()
                .should("have.value", "")
                .type("Nathan")
                .should("have.value", "Nathan")
            lNameInput()
                .should("have.value", "")
                .type("Cai")
                .should("have.value", "Cai")
            emailInput()
                .should("have.value", "")
                .type("nathan97cai@gmail.com")
                .should("have.value", "nathan97cai@gmail.com")
            passwordInput()
                .should("have.value", "")
                .type("passwordgoeshere")
                .should("have.value", "passwordgoeshere")
        })

        it("Clicking on the terms of service box", () => {
            tosInput()
                .click()
        })


        describe("Check submit button functionality", () => {
            it("Check to see if a user can submit the form data after filling everything out", () => {
                submitBtn().should("be.disabled")
                fNameInput().type("Nathan")
                lNameInput().type("Cai")
                emailInput().type("nathan97cai@gmail.com")
                passwordInput().type("passwordgoeshere")
                tosInput().click()
                submitBtn().should("not.be.disabled")
            })

            it("Check submit button functionality if form is incomplete", () => {
                submitBtn().should("be.disabled")
                fNameInput().type("Nathan")
                lNameInput().type("Cai")
                emailInput().type("nathan97cai@gmail.com")
                passwordInput().type("passwordgoeshere")
                submitBtn().should("be.disabled")
            })
        })
    })
})
