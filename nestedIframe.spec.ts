import { test, expect } from "@playwright/test";

test('To login a test leaf', async ({ page }) => {

    await page.goto('https://www.leafground.com/frame.xhtml');
    const parentFrame = page.frameLocator('//iframe[@src="page.xhtml"]');
    const childFrame = parentFrame.frameLocator('//iframe[@src="framebutton.xhtml"]');
    await childFrame.locator('#Click').click();

    const expectedAfterClick = childFrame.locator('#Click').innerText();
    console.log(expectedAfterClick);
    
   await expect(childFrame.locator('#Click')).toHaveText('Hurray! You Clicked Me.');
   

});

// Navigate to the LeafGround Frames page.


// Identify the parent iframe.

// Locate the nested iframe inside the parent iframe using frameLocator().

// Click the button inside the nested iframe.

// Verify that the button text changes to Hurray! You Clicked Me.