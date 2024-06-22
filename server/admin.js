import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { PrismaClient } from '@prisma/client';
import AdminJSPrisma from '@adminjs/prisma';
import { Database, Resource, getModelByName } from '@adminjs/prisma'

const prisma = new PrismaClient()

AdminJS.registerAdapter({ Database, Resource })


// AdminJS.registerAdapter({
//   Resource: AdminJSPrisma.Resource,
//   Database: AdminJSPrisma.Database,
// });

const adminOptions = {
 resources: [
    { resource: { model: getModelByName('User'), client: prisma }, options: {} },
    { resource: { model: getModelByName('Game'), client: prisma }, options: {} },
    { resource: { model: getModelByName('Like'), client: prisma }, options: {} },
    { resource: { model: getModelByName('FavoriteGame'), client: prisma }, options: {} },
    { resource: { model: getModelByName('Category'), client: prisma }, options: {} },
    { resource: { model: getModelByName('Description2'), client: prisma }, options: {} },
  ],
  rootPath: '/admin',
};

const admin = new AdminJS(adminOptions);

const adminRouter = AdminJSExpress.buildRouter(admin);

export { admin, adminRouter };
