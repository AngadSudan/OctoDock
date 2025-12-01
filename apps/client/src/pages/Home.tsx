import Hero from "@/components/Home/Hero";
import Header from "@/components/general/Header";
import ParallaxComponent from "@/components/About/Prallax";
import Pricing from "@/components/Home/Pricing";
import { Helmet } from "react-helmet";
import { lazy, Suspense } from "react";
import Loader from "@/components/Loader";

const HorizontalParallax = lazy(
  () => import("@/components/About/HorizontalParallax"),
);
const AboutHero = lazy(() => import("@/components/About/Hero"));
function Home() {
  return (
    <>
      <Helmet>
        <title>
          Home | Octodock – Future-Driven Software Development & Containerized
          Workflows
        </title>

        <meta
          name="description"
          content="Octodock revolutionizes software development with advanced containerization, automated deployment orchestration, and a global distributed computing grid—empowering teams to build, scale, and innovate without infrastructure complexity."
        />

        <meta
          name="keywords"
          content="containerization, distributed computing, devops automation, software development, edge computing, deployment orchestration, scalability tools"
        />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Future-Driven Software Development | Octodock"
        />
        <meta
          property="og:description"
          content="Octodock transforms development workflows with intelligent automation, distributed compute power, and next-generation containerization protocols—helping teams innovate faster and scale globally."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Octodock" />
      </Helmet>

      <div className="overflow-x-hidden">
        <Header />
        <Hero />
        <Suspense fallback={<Loader />}>
          <AboutHero />
        </Suspense>
        <ParallaxComponent />
        <Pricing />
        <Suspense fallback={<Loader />}>
          <HorizontalParallax />
        </Suspense>
      </div>
    </>
  );
}

export default Home;
