
import FormPage from '../pageobjects/form.page.js'

describe('auth form', () => {
    it('should deny access with wrong creds', async () => {
        await FormPage.open()
        await FormPage.username.setValue('foo')
        await FormPage.password.setValue('bar')
        await FormPage.submit()

        await FormPage.flash.waitForDisplayed()
        let text = await FormPage.flash.getText()
        await expect(text).toEqual('Your username is invalid!')
    })

    it('should allow access with correct creds', async () => {
        await FormPage.open()
        await FormPage.username.setValue('tomsmith')
        await FormPage.password.setValue('SuperSecretPassword!')
        await FormPage.submit()

        await FormPage.flash.waitForDisplayed()
        await expect(await FormPage.flash.getText()).toEqual('You logged into a secure area!');
    })
})
