import { ProjectInterface } from "@/common.types";
import ProjectCard from "./components/ProjectCard";
import { fetchAllProjects } from "./lib/actions";

export default async function Home() {
  const data = await fetchAllProjects();

  if (data.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        {/* <Categories /> */}

        <p className="no-result-text text-center">
          No projects found, go create some first.
        </p>
      </section>
    );
  }

  return (
    <section className="flexStart flex-col paddings mb-16">
      {/* <Categories /> */}

      <section className="projects-grid">
        {data?.map((item) => (
          <ProjectCard
            key={item?._id.toString()}
            title={item?.title}
            _id={item?._id}
            image={item?.image}
            name={item?.createdBy[0].name}
            avatarUrl={item?.createdBy[0].avatarUrl}
            userId={item?.createdBy[0]._id}
          />
        ))}
      </section>
    </section>
  );
}
