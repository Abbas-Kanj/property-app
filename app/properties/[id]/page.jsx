"use client";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import { fetchProperty } from "@/utils/requests";
import Link from "next/link";
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

  if (!property && !loading) {
    return (
      <h1 className="text-2xl text-center font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <i className="fas fa-arrow-left mr-2"></i> Back to Properties
              </Link>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default PropertyPage;
