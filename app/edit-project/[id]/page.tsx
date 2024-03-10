import React from "react";
import Modal from "../../components/Modal";
import ProjectForm from "../../components/ProjectForm";
import { getCurrentUser } from "../../lib/session";
import { redirect } from "next/navigation";
import { getProject } from "@/app/lib/actions";
import { ProjectInterface } from "@/common.types";

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const result = (await getProject(id)) as ProjectInterface;
  result?._id.toString();
  result?.createdBy._id.toString();

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm type="edit" session={session} project={result} />
    </Modal>
  );
};

export default EditProject;
