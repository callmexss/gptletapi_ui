"use client"

import AppCard from "@/components/AppCard";

export default function AppPage({ params, searchParams }) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <AppCard id={params.id} name={searchParams.name} description={searchParams.description} />
    </div>
  );
}
