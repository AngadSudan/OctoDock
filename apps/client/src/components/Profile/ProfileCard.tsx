import React from "react";
import GithubCard from "./githubCard";
import {
  Component,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
} from "@/components/ui/animated-tabs";
import IndividualActivity from "./IndividualActivity";
import ListIndividualProjects from "./ListIndividualProjects";
import OctadockAccount from "./OctadockAccount";

function ProfileCard() {
  return (
    <div className="bg-black min-h-screen">
      <GithubCard />
      <Component
        //   @ts-ignore
        defaultValue="account"
        className="w-[80%] mx-auto mt-3 text-white  rounded-lg"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContents className="mx-1 mb-1 -mt-2 rounded-sm h-full bg-background">
          <TabsContent value="account" className="space-y-6 p-6">
            <OctadockAccount />
          </TabsContent>
          <TabsContent value="projects" className="space-y-6 p-6">
            <ListIndividualProjects />
          </TabsContent>
          <TabsContent value="activity" className="space-y-6 p-6">
            <IndividualActivity />
          </TabsContent>
        </TabsContents>
      </Component>
    </div>
  );
}

export default ProfileCard;
