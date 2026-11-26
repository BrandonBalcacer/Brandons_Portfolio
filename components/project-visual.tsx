import Image from "next/image";
import type { ProjectStory } from "@/lib/project-details";

export function ProjectVisual({ images, slug }: { images: ProjectStory["images"]; slug: string }) {
  const main = images[0];
  return <div className={`project-image ${main.portrait ? "project-image-phones" : ""}`}>
    {main.portrait ? <>
      <div className="preview-phone preview-phone-primary"><Image src={main.src} alt={main.alt} fill sizes="180px" className="object-cover object-top" /></div>
      <div className="preview-phone preview-phone-secondary"><Image src={images[1].src} alt={images[1].alt} fill sizes="160px" className="object-cover object-top" /></div>
    </> : <Image src={main.src} alt={main.alt} fill sizes="(max-width: 639px) 100vw, 480px" className={`project-screenshot project-screenshot-${slug}`} />}
    <span className="preview-image-label" aria-hidden="true">{slug === "bakelytics" ? "Sample data" : slug === "crm-agent" ? "Sample workspace" : slug === "roam" ? "Discover / save / plan" : "Territory discovery"}</span>
  </div>;
}
