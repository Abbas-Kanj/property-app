"use client";
import { fetchProperty } from "@/utils/requests";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property: ", error);
      } finally {
        setLoading(false);
      }
    };
    if (property === null) {
      FetchPropertyData();
    }
  }, [id, property]);

  return <div>PropertyPage</div>;
};

export default PropertyPage;
