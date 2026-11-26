// The light behind the glass, in linear HDR: a dark floor with a few broad,
// slowly drifting pools of the project accent colours, so the curved glass edge
// has something soft to bend. No lines or patterns.

struct Backdrop {
  viewport: vec2f,
  time: f32,
  dim: f32,
  dpr: f32,
}

@group(0) @binding(0) var<uniform> backdrop: Backdrop;

const FLOOR = vec3f(0.006, 0.0075, 0.012);

// A soft round pool of light; `radius` is in CSS px.
fn pool(p: vec2f, centre: vec2f, radius: f32) -> f32 {
  let d = (p - centre) / radius;
  return exp(-dot(d, d));
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let size = backdrop.viewport;
  let p = uv * size;
  let t = backdrop.time * 0.18;
  let reach = size.x * 0.3;
  var colour = FLOOR;
  colour += vec3f(0.07, 0.73, 0.22) * 0.07 * pool(p, size * vec2f(0.18 + 0.1 * sin(t), 0.2 + 0.07 * cos(t * 1.3)), reach);
  colour += vec3f(0.18, 0.52, 0.86) * 0.08 * pool(p, size * vec2f(0.82 + 0.1 * cos(t * 0.8), 0.3 + 0.08 * sin(t)), reach);
  colour += vec3f(0.92, 0.24, 0.16) * 0.06 * pool(p, size * vec2f(0.22 + 0.12 * cos(t * 1.1), 0.78 + 0.06 * sin(t * 0.9)), reach);
  colour += vec3f(0.89, 0.52, 0.06) * 0.06 * pool(p, size * vec2f(0.8 + 0.08 * sin(t * 1.2), 0.82 + 0.07 * cos(t)), reach);
  return vec4f(colour, 0.0);
}
