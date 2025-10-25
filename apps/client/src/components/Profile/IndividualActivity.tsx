import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/index";

function IndividualActivity() {
  const username = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="p-4">
      {/* <OctodockActivity /> */}
      <img
        src={`https://github-readme-activity-graph.vercel.app/graph?username=${encodeURIComponent(username.login)}&theme=github-dark`}
        alt={`${username.login}'s GitHub activity graph`}
        loading="lazy"
      />
    </div>
  );
}

export default IndividualActivity;
