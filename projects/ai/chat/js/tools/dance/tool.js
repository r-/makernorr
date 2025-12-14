// js/tools/dance/tool.js

export async function run({ duration_ms = 1200 } = {}) {
  document.body.classList.add("dance");

  setTimeout(() => {
    document.body.classList.remove("dance");
  }, duration_ms);

  return { ok: true };
}