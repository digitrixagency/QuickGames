const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const excelToJson=require('./scrap')

const filepath='./HTML_Games.xlsx'
async function main() {
  // // Insert dummy users
<<<<<<< Updated upstream


  const Gamedata=excelToJson(filepath);
  console.log(Gamedata);
  await prisma.game.createMany({
    data:Gamedata
  });
=======
  // await prisma.user.createMany({
  //   data: [
  //     { name: 'user1', email: 'user1@example.com', password: 'password1' },
  //     { name: 'user2', email: 'user2@example.com', password: 'password2' },
  //     { name: 'user3', email: 'user3@example.com', password: 'password3' },
  //     { name: 'user4', email: 'user4@example.com', password: 'password4' },
  //     // Add more users as needed
  //   ],
  // });
>>>>>>> Stashed changes

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
