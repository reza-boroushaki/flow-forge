import { ProjectInterface } from "@/common.types";
import ProjectCard from "./components/ProjectCard";
import { fetchAllProjects } from "./lib/actions";
import Categories from "./components/Categories";
import { HeroParallax } from "./components/Hero";
import { heroProdcts, testimonials } from "./constant";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default async function Home({
  searchParams: { category },
}: {
  searchParams: { category: string };
}) {
  const data = (await fetchAllProjects(category)) as ProjectInterface[];

  return (
    <>
      <HeroParallax products={heroProdcts} />

      <Categories />

      <section className="flexStart flex-col paddings mb-16">
        {data?.length === 0 ? (
          <p className="no-result-text text-center">
            No projects found, go create some first.
          </p>
        ) : (
          <section className="projects-grid">
            {data?.map((item) => (
              <ProjectCard
                key={item?._id.toString()}
                title={item?.title}
                _id={item?._id.toString()}
                image={item?.image}
                name={item?.createdBy.name}
                avatarUrl={item?.createdBy.avatarUrl}
                userId={item?.createdBy._id.toString()}
              />
            ))}
          </section>
        )}
      </section>

      <div className="h-[40rem] rounded-md flex flex-col antialiased bg-gradient-to-t from-[#fafafb] to-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
          className=""
        />
      </div>
    </>
  );
}
