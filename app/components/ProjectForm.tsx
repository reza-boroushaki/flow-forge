"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { FormState, SessionInterface } from "@/common.types";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MAX_FILE_SIZE, categoryFilters } from "../constant";
import { createProject } from "../lib/actions";
import { useRouter } from "next/navigation";
import { DrawerClose } from "@/components/ui/drawer";

type Props = {
  type: string;
  session: SessionInterface;
  // project?: ProjectInterface
};

const schema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  image: z.any().refine((files) => {
    return files?.[0]?.size <= MAX_FILE_SIZE;
  }, `Max image size is 5MB.`),
  description: z.string(),
  liveSiteUrl: z.string(),
  githubUrl: z.string(),
});

const ProjectForm = ({ type, session }: Props) => {
  const [imageURI, setImageURI] = useState<string>("");
  const [categoryValue, setCategoryValue] = useState<string>("");
  const { register, handleSubmit, formState } = useForm<FormState>({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      liveSiteUrl: "",
      githubUrl: "",
      category: "",
    },
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const { errors, isSubmitting, isSubmitted } = formState;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;
      setImageURI(result);
    };
  };

  const onSubmit = async (data: FormState) => {
    data.image = imageURI;
    data.category = categoryValue;
    try {
      if (type === "create") {
        await createProject(data, session?.user?.id);

        router.push("/");
      }

      // if (type === "edit") {
      //     await updateProject(form, project?.id as string, token)

      //     router.push("/")
      // }
    } catch (error) {
      alert(
        `Failed to ${
          type === "create" ? "create" : "edit"
        } a project. Try again!`
      );
    } finally {
      // setSubmitting(false)
    }
  };

  return (
    <form
      className="flexStart form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          <span className={`${!imageURI ? "opacity-100" : "opacity-0"}`}>
            Choose a poster for your project
          </span>
        </label>
        <Input
          type="file"
          className="form_image-input"
          id="image"
          accept="image/*"
          {...register("image")}
          onChange={handleImageChange}
        />
        <p className="drawerFormError !mt-1">{errors.image?.message}</p>
        {imageURI && (
          <Image
            src={imageURI}
            className="sm:p-10 object-contain z-20"
            alt="image"
            fill
          />
        )}
      </div>

      <div className="flexStart flex-col w-full gap-4">
        <label className="w-full text-gray-100">Title</label>
        <Input type="text" placeholder="FlowForge" {...register("title")} />
        <p className="drawerFormError">{errors.title?.message}</p>
      </div>

      <div className="flexStart flex-col w-full gap-4">
        <label className="w-full text-gray-100">Description</label>
        <Textarea
          placeholder="Showcase and discover remarkable developer projects."
          {...register("description")}
        />
      </div>

      <div className="flexStart flex-col w-full gap-4">
        <label className="w-full text-gray-100">Website URL</label>
        <Input
          type="text"
          placeholder="https://flowforge.dev"
          {...register("liveSiteUrl")}
        />
      </div>

      <div className="flexStart flex-col w-full gap-4">
        <label className="w-full text-gray-100">Github URL</label>
        <Input
          type="text"
          placeholder="https://github.com/reza-boroushaki"
          {...register("githubUrl")}
        />
      </div>

      <div className="flexStart flex-col w-full gap-4">
        <label className="w-full text-gray-100">Category</label>
        <ToggleGroup
          variant="outline"
          type="single"
          className="flex flex-wrap justify-start"
          onValueChange={(value) => setCategoryValue(value)}
        >
          {categoryFilters.map((filter, index) => (
            <ToggleGroupItem key={index} value={filter}>
              {filter}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="w-full">
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {type === "create" ? (
            <>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Image
                  src={"/plus.svg"}
                  width={14}
                  height={14}
                  alt="left icon"
                  className="mr-2 h-4 w-4"
                />
              )}
              Create
            </>
          ) : (
            "Edit"
          )}
        </Button>
        <DrawerClose asChild className="w-full mt-4">
          <Button
            variant="outline"
            className="w-full"
            disabled={isSubmitting}
            onClick={() => router.push("/")}
          >
            Cancel
          </Button>
        </DrawerClose>
      </div>
    </form>
  );
};

export default ProjectForm;
