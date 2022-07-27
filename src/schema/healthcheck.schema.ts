import { z } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    HealthcheckResponse:
 *      type: object
 *      properties:
 *        ok:
 *          type: boolean
 *          example: true
 *        message:
 *          type: string
 *          example: All systems operational
 */
export const healthCheckResponse = z.object({
    ok: z.boolean(),
    message: z.string(),
});

export type HealthcheckResponse = z.TypeOf<typeof healthCheckResponse>;
