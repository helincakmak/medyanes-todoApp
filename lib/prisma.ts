// her api çağrısında yeni bir prisma oluşmasını önler
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // @ts-expect-error global değişken
  if (!global.prisma) {
    // @ts-expect-error global değişken
    global.prisma = new PrismaClient();
  }
  // @ts-expect-error global değişken
  prisma = global.prisma;
}

export default prisma;