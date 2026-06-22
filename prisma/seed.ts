import { PrismaClient } from '@prisma/client';
import { RESTAURANTS, FOOD_ITEMS } from '../src/lib/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Check if restaurants already exist
  const restaurantCount = await prisma.restaurant.count();
  if (restaurantCount > 0) {
    console.log('Database already has restaurants. Skipping seeding.');
    return;
  }

  console.log('Inserting restaurants...');
  for (const r of RESTAURANTS) {
    await prisma.restaurant.upsert({
      where: { id: r.id },
      update: {},
      create: {
        id: r.id,
        name: r.name,
        rating: r.rating,
        cuisine: r.cuisine,
        distance: r.distance,
        image: r.image,
      },
    });
  }

  console.log('Inserting food items...');
  for (const f of FOOD_ITEMS) {
    await prisma.foodItem.upsert({
      where: { id: f.id },
      update: {},
      create: {
        id: f.id,
        restaurantId: f.restaurantId,
        name: f.name,
        price: f.price,
        rating: f.rating,
        deliveryTime: f.deliveryTime,
        ingredients: f.ingredients,
        image: f.image,
        calories: f.calories,
        protein: f.protein,
        fat: f.fat,
      },
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
