import type { NextConfig } from "next";
import path from "path";
import { wgslTurbopackRule } from "@vgpu/wgsl/next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
    rules: { "*.wgsl": wgslTurbopackRule() },
  },
};

export default nextConfig;
