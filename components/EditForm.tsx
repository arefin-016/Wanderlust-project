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
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { DialogClose, DialogFooter } from "./ui/dialog";

const categories = ["Beach", "Mountain", "City", "Safari", "Cultural", "Adventure"];

export interface Destination {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

interface EditFormProps {
  item: Destination;
  onSaved?: (updated: Destination) => void;
}

export default function EditForm({ item, onSaved }: EditFormProps) {
  const [form, setForm] = useState(item);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev: typeof form) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { _id, ...payload } = form;
      const res = await fetch(`http://localhost:8000/all-destinations/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let serverMessage = "";
        try {
          const body = await res.json();
          serverMessage = typeof body?.message === "string" ? body.message : "";
        } catch {
          // ignore non-JSON error bodies
        }

        if (res.status === 409) {
          toast.add({
            type: "error",
            title: "Place already added",
            description: serverMessage || "the place is added already",
            priority: "high",
          });
          return;
        }

        throw new Error(serverMessage || `Server responded with ${res.status}`);
      }

      const body = await res.json();
      const updated: Destination = body?.destination ?? { ...form };

      toast.add({
        type: "success",
        title: "Destination updated",
        description: `${updated.destinationName} has been updated successfully.`,
      });

      setForm(updated);
      onSaved?.(updated);
    } catch (err) {
      toast.add({
        type: "error",
        title: "Failed to update",
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="destinationName">Destination Name</Label>
        <Input
          id="destinationName"
          value={form.destinationName}
          onChange={(e) => update("destinationName", e.target.value)}
          placeholder="e.g. Bali, Indonesia"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          value={form.country}
          onChange={(e) => update("country", e.target.value)}
          placeholder="e.g. Indonesia"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={form.category} onValueChange={(value) => update("category", value ?? "")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
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

        <div className="space-y-2">
          <Label htmlFor="price">Price per person ($)</Label>
          <Input
            id="price"
            type="number"
            min="0"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            placeholder="e.g. 1200"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (days)</Label>
          <Input
            id="duration"
            type="number"
            min="1"
            value={form.duration}
            onChange={(e) => update("duration", e.target.value)}
            placeholder="e.g. 7"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="departureDate">Departure Date</Label>
          <Input
            id="departureDate"
            type="date"
            value={form.departureDate}
            onChange={(e) => update("departureDate", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image</Label>
        <Input
          id="imageUrl"
          value={form.imageUrl}
          onChange={(e) => update("imageUrl", e.target.value)}
          placeholder="Paste an image URL"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Describe this destination..."
        />
      </div>

      <DialogFooter>
        <DialogClose
          render={<Button type="button" variant="outline" disabled={isSubmitting}>
            Cancel
          </Button>}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="gap-2 bg-sky-600 text-white hover:bg-sky-700"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}
