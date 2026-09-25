import { GuideFlow } from "@/components/guide/guide-flow";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="guide" className="flex-1">
        <GuideFlow />
      </main>
    </>
  );
}
