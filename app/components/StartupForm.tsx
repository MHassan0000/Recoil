"use client";
import React, { useState } from "react";
import { useActionState } from "react";
import { Send } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createStartup } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        image: formData.get("image") as string,
        pitch: formData.get("pitch") as string,
      };

      await formSchema.parseAsync(formValues);

      const result = await createStartup(prevState , formData , pitch);
      if(result.status === "SUCCESS"){
        //Toast here
         router.push(`/Startup/${result.id}`)
      }
      return result
      setErrors({});
      return { ...prevState, status: "SUCCESS", error: "" };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        return {
          ...prevState,
          error: "Validation failed",
          status: "ERROR",
        };
      }

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-zinc-900 to-zinc-800 text-white p-8 rounded-2xl shadow-2xl mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
        Create Your Startup
      </h2>

      <form action={formAction} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter startup title..."
            className={`w-full p-3 rounded-lg bg-zinc-700 focus:outline-none focus:ring-2 ${
              errors.title ? "ring-red-500" : "focus:ring-teal-500"
            }`}
            required
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your startup idea..."
            className={`w-full p-3 rounded-lg bg-zinc-700 focus:outline-none focus:ring-2 ${
              errors.description ? "ring-red-500" : "focus:ring-teal-500"
            } h-28 resize-none`}
            required
          ></textarea>
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            className={`w-full p-3 rounded-lg bg-zinc-700 focus:outline-none focus:ring-2 ${
              errors.category ? "ring-red-500" : "focus:ring-teal-500"
            }`}
            required
          >
            <option value="">Select category</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Finance">Finance</option>
            <option value="E-commerce">E-commerce</option>
          </select>
          {errors.category && (
            <p className="text-red-400 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Image
          </label>
          <input
            id="image"
            name="image"
            placeholder="Startup Image URL..."
            className={`w-full p-3 rounded-lg bg-zinc-700 focus:outline-none focus:ring-2 ${
              errors.image ? "ring-red-500" : "focus:ring-teal-500"
            }`}
          />
          {errors.image && (
            <p className="text-red-400 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        {/* Pitch */}
        <div data-color-mode="dark">
          <label htmlFor="pitch" className="block text-sm font-medium mb-2">
            Pitch
          </label>
          <MDEditor
            id="pitch"
            value={pitch}
            onChange={(value) => setPitch(value?? "")}
            preview="edit"
            height={300}
            style={{ borderRadius: 20, overflow: "hidden" }}
            className={`w-full p-3 rounded-lg ${
              errors.pitch ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-teal-500"
            }`}
            textareaProps={{
              placeholder:
                "Briefly describe your idea and the problem it solves...",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
          {errors.pitch && (
            <p className="text-red-400 text-sm mt-1">{errors.pitch}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all duration-200"
        >
          <Send size={20} />
          {isPending ? "Submitting..." : "Submit Startup"}
        </button>
      </form>
    </div>
  );
};

export default StartupForm;
