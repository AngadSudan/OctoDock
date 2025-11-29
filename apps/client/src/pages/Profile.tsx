import ProfileIndex from "@/components/Profile/ProfileIndex";
import React from "react";
import { Helmet } from "react-helmet";
function Profile() {
  return (
    <>
      <Helmet>
        <title>Your Profile | Octodock</title>

        <meta
          name="description"
          content="View and manage your Octodock profile, update account details, and customize your development workspace across distributed container environments."
        />

        {/* Prevent indexing for user-specific pages */}
        <meta name="robots" content="noindex, nofollow" />

        {/* Open Graph */}
        <meta property="og:title" content="Your Octodock Profile" />
        <meta
          property="og:description"
          content="Access and manage your profile settings within Octodock’s advanced containerized development ecosystem."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Octodock" />
      </Helmet>

      <ProfileIndex />
    </>
  );
}

export default Profile;
