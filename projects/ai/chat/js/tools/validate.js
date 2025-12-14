// js/tools/validate.js

export function validateToolUse(toolUse, schemaMap) {
  if (!toolUse || typeof toolUse !== "object") {
    return { ok: false, error: "tool_use is not an object" };
  }

  const { name, args } = toolUse;
  const schema = schemaMap[name];
  if (!schema) return { ok: false, error: "Unknown tool" };

  const a = args ?? {};
  for (const [key, rule] of Object.entries(schema.args || {})) {
    const val = a[key];

    if (rule.required && val === undefined) {
      return { ok: false, error: `Missing arg: ${key}` };
    }
    if (val !== undefined && typeof val !== rule.type) {
      return { ok: false, error: `Arg ${key} must be ${rule.type}` };
    }
  }

  return { ok: true };
}