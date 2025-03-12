import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { redisStore } from "cache-manager-ioredis-yet";

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          host: "localhost",
          port: 6379,
        }),
        ttl: 10, // Cache lifetime in seconds. Indicates the default cache time for any stored data (you can override it in the particular service).
      }),
    }),
  ],
  exports: [CacheModule],
})
export class CacheConfigModule {}
