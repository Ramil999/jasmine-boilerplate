import DynamicPage from '../pageobjects/dynamic.page.js'

describe('dynamic loading', function () {
    it('should be an button on the page', async () => {
        await DynamicPage.open()
        await expect(await DynamicPage.loadedPage.isExisting()).not.toBeTrue()

        await DynamicPage.btnStart.click()
        await DynamicPage.loadedPage.waitForExist()
        await expect(await DynamicPage.loadedPage.isExisting()).toBeTrue()
    })
})
