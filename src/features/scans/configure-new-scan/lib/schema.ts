import z from "zod";

const domainOrUrlRegex = /^(https?:\/\/)?([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}(:\d+)?(\/[^?#]*)?(\?[^#]*)?(#.*)?$/;

export const configureScanSchema = z.object({
  domain: z.string().trim().min(1, { message: "Domain is required" }).refine(
    (val) => domainOrUrlRegex.test(val),
    { message: "Please enter a valid domain or URL" }
  ),
  scanType: z.enum(["QUICK_SCAN", "FULL_SCAN"]),
  emailNotification: z.boolean(),
});

export type ConfigureScanSchemaType = z.infer<typeof configureScanSchema>;
