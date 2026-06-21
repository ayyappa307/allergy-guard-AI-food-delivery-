import { FOOD_ITEMS } from './src/lib/mockData.ts';

async function checkUrls() {
  console.log("Checking image URLs...");
  const failed = [];
  
  // Extract unique URLs
  const urls = [...new Set(FOOD_ITEMS.map(item => item.image))];
  
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (!res.ok) {
        console.log(`Failed (${res.status}): ${url}`);
        failed.push(url);
      }
    } catch (err) {
      console.log(`Error: ${url}`);
      failed.push(url);
    }
  }
  
  console.log(`\nFound ${failed.length} broken URLs.`);
}

checkUrls();
