import type { FastifyInstance, RawServerDefault, RawReplyDefaultExpression, RawRequestDefaultExpression, FastifyBaseLogger,  } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export type FastifyTypedInstance = FastifyInstance<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
FastifyBaseLogger,
ZodTypeProvider
>