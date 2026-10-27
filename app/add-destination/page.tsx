"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Trash2, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/toast";

const categories = ["Beach", "Mountain", "City", "Safari", "Cultural", "Adventure"];

const initialForm = {
  destinationName: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

export default function AddDestinationPage() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`http://localhost:8000/add-destination`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        let serverMessage = "";
        try {
          const body = (await res.json()) as { message?: string };
          serverMessage = body?.message ?? "";
        } catch {
          // Non-JSON error body — fall through to status-based handling.
        }

        if (res.status === 409) {
          toast.add({
            type: "error",
            title: "Place already added",
            description:
              serverMessage || "This place has already been added.",
            priority: "high",
          });
          return;
        }

        throw new Error(serverMessage || `Server responded with ${res.status}`);
      }

      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
        // Non-JSON response is fine — the request itself succeeded.
      }
      console.log(data);

      toast.add({
        type: "success",
        title: "Travel package added",
        description: `${form.destinationName || "Your package"} was created successfully.`,
      });
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      toast.add({
        type: "error",
        title: "Failed to add travel package",
        description:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        priority: "high",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => setForm(initialForm);

  return (
    <div className="flex min-h-screen flex-col bg-white">


      <main className="flex-1">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <h1 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
            Add New Travel Package
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="destinationName">Destination Name</Label>
                <Input
                  id="destinationName"
                  placeholder="Bali Paradise"
                  value={form.destinationName}
                  onChange={(e) => update("destinationName", e.target.value)}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="Indonesia"
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={form.category}
                    onValueChange={(value) => update("category", value ?? "")}
                  >
                    <SelectTrigger className="h-9 w-full">
                      <SelectValue placeholder="Beach" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    placeholder="e.g., 1299"
                    value={form.price}
                    onChange={(e) => update("price", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 7 Days/6 Nights"
                    value={form.duration}
                    onChange={(e) => update("duration", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="departureDate">Departure Date</Label>
                <Input
                  id="departureDate"
                  type="date"
                  placeholder="mm/dd/yyyy"
                  value={form.departureDate}
                  onChange={(e) => update("departureDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={form.imageUrl}
                  onChange={(e) => update("imageUrl", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the travel experience..."
                  rows={5}
                  className="resize-none"
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="gap-2 border-red-200 text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="gap-2 bg-sky-600 text-white hover:bg-sky-700"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSubmitting ? "Adding..." : "Add Travel Package"}
              </Button>
            </div>
          </form>
        </div>
      </main>


    </div>
  );
}
