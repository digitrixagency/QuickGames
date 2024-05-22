const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const excelToJson=require('./scrap')

const filepath='./HTML_Games.xlsx'
async function main() {
  // // Insert dummy users


  const Gamedata=excelToJson(filepath);
  console.log(Gamedata);
  await prisma.game.createMany({
    data:Gamedata
  });

  // Insert dummy games
  // await prisma.game.createMany({
  //   data: [
  //     {
  //       title: 'game1',
  //       description: 'description of game1',
  //       technology: 'technology of game1',
  //       rating: 'rating of game1',
  //       played: 100,
  //       video_url: 'https://example.com/game1-video',
  //       category: 'action',
  //       subcategory: 'adventure',
  //       image_url: 'https://example.com/game1-image',
  //       launch_year: new Date('2022-01-01T00:00:00Z'),
  //       totalLikes: 50 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game2',
  //       description: 'description of game2',
  //       technology: 'technology of game2',
  //       rating: 'rating of game2',
  //       played: 200,
  //       video_url: 'https://example.com/game2-video',
  //       category: 'puzzle',
  //       subcategory: 'strategy',
  //       image_url: 'https://example.com/game2-image',
  //       launch_year: new Date('2023-01-01T00:00:00Z'),
  //       totalLikes: 30 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game1',
  //       description: 'description of game1',
  //       technology: 'technology of game1',
  //       rating: 'rating of game1',
  //       played: 100,
  //       video_url: 'https://example.com/game1-video',
  //       category: 'action',
  //       subcategory: 'adventure',
  //       image_url: 'https://example.com/game1-image',
  //       launch_year: new Date('2022-01-01T00:00:00Z'),
  //       totalLikes: 50 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game2',
  //       description: 'description of game2',
  //       technology: 'technology of game2',
  //       rating: 'rating of game2',
  //       played: 200,
  //       video_url: 'https://example.com/game2-video',
  //       category: 'puzzle',
  //       subcategory: 'strategy',
  //       image_url: 'https://example.com/game2-image',
  //       launch_year: new Date('2023-01-01T00:00:00Z'),
  //       totalLikes: 30 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game1',
  //       description: 'description of game1',
  //       technology: 'technology of game1',
  //       rating: 'rating of game1',
  //       played: 100,
  //       video_url: 'https://example.com/game1-video',
  //       category: 'action',
  //       subcategory: 'adventure',
  //       image_url: 'https://example.com/game1-image',
  //       launch_year: new Date('2022-01-01T00:00:00Z'),
  //       totalLikes: 50 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game2',
  //       description: 'description of game2',
  //       technology: 'technology of game2',
  //       rating: 'rating of game2',
  //       played: 200,
  //       video_url: 'https://example.com/game2-video',
  //       category: 'puzzle',
  //       subcategory: 'strategy',
  //       image_url: 'https://example.com/game2-image',
  //       launch_year: new Date('2023-01-01T00:00:00Z'),
  //       totalLikes: 30 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game1',
  //       description: 'description of game1',
  //       technology: 'technology of game1',
  //       rating: 'rating of game1',
  //       played: 100,
  //       video_url: 'https://example.com/game1-video',
  //       category: 'action',
  //       subcategory: 'adventure',
  //       image_url: 'https://example.com/game1-image',
  //       launch_year: new Date('2022-01-01T00:00:00Z'),
  //       totalLikes: 50 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game2',
  //       description: 'description of game2',
  //       technology: 'technology of game2',
  //       rating: 'rating of game2',
  //       played: 200,
  //       video_url: 'https://example.com/game2-video',
  //       category: 'puzzle',
  //       subcategory: 'strategy',
  //       image_url: 'https://example.com/game2-image',
  //       launch_year: new Date('2023-01-01T00:00:00Z'),
  //       totalLikes: 30 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game1',
  //       description: 'description of game1',
  //       technology: 'technology of game1',
  //       rating: 'rating of game1',
  //       played: 100,
  //       video_url: 'https://example.com/game1-video',
  //       category: 'action',
  //       subcategory: 'adventure',
  //       image_url: 'https://example.com/game1-image',
  //       launch_year: new Date('2022-01-01T00:00:00Z'),
  //       totalLikes: 50 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game2',
  //       description: 'description of game2',
  //       technology: 'technology of game2',
  //       rating: 'rating of game2',
  //       played: 200,
  //       video_url: 'https://example.com/game2-video',
  //       category: 'puzzle',
  //       subcategory: 'strategy',
  //       image_url: 'https://example.com/game2-image',
  //       launch_year: new Date('2023-01-01T00:00:00Z'),
  //       totalLikes: 30 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game1',
  //       description: 'description of game1',
  //       technology: 'technology of game1',
  //       rating: 'rating of game1',
  //       played: 100,
  //       video_url: 'https://example.com/game1-video',
  //       category: 'action',
  //       subcategory: 'adventure',
  //       image_url: 'https://example.com/game1-image',
  //       launch_year: new Date('2022-01-01T00:00:00Z'),
  //       totalLikes: 50 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game2',
  //       description: 'description of game2',
  //       technology: 'technology of game2',
  //       rating: 'rating of game2',
  //       played: 200,
  //       video_url: 'https://example.com/game2-video',
  //       category: 'puzzle',
  //       subcategory: 'strategy',
  //       image_url: 'https://example.com/game2-image',
  //       launch_year: new Date('2023-01-01T00:00:00Z'),
  //       totalLikes: 30 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game1',
  //       description: 'description of game1',
  //       technology: 'technology of game1',
  //       rating: 'rating of game1',
  //       played: 100,
  //       video_url: 'https://example.com/game1-video',
  //       category: 'action',
  //       subcategory: 'adventure',
  //       image_url: 'https://example.com/game1-image',
  //       launch_year: new Date('2022-01-01T00:00:00Z'),
  //       totalLikes: 50 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game2',
  //       description: 'description of game2',
  //       technology: 'technology of game2',
  //       rating: 'rating of game2',
  //       played: 200,
  //       video_url: 'https://example.com/game2-video',
  //       category: 'puzzle',
  //       subcategory: 'strategy',
  //       image_url: 'https://example.com/game2-image',
  //       launch_year: new Date('2023-01-01T00:00:00Z'),
  //       totalLikes: 30 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game1',
  //       description: 'description of game1',
  //       technology: 'technology of game1',
  //       rating: 'rating of game1',
  //       played: 100,
  //       video_url: 'https://example.com/game1-video',
  //       category: 'action',
  //       subcategory: 'adventure',
  //       image_url: 'https://example.com/game1-image',
  //       launch_year: new Date('2022-01-01T00:00:00Z'),
  //       totalLikes: 50 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game2',
  //       description: 'description of game2',
  //       technology: 'technology of game2',
  //       rating: 'rating of game2',
  //       played: 200,
  //       video_url: 'https://example.com/game2-video',
  //       category: 'puzzle',
  //       subcategory: 'strategy',
  //       image_url: 'https://example.com/game2-image',
  //       launch_year: new Date('2023-01-01T00:00:00Z'),
  //       totalLikes: 30 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game1',
  //       description: 'description of game1',
  //       technology: 'technology of game1',
  //       rating: 'rating of game1',
  //       played: 100,
  //       video_url: 'https://example.com/game1-video',
  //       category: 'action',
  //       subcategory: 'adventure',
  //       image_url: 'https://example.com/game1-image',
  //       launch_year: new Date('2022-01-01T00:00:00Z'),
  //       totalLikes: 50 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game2',
  //       description: 'description of game2',
  //       technology: 'technology of game2',
  //       rating: 'rating of game2',
  //       played: 200,
  //       video_url: 'https://example.com/game2-video',
  //       category: 'puzzle',
  //       subcategory: 'strategy',
  //       image_url: 'https://example.com/game2-image',
  //       launch_year: new Date('2023-01-01T00:00:00Z'),
  //       totalLikes: 30 // You can set the totalLikes value based on your requirement
  //     },

  //     {
  //       title: 'game1',
  //       description: 'description of game1',
  //       technology: 'technology of game1',
  //       rating: 'rating of game1',
  //       played: 100,
  //       video_url: 'https://example.com/game1-video',
  //       category: 'action',
  //       subcategory: 'adventure',
  //       image_url: 'https://example.com/game1-image',
  //       launch_year: new Date('2022-01-01T00:00:00Z'),
  //       totalLikes: 50 // You can set the totalLikes value based on your requirement
  //     },
  //     {
  //       title: 'game7',
  //       description: 'description of game2',
  //       technology: 'technology of game2',
  //       rating: 'rating of game2',
  //       played: 200,
  //       video_url: 'https://example.com/game2-video',
  //       category: 'puzzle',
  //       subcategory: 'strategy',
  //       image_url: 'https://example.com/game2-image',
  //       launch_year: new Date('2023-01-01T00:00:00Z'),
  //       totalLikes: 30000 // You can set the totalLikes value based on your requirement
  //     },
  //     // Add more games as needed
  //   ],
  // });

  console.log('Dummy data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
