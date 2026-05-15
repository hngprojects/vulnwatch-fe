import z from "zod";

export const configureScanSchema = z.object({
  domain: z.url({ error: "Invalid URL" }),
  scanType: z.enum(["QUICK_SCAN", "FULL_SCAN"], {
    error: (value) => {
      console.log(value);

      return "Invalid Scan Type";
    },
  }),
  emailNotification: z.boolean().optional().default(false),
});

export type ConfigureScanSchemaType = z.infer<typeof configureScanSchema>;
