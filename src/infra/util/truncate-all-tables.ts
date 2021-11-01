import { Context } from "../shared/context"

/**
 * すべてのテーブルをtruncate
 *
 * ref: https://www.prisma.io/docs/concepts/components/prisma-client/crud#deleting-all-data-with-raw-sql--truncate
 */
export const truncateAllTables = async (context: Context): Promise<void> => {
  const tableNames = await context.prisma.$queryRaw<
    { tablename: string }[]
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`
  for (const { tablename } of tableNames) {
    if (tablename === "_prisma_migrations") {
      continue
    }
    await context.prisma.$executeRawUnsafe(
      `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
    )
  }
}
