import { test, expect } from '@playwright/test';

test('To add a product',async ({ page }) => {
// 1. Launch browser and navigate to Decathlon website https://www.decathlon.in/ 
 await page.goto('https://www.decathlon.in/');
// 2. Verify URL using Playwright assertions 
const pageUrl =  page.url();
await expect(page).toHaveURL('https://www.decathlon.in/');
// 3. Verify the Decathlon homepage is displayed 
const pageTitle = await page.title();
await expect.soft(page).toHaveTitle('Buy Sporting Goods, Sportswear and Equipments | Download App');
// 4. Verify if search box is enabled 
const searchBox =  page.locator('//input[@type="search"]');
 await expect(searchBox).toBeEnabled();
// 5. Click on the search Box 
await searchBox.click();
// 6. Enter the product name “Shoes” 
await searchBox.fill("Shoes");
// 7. Press Enter or select a suggestion from the dropdown 
await searchBox.press('Enter');
// 8. Verify the product listing page is displayed or Verify search results page title 
const resultPageTitle = await page.title();
console.log('Page tilte - '+ resultPageTitle);
await expect(page).toHaveTitle('Search | Shoes');
// 9. Click on the Sport filter dropdown 
// await page.locator('data-test-id="title:Sport"').click();
await page.getByRole('button', { name: 'Sport', exact: true }).click();
// 10. Select Running from the Sport dropdown 
await page.locator('//input[@data-test-id="filter-checkbox-sport_pratice_en-Running"]').check();
// 11. Click on the Gender filter dropdown 
await page.getByRole('button', { name: 'Gender', exact: true }).click();
// 12. Select Men 
await page.locator('//input[@data-test-id="filter-checkbox-gender_id_en-MEN"]').check();
// 13. Click on the Size filter dropdown 
await page.getByRole('button', { name: 'Size', exact: true }).click();
// 14. Select size UK 10 
await page.locator('//input[@data-test-id="filter-checkbox-indian_size-11"]').check();
// 15. Click on the Price filter dropdown 
await page.getByRole('button', { name: 'Price', exact: true }).click();
// 16. Select a price range (e.g., ₹1000 – ₹3000) 
await page.getByRole('button',{name: 'Most relevant',exact:true}).click();
// await page.locator('//span[text()="Most relevant"]').click();
await page.getByText('Price (low → high)', { exact: true}).click();

// await page.locator('//span[text()="Price (low → high)"]').click();
// 17. From the filtered results, click on the first available product 
let filteredproducts =  page.locator('//div[@data-test-id="product-card:product-card:title"]');
console.log(await filteredproducts.count());
await filteredproducts.first().click();
// 18. On the product details page, select Size – UK 10 
await page.locator('//button[@data-test-id="pdp-size-option-button-11"]').click();
// 19. Click on Add to cart button and Verify that the product is successfully added to the cart
await page.locator('//button[@data-test-id="pdp-size-option-button-11"]').click();
await page.getByRole('button', { name: 'Add to cart', exact: true }).click();


// Verify product added successfully
const successMessage = page.getByText('Product(s) added to cart');

await expect(successMessage).toBeVisible();

// Verify Go to cart button
await expect(page.getByRole('button', { name: 'Go to cart' })).toBeVisible();
})