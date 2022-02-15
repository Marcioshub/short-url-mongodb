import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Redirect() {
  const { url } = useParams();
  const navigate = useNavigate();

  async function getUrl() {
    const response = await axios.get(`/r/${url}`);

    if (response.data) {
      const { err, original } = response.data;

      if (err) {
        navigate("/urlnotfound");
      }

      if (original) {
        window.location = original;
      }
    }
  }

  useEffect(() => {
    getUrl();
  }, []);

  console.log(url);

  return <div>Redirect...</div>;
}
