import SearchForm from "@/components/SearchForm";
import "../globals.css";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { json } from "stream/consumers";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: String }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Share your Startups</h1>

        <p className="sub-heading !max-w-3xl">
          Share your ideas and vote on them.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className=" text-30-semibold ">
          {query ? `Search results for "${query}"` : `All Startups`}
        </p>

        <ul className="card_grid mt-7">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Startups Found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
