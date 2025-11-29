import AboutIndex from "@/components/About/AboutIndex";
import React from "react";
import { Helmet } from "react-helmet";
function About() {
  return (
    <>
      <Helmet>
        <title>
          About Us | Octodock – Future-Driven Software Development & Distributed
          Containerization
        </title>

        <meta
          name="description"
          content="Learn about Octodock, the platform revolutionizing software development through advanced containerization, automated orchestration, and a global distributed computing grid. Discover our mission to help teams innovate, scale, and build future-driven digital solutions."
        />

        <meta
          name="keywords"
          content="about Octodock, distributed computing, containerization platform, devops automation, software development solutions, edge computing, deployment orchestration"
        />

        {/* Open Graph Meta */}
        <meta
          property="og:title"
          content="About Octodock – Innovating the Future of Software Development"
        />
        <meta
          property="og:description"
          content="Octodock empowers developers and businesses through next-gen containerization, distributed compute power, and intelligent automation. Learn our story and mission."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Octodock" />
      </Helmet>
      <AboutIndex />;
    </>
  );
}

export default About;
