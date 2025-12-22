// js/tools/validate.js

function typeMatches(val, expectedType) {
  if (expectedType === "array") return Array.isArray(val);
  if (expectedType === "null") return val === null;
  return typeof val === expectedType;
}

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

    if (val !== undefined) {
      const expected = rule.type;

      if (!typeMatches(val, expected)) {
        // Lite tydligare felmeddelande för array
        if (expected === "array") {
          return { ok: false, error: `Arg ${key} must be array` };
        }
        return { ok: false, error: `Arg ${key} must be ${expected}` };
      }
    }
  }

  return { ok: true };
}
