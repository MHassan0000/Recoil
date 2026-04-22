"use client";
import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { Send } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import { createStartup } from "@/lib/actions";
import { toast } from "sonner";
import { MAX_IMAGE_SIZE_BYTES } from "@/lib/validation";

type StartupFormState = {
  error: string;
  status: "INITIAL" | "SUCCESS" | "ERROR";
  fieldErrors?: Record<string, string>;
  id?: string;
};

type StartupFormValues = {
  title: string;
  description: string;
  category: string;
};

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const [formValues, setFormValues] = useState<StartupFormValues>({
    title: "",
    description: "",
    category: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string>("");
  const router = useRouter();

  const handleFormSubmit = async (prevState: StartupFormState, formData: FormData): Promise<StartupFormState> => {
    formData.set("pitch", pitch);

    const result = await createStartup(formData);

    if (result.status === "SUCCESS") {
      toast.success("🚀 Startup created successfully!", {
        description: "Your startup has been published to the feed.",
        duration: 4000,
      });

      setErrors({});
      router.push(`/Startup/${result.id}`);
      return {
        ...result,
      };
    }

    setErrors(result.fieldErrors ?? {});

    toast.error("⚠️ Submit failed", {
      description: result.error || "Please check your inputs and try again.",
    });

    return {
      ...result,
    };
  };

  const [, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
    fieldErrors: {},
  } as StartupFormState);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    if (!file) {
      setSelectedImageName("");
      return;
    }

    setSelectedImageName(file.name);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const maxImageSizeMb = Math.floor(MAX_IMAGE_SIZE_BYTES / (1024 * 1024));

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleInputClearError = (name: string) => {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    handleInputClearError(name);
  };

  const handlePitchChange = (value?: string) => {
    setPitch(value ?? "");
    handleInputClearError("pitch");
  };

  const hasImageError = Boolean(errors.image);

  const inputClassName = (field: string) =>
    `w-full p-3 rounded-lg bg-zinc-700 focus:outline-none focus:ring-2 text-sm sm:text-base ${
      errors[field] ? "ring-red-500" : "focus:ring-teal-500"
    }`;

  return (
    <div className="w-full max-w-full sm:max-w-2xl mx-auto bg-gradient-to-br from-zinc-900 to-zinc-800 text-white p-6 sm:p-8 rounded-2xl shadow-2xl mt-6 sm:mt-10 border border-zinc-700/40">
      <h2 className="text-3xl font-semibold mb-6 text-center bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
        Create Your Startup
      </h2>

      <form action={formAction} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter startup title..."
            className={inputClassName("title")}
            value={formValues.title}
            onChange={handleInputChange}
            required
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your startup idea..."
            className={`${inputClassName("description")} h-28 resize-none`}
            value={formValues.description}
            onChange={handleInputChange}
            required
          ></textarea>
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            className={inputClassName("category")}
            value={formValues.category}
            onChange={handleInputChange}
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

        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Startup Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif"
            className={`w-full rounded-lg bg-zinc-700/70 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600 ${
              hasImageError ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-teal-500"
            }`}
            onChange={(event) => {
              handleImageChange(event);
              handleInputClearError("image");
            }}
            required
          />
          <p className="text-zinc-300 text-xs mt-2">
            Upload JPG, PNG, WEBP, or AVIF. Max file size: {maxImageSizeMb}MB.
          </p>
          {selectedImageName && (
            <p className="text-zinc-200 text-sm mt-1">Selected: {selectedImageName}</p>
          )}
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Selected startup preview"
              className="mt-3 h-40 w-full rounded-lg object-cover border border-zinc-600"
            />
          )}
          {errors.image && (
            <p className="text-red-400 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        <div data-color-mode="dark">
          <label htmlFor="pitch" className="block text-sm font-medium mb-2">
            Pitch
          </label>
          <MDEditor
            id="pitch"
            value={pitch}
            onChange={handlePitchChange}
            preview="edit"
            height={240}
            style={{ borderRadius: 20, overflow: "hidden" }}
            className={`w-full p-0 rounded-lg ${
              errors.pitch ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-teal-500"
            } h-[240px] sm:h-[300px]`}
            textareaProps={{
              placeholder:
                "Briefly describe your idea and the problem it solves...",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
          <input type="hidden" name="pitch" value={pitch} />
          {errors.pitch && (
            <p className="text-red-400 text-sm mt-1">{errors.pitch}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all duration-200 disabled:opacity-60 hover:scale-105"
        >
          <Send size={20} />
          {isPending ? "Submitting..." : "Submit Startup"}
        </button>
      </form>
    </div>
  );
};

export default StartupForm;
