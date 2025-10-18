"use client";
import React, { useState } from "react";
import {  Send } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";


const StartupForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    pitch: "",
  });

  const [error, setError] = useState({});
  const [pitch, setPitch] = useState("");
  const isPending = false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect with Sanity write client later
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-zinc-900 to-zinc-800 text-white p-8 rounded-2xl shadow-2xl mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
        Create Your Startup
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter startup title..."
            className="w-full p-3 rounded-lg bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your startup idea..."
            className="w-full p-3 rounded-lg bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-teal-500 h-28 resize-none"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          >
            <option value="">Select category</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Finance">Finance</option>
            <option value="E-commerce">E-commerce</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2">Image</label>
          <div className="flex items-center gap-3">
            <input
              
              id="image"
              name="image"
              placeholder="Startup Image Url..."
              className="w-full p-3 rounded-lg bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0]?.name || "" })}
            />
          </div>
        </div>

        {/* Pitch (Markdown Input) */}
        <div data-color-mode="dark">
          <label htmlFor="pitch" className="block text-sm font-medium mb-2">Pitch</label>
          <MDEditor
            id="pitch"
            value={pitch}
            onChange={(value) => setPitch(value as string)}
            preview="edit"
            height={300}
            style={{borderRadius : 20 , overflow : "hidden"}}
            className="w-full p-3 rounded-lg bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-teal-500 h-36 resize-none font-mono"
            textareaProps={{
              placeholder : "Briefly describe your idea and the problem it solves..."
            }}
            previewOptions={{
              disallowedElements : ["style"],
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all duration-200"
        >
          <Send size={20} /> Submit
        </button>
      </form>
    </div>
  );
};

export default StartupForm;
