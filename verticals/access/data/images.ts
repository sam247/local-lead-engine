/**
 * Image prompts for the Access vertical. Use these to generate or source assets;
 * place generated files in public/images/ with the filenames expected by lib/images.ts
 * (e.g. services/<slug>.jpg, projects/project-1.jpg … project-6.jpg, blog/blog-1.jpg … blog-3.jpg).
 */

export const serviceImagePrompts: Record<string, string> = {
  "access-control-systems": "commercial office access control keypad and card entry system",
  "commercial-cctv-installation": "technician installing commercial CCTV security camera on building ceiling",
  "ip-camera-systems": "modern IP security camera mounted in commercial building",
  "perimeter-security-systems": "industrial perimeter security cameras protecting warehouse fence",
  "security-system-integration": "security monitoring control room with multiple surveillance screens",
};

export const projectImagePrompts: string[] = [
  "commercial security installation",
  "hospital access control system",
  "data centre security infrastructure",
  "warehouse security cameras",
  "building security monitoring",
  "industrial perimeter security and access control",
];

export const blogImagePrompts: string[] = [
  "access control and CCTV in modern office building",
  "CCTV compliance and security signage in commercial premises",
  "perimeter security and surveillance at commercial site",
];
