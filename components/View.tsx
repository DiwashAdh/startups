import React from 'react';
import Ping from './Ping';
import { client } from '@/sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';
import { unstable_after as after } from "next/server";

// Helper function to format the view count with K, M, B
const formatNumber = (count: number) => {
  if (count >= 1_000_000_000) {
    // If views are in the billions
    return (count / 1_000_000_000).toFixed(1) + 'B';
  } else if (count >= 1_000_000) {
    // If views are in the millions
    return (count / 1_000_000).toFixed(1) + 'M';
  } else if (count >= 1_000) {
    // If views are in the thousands
    return (count / 1_000).toFixed(1) + 'K';
  } else {
    // If views are less than 1000
    return count.toString();
  }
};

const View = async ({ id }: { id: string }) => {
  // Fetch total views from your data source
    const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id });
    const viewLabel = totalViews === 1 ? 'view' : 'views';

    after( async ()=> await writeClient
    .patch(id)
    .set({ views : totalViews + 1})
    .commit())

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">

        <span>{formatNumber(totalViews)} {viewLabel}</span>
      </p>
    </div>
  );
};

export default View;
