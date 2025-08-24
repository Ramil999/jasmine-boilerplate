import Page from './page.js';

class RetirementCalculator extends Page {

  get cookies() { return $("//button[@id='onetrust-accept-btn-handler']"); }
  get currentAge() { return $("//input[@id='current-age']"); }
  get retirement() { return $("//input[@id='retirement-age']"); }
  get currentAnnualIncome() { return $("//input[@id='current-income']"); }
  get spouseAnnualIncome() { return $("//input[@id='spouse-income']"); }
  get currentRetireSavingsBalance() { return $("//input[@id='current-total-savings']"); }
  get currentRetireContribution() { return $("//input[@id='current-annual-savings']"); }
  get annualRetirementContributionIncrease() { return $("//input[@id='savings-increase-rate']"); }
  get socialSecurityIncomeYes() { return $("//input[@id='yes-social-benefits']"); }
  get socialSecurityIncomeNo() { return $("//input[@id='no-social-benefits']"); }
  get maritalStatusYes() { return $("//input[@id='married']"); }
  get socialSecurityOverride() { return $("//input[@id='social-security-override']"); }
  get adjustDefaultValuesButton() { return $("//li[@id='assumption-desc']/following-sibling::li/a"); }
  get additionalOtherIncome() { return $("//input[@id='additional-income']"); }
  get numberOfYearsRetirement() { return $("//input[@id='retirement-duration']"); }
  get postRetirementIncomeIncreaseWithInflationYes() { return $("//input[@id='include-inflation']"); }
  get expectedInflationRate() { return $("//input[@id='expected-inflation-rate']"); }
  get percentOfinFalAnnualIncomeDesired() { return $("//input[@id='retirement-annual-income']"); }
  get preRetirementInvestmentReturn() { return $("//input[@id='pre-retirement-roi']"); }
  get postRetirementInvestmentReturn() { return $("//input[@id='post-retirement-roi']"); }
  get saveButton() { return $("//button[contains(text(),'Save changes')]"); }
  get calculatorButton() { return $("//button[@data-tag-id='submit']"); }
  get results() { return $("//p[@id='result-message']"); }

  open() {
    return super.open('insights-tools/retirement-calculator.html'); 
  }

  async acceptCookies() {
    let isCookieVisible = await this.cookies.isExisting();
    if(isCookieVisible) {
     await  this.cookies.click();
    }
  }

  async clickAdjustDefaults() {
    await this.adjustDefaultValuesButton.click();
  }

  async fillRetirementForm_allFields(data: any) {
    await this.currentAge.setValue(data.currentAge);
    await this.retirement.setValue(data.retirement);
    await this.currentAnnualIncome.setValue(data.currentAnnualIncome);
    await this.spouseAnnualIncome.setValue(data.spouseAnnualIncome);
    await this.currentRetireSavingsBalance.setValue(data.currentRetireSavings);
    await this.currentRetireContribution.setValue(data.currentRetireContribution);
    await this.annualRetirementContributionIncrease.setValue(data.annualRetirementContributionIncrease);
    await this.socialSecurityIncomeYes.click();
    await this.maritalStatusYes.waitForDisplayed();
    await this.maritalStatusYes.click();
    await this.socialSecurityOverride.setValue(data.socialSecurityOverride);

    // Adjust social security defaults values
    await this.clickAdjustDefaults();
    await this.additionalOtherIncome.waitForDisplayed();
    await this.additionalOtherIncome.setValue(data.additionalOtherIncome);
    await this.numberOfYearsRetirement.setValue(data.numberOfYearsRetirement);
    await this.postRetirementIncomeIncreaseWithInflationYes.click();
    await this.expectedInflationRate.waitForDisplayed();
    await this.expectedInflationRate.setValue(data.expectedInflationRate);
    await this.percentOfinFalAnnualIncomeDesired.setValue(data.percentOfinFalAnnualIncomeDesired);
    await this.preRetirementInvestmentReturn.setValue(data.preRetirementInvestmentReturn);
    await this.postRetirementInvestmentReturn.setValue(data.postRetirementInvestmentReturn);

  }

    async fillRetirementForm_mandatoryFields(data: any) {
    await this.currentAge.setValue(data.currentAge);
    await this.retirement.setValue(data.retirement);
    await this.currentAnnualIncome.setValue(data.currentAnnualIncome);
    await this.currentRetireSavingsBalance.setValue(data.currentRetireSavings);
    await this.currentRetireContribution.setValue(data.currentRetireContribution);
    await this.annualRetirementContributionIncrease.setValue(data.annualRetirementContributionIncrease);
  }

  async ssnToggleFunctionality() {
    await this.socialSecurityIncomeYes.click();
    await this.maritalStatusYes.waitForDisplayed({timeout: 5000});
    let maritalStatusField = await this.maritalStatusYes.isDisplayed();
    let overrideAmount = await this.socialSecurityOverride.isDisplayed();

    expect(maritalStatusField).toBeTrue();
    expect(overrideAmount).toBeTrue();

    await this.socialSecurityIncomeNo.click();
    expect(await this.maritalStatusYes.isDisplayed()).toBeFalse();
    expect(await this.socialSecurityOverride.isDisplayed()).toBeFalse();

  }
  
  async saveDefaults() {
    await this.saveButton.click();
  }

  async submitForm() {
    await this.calculatorButton.click();
  }

  async verifyResultMessage() {
    await this.results.waitForDisplayed({timeout: 5000});
  }
}

export default new RetirementCalculator();
