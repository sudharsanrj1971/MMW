import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        # Test 1: Desktop (1920x1080)
        page = await browser.new_page(viewport={'width': 1920, 'height': 1080})
        
        # Enable console logging
        page.on('console', lambda msg: print(f'[Browser Console] {msg.type}: {msg.text}'))
        page.on('pageerror', lambda err: print(f'[Browser Error] {err}'))

        os.makedirs('verification_screenshots', exist_ok=True)

        print('Loading http://localhost:5173/ ...')
        await page.goto('http://localhost:5173/', wait_until='networkidle')
        await page.screenshot(path='verification_screenshots/01_boot_screen.png')
        print('Captured boot screen.')

        # Skip intro if skip button is present
        skip_btn = page.locator('.boot-skip-btn')
        if await skip_btn.is_visible():
            await skip_btn.click()
            await page.wait_for_timeout(1000)

        await page.screenshot(path='verification_screenshots/02_hero_desktop.png')
        print('Captured hero desktop.')

        # Scroll to Collection
        await page.evaluate("document.getElementById('lamps').scrollIntoView()")
        await page.wait_for_timeout(800)
        await page.screenshot(path='verification_screenshots/03_collection_desktop.png')
        print('Captured collection.')

        # Scroll to Decode section and test canvas frame render
        await page.evaluate("document.getElementById('decode').scrollIntoView()")
        await page.wait_for_timeout(800)
        await page.screenshot(path='verification_screenshots/04_decode_desktop.png')
        print('Captured decode section.')

        # Scroll to Craft section
        await page.evaluate("document.getElementById('craft').scrollIntoView()")
        await page.wait_for_timeout(800)
        await page.screenshot(path='verification_screenshots/05_craft_desktop.png')
        print('Captured craft section.')

        # Scroll to Custom orders
        await page.evaluate("document.getElementById('custom-orders').scrollIntoView()")
        await page.wait_for_timeout(800)
        await page.screenshot(path='verification_screenshots/06_custom_orders_desktop.png')
        print('Captured custom orders.')

        # Scroll to Contact
        await page.evaluate("document.getElementById('contact').scrollIntoView()")
        await page.wait_for_timeout(800)
        await page.screenshot(path='verification_screenshots/07_contact_desktop.png')
        print('Captured contact section.')

        # Test Mobile Viewport (390x844)
        mobile_page = await browser.new_page(viewport={'width': 390, 'height': 844})
        await mobile_page.goto('http://localhost:5173/', wait_until='networkidle')
        mobile_skip = mobile_page.locator('.boot-skip-btn')
        if await mobile_skip.is_visible():
            await mobile_skip.click()
            await mobile_page.wait_for_timeout(800)

        await mobile_page.screenshot(path='verification_screenshots/08_hero_mobile.png')
        print('Captured hero mobile.')

        await mobile_page.evaluate("document.getElementById('lamps').scrollIntoView()")
        await mobile_page.wait_for_timeout(800)
        await mobile_page.screenshot(path='verification_screenshots/09_collection_mobile.png')
        print('Captured collection mobile.')

        await browser.close()
        print('Playwright visual testing complete.')

if __name__ == '__main__':
    asyncio.run(run())
