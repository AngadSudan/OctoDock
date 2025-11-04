import configuration from "@/conf/configuration";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";

function Deployment() {
  const param = useParams();
  useEffect(() => {
    console.log(
      configuration.builder_server + "/deployment-logs?projectId=" + param.id,
    );
    const eventSource = new EventSource(
      configuration.builder_server + "/deployment-logs?projectId=" + param.id,
    );
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
    };

    eventSource.onerror = (error) => {
      console.log("An SSE error occurred:");
      console.error(error);
    };
    return () => eventSource.close();
  }, []);
  return <div>Deployment</div>;
}

export default Deployment;
