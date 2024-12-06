import { Logger } from '@common/utils/loggers'
import { ProductSeeds } from '@infrastructure/persistence/database/seeds'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await ProductSeeds(prisma)()
  Logger.info('[Prisma] Seeds created successfully')
}

main()
  .catch((e) => {
    Logger.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
