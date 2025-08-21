import CheckboxPage from '../pageobjects/checkbox.page.js'

describe('checkboxes', () => {
    it('checkbox 2 should be enabled', async () => {
        await CheckboxPage.open()
        let checkboxState = await CheckboxPage.firstCheckbox.isSelected();
        await expect(checkboxState).toBeFalsy();
        await expect(await CheckboxPage.lastCheckbox.isSelected()).toBeTruthy()
    })

    it('checkbox 1 should be enabled after clicking on it', async () => {
        await CheckboxPage.open()
        await expect(await CheckboxPage.firstCheckbox.isSelected()).not.toBeTrue()
        await CheckboxPage.firstCheckbox.click()
        await expect(await CheckboxPage.firstCheckbox.isSelected()).toBeTrue()
    })
})
