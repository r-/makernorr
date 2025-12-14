// js/tools/dance/schema.js

export const schema = {
  name: "dance",
  description: "Makes the app do a short visual dance animation.",
  args: {
    duration_ms: {
      type: "number",
      required: false,
      description: "Duration of the dance in milliseconds"
    }
  }
};