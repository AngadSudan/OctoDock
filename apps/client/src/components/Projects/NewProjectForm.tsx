import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";
import { Link } from "react-router";
import { useCreateProject } from "@/Hooks/api/project";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux";

type OverlayFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: any;
};

type FormErrors = {
  name?: string;
  details?: string;
};

const OverlayFormModal: React.FC<OverlayFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    details: "",
  });
  const userId = useSelector((state: RootState) => state.auth.user.login);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Reset form on open
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", details: "" });
      setErrors({});
    }
  }, [isOpen]);

  // Escape key + scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isLoading, onClose]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    }

    if (!formData.details.trim()) {
      newErrors.details = "Description is required";
    } else if (formData.details.length < 20) {
      newErrors.details = "Description must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSubmit(userId, formData.name, formData.details);
      onClose();
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0  backdrop-blur-sm"
        onClick={!isLoading ? onClose : undefined}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto z-10">
        <div className="bg-zinc-900 text-white rounded-2xl border border-zinc-700 shadow-2xl p-8 pb-6">
          {/* Close Button */}
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
              className="h-8 w-8 p-0 rounded-full hover:bg-zinc-800"
            >
              <X size={16} />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Header */}
          <div>
            <Link to="/" aria-label="Go home" />
            <h1 className="text-xl font-semibold mb-1 mt-4">
              Create an Octadock Project
            </h1>
            <p className="text-sm text-zinc-400">
              Create a project to get started.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm text-zinc-300">
                Project Name *
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`bg-zinc-800 text-white border ${
                  errors.name ? "border-red-500" : "border-zinc-700"
                } placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="details" className="text-sm text-zinc-300">
                Description *
              </Label>
              <textarea
                name="details"
                id="details"
                rows={4}
                value={formData.details}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full min-h-[80px] rounded-md bg-zinc-800 text-white px-3 py-2 text-sm border ${
                  errors.details ? "border-red-500" : "border-zinc-700"
                } placeholder-zinc-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Describe your project..."
              />
              {errors.details && (
                <p className="text-red-500 text-xs">{errors.details}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-zinc-800  text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center border border-zinc-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Proceed"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OverlayFormModal;
