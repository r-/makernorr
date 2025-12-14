// js/tools/index.js

export let TOOL_SCHEMAS = [];
export let TOOL_SCHEMA_MAP = {};
export let TOOL_RUNNERS = {};

export async function loadTools() {
  const res = await fetch("./js/tools/tools.json");
  const manifest = await res.json();

  for (const t of manifest.tools) {
    const schemaMod = await import(`./${t.dir}/schema.js`);
    const toolMod   = await import(`./${t.dir}/tool.js`);

    TOOL_SCHEMAS.push(schemaMod.schema);
    TOOL_SCHEMA_MAP[schemaMod.schema.name] = schemaMod.schema;
    TOOL_RUNNERS[schemaMod.schema.name] = toolMod.run;
  }
}

export function buildToolsForPrompt() {
  return TOOL_SCHEMAS.map(t =>
    `Tool: ${t.name}\nDescription: ${t.description}`
  ).join("\n\n");
}