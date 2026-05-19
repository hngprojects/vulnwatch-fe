import z from "zod";

export const configureScanSchema = z.object({
  domain: z.string().url({ message: "Please enter a valid URL" }),
  scanType: z.enum(["QUICK_SCAN", "FULL_SCAN"], {
    error: (el) => {
      console.log(el);
      return { message: "Please select a scan type" };
    },
  }),
  emailNotification: z.boolean().default(false),
});

export type ConfigureScanSchemaType = z.infer<typeof configureScanSchema>;
