import retirementCalculatorPage from "../pageobjects/retirementCalculator.page";
const testDataSet1 = require("../testData/fillAllFields.json");
const testDataSet2 = require("../testData/fillMandatoryFields.json");

describe("retirement calculator tests", function () {
    it("fill in all the  fileds and submit", async () => {
        await retirementCalculatorPage.open();
        await retirementCalculatorPage.acceptCookies();
        browser.maximizeWindow();
        await retirementCalculatorPage.fillRetirementForm_allFields(testDataSet1);
        await retirementCalculatorPage.submitForm();
        await retirementCalculatorPage.verifyResultMessage();
      
    });

     it("fill in the mandatory fileds and submit", async () => {
        await retirementCalculatorPage.open();
        await retirementCalculatorPage.acceptCookies();
        browser.maximizeWindow();
        await retirementCalculatorPage.fillRetirementForm_allFields(testDataSet2);
        await retirementCalculatorPage.submitForm();
        await retirementCalculatorPage.verifyResultMessage();
      
    });

       it("social security toggle functionality test", async () => {
        await retirementCalculatorPage.open();
        await retirementCalculatorPage.acceptCookies();
        browser.maximizeWindow();
        await retirementCalculatorPage.ssnToggleFunctionality();
      
    });
});