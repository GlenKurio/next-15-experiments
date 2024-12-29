import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const posts = [
    {
      createdAt: new Date(),
      views: 55,
      author: { id: 1, name: "Oleh Minko" },
      id: 1,
      image:
        "https://t3.ftcdn.net/jpg/05/59/87/12/360_F_559871209_pbXlOVArUal3mk6Ce60JuP13kmuIRCth.jpg",
      description: "description",
      category: "Robotics",
      title: "We Robots",
    },
  ];
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect with Enterpreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Showing results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post) => <StartupCard post={post} key={post.id} />)
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
