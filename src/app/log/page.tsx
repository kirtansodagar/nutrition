"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Camera,
  Upload,
  X,
  Plus,
  Minus,
  Check,
  Loader2,
  ArrowLeft,
  Trash2,
} from "lucide-react";

type FoodItem = {
  id: string;
  foodName: string;
  portionGrams: number;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  foodId?: string;
};

type TimeOfDay = "breakfast" | "lunch" | "dinner" | "snack";

function detectTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "breakfast";
  if (hour >= 11 && hour < 16) return "lunch";
  if (hour >= 16 && hour < 21) return "dinner";
  return "snack";
}

export default function LogPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(detectTimeOfDay);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<FoodItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCapture = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setSaved(false);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhoto(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
    setError(null);
  }, []);

  const handleRetake = useCallback(() => {
    setPhoto(null);
    setPhotoFile(null);
    setItems([]);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const analyzePhoto = useCallback(async () => {
    if (!photoFile) return;
    setLoading(true);
    setError(null);

    try {
      // Convert photo to base64 directly (skip S3 for recognition)
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = (ev) => {
          const result = ev.target?.result as string;
          // Remove data:image/...;base64, prefix
          const base64 = result.split(",")[1];
          resolve(base64);
        };
        reader.readAsDataURL(photoFile);
      });
      const base64Image = await base64Promise;

      // Send base64 directly to food recognition
      const res = await fetch("/api/food/recognize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64Image }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Failed to analyze photo");
      }

      const data = await res.json();
      const recognized: FoodItem[] = (data.items ?? []).map(
        (item: Record<string, unknown>, i: number) => {
          const nutrition = item.nutrition as Record<string, unknown> | null;
          return {
            id: `item-${Date.now()}-${i}`,
            foodName: (item.name as string) || "Unknown food",
            portionGrams: (item.estimatedGrams as number) || 100,
            calories: (nutrition?.calories as number) || 0,
            proteinG: (nutrition?.proteinG as number) || 0,
            carbsG: (nutrition?.carbsG as number) || 0,
            fatG: (nutrition?.fatG as number) || 0,
            foodId: (nutrition?.foodId as string) || undefined,
          };
        }
      );

      setItems(recognized);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [photoFile]);

  useEffect(() => {
    if (photoFile && !loading && items.length === 0 && !error) {
      analyzePhoto();
    }
  }, [photoFile, loading, items.length, error, analyzePhoto]);

  const updatePortion = useCallback((id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newGrams = Math.max(10, item.portionGrams + delta * 10);
        const ratio = newGrams / item.portionGrams;
        return {
          ...item,
          portionGrams: newGrams,
          calories: Math.round(item.calories * ratio),
          proteinG: +(item.proteinG * ratio).toFixed(1),
          carbsG: +(item.carbsG * ratio).toFixed(1),
          fatG: +(item.fatG * ratio).toFixed(1),
        };
      })
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleSave = useCallback(async () => {
    if (items.length === 0) return;
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timeOfDay,
          items: items.map((item) => ({
            foodId: item.foodId,
            foodName: item.foodName,
            portionGrams: item.portionGrams,
            estimatedBy: "ai" as const,
            calories: item.calories,
            proteinG: item.proteinG,
            carbsG: item.carbsG,
            fatG: item.fatG,
          })),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Failed to save meal");
      }

      // Reset form to allow adding another meal
      setPhoto(null);
      setPhotoFile(null);
      setItems([]);
      setTimeOfDay(detectTimeOfDay());
      setError(null);
      setSaved(true);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }, [items, timeOfDay]);

  const totalCalories = items.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = items.reduce((sum, item) => sum + item.proteinG, 0);
  const totalCarbs = items.reduce((sum, item) => sum + item.carbsG, 0);
  const totalFat = items.reduce((sum, item) => sum + item.fatG, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-line bg-card">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Link
            href="/dashboard"
            className="inline-flex size-10 items-center justify-center rounded-md transition hover:bg-[#f4efe6]"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-lg font-semibold">Log meal</h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl px-4 py-5 sm:px-6">
        {/* Success message */}
        {saved && (
          <div className="mb-5 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            Meal saved! Take another photo to log more, or{" "}
            <Link href="/dashboard" className="font-semibold underline">
              go to dashboard
            </Link>
            .
            <button
              type="button"
              onClick={() => setSaved(false)}
              className="ml-2 font-semibold underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Time of day selector */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-muted">
            Meal time
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(["breakfast", "lunch", "dinner", "snack"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTimeOfDay(t)}
                className={`min-h-11 rounded-md border px-3 py-2 text-sm font-semibold capitalize transition ${
                  timeOfDay === t
                    ? "border-primary bg-[#edf8f2] text-primary"
                    : "border-line bg-card text-foreground hover:border-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Camera / upload section */}
        {!photo && (
          <div className="rounded-lg border border-dashed border-line bg-card p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-md bg-[#f4efe6] text-primary">
              <Camera size={26} aria-hidden />
            </div>
            <h2 className="text-lg font-semibold">Take a photo of your meal</h2>
            <p className="mt-2 text-sm text-muted">
              Our AI will identify the food and estimate nutrition info
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <label className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-5 font-semibold text-white transition hover:bg-primary-strong">
                <Camera size={18} aria-hidden />
                Take photo
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleCapture}
                />
              </label>
              <label className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-line bg-card px-5 font-semibold text-foreground transition hover:border-primary">
                <Upload size={18} aria-hidden />
                Upload photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCapture}
                />
              </label>
            </div>
          </div>
        )}

        {/* Photo preview + loading */}
        {photo && (
          <div className="rounded-lg border border-line bg-card shadow-sm">
            <div className="relative">
              <img
                src={photo}
                alt="Meal photo preview"
                className="w-full rounded-t-lg object-cover"
                style={{ maxHeight: 300 }}
              />
              <button
                type="button"
                onClick={handleRetake}
                className="absolute right-2 top-2 inline-flex size-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                aria-label="Retake photo"
              >
                <X size={18} />
              </button>
            </div>

            {loading && (
              <div className="flex flex-col items-center gap-3 p-8">
                <Loader2 size={32} className="animate-spin text-primary" />
                <p className="text-sm font-medium text-muted">
                  Analyzing your meal...
                </p>
              </div>
            )}

            {error && !loading && (
              <div className="p-5">
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
                <button
                  type="button"
                  onClick={handleRetake}
                  className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-md border border-line bg-card px-4 text-sm font-semibold transition hover:border-primary"
                >
                  <Camera size={16} aria-hidden />
                  Try again
                </button>
              </div>
            )}

            {!loading && items.length > 0 && (
              <div className="p-5">
                {/* Totals */}
                <div className="mb-4 flex items-center justify-between rounded-md bg-[#f4efe6] px-4 py-3">
                  <p className="text-sm font-semibold text-primary">
                    {items.length} item{items.length !== 1 ? "s" : ""} detected
                  </p>
                  <p className="text-sm font-semibold">
                    {totalCalories} kcal
                  </p>
                </div>

                {/* Food items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-md border border-line p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{item.foodName}</p>
                          <p className="mt-1 text-xs text-muted">
                            {item.calories} kcal | P: {item.proteinG}g | C:{" "}
                            {item.carbsG}g | F: {item.fatG}g
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted transition hover:bg-red-50 hover:text-red-600"
                          aria-label={`Remove ${item.foodName}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Portion controls */}
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updatePortion(item.id, -1)}
                          className="inline-flex size-9 items-center justify-center rounded-md border border-line bg-[#fbfaf7] transition hover:border-primary"
                          aria-label="Decrease portion by 10g"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-[4rem] text-center text-sm font-semibold">
                          {item.portionGrams}g
                        </span>
                        <button
                          type="button"
                          onClick={() => updatePortion(item.id, 1)}
                          className="inline-flex size-9 items-center justify-center rounded-md border border-line bg-[#fbfaf7] transition hover:border-primary"
                          aria-label="Increase portion by 10g"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Macro summary */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-md bg-[#f4efe6] p-3">
                    <p className="text-xs text-muted">Protein</p>
                    <p className="text-sm font-semibold">{totalProtein.toFixed(1)}g</p>
                  </div>
                  <div className="rounded-md bg-[#f4efe6] p-3">
                    <p className="text-xs text-muted">Carbs</p>
                    <p className="text-sm font-semibold">{totalCarbs.toFixed(1)}g</p>
                  </div>
                  <div className="rounded-md bg-[#f4efe6] p-3">
                    <p className="text-xs text-muted">Fat</p>
                    <p className="text-sm font-semibold">{totalFat.toFixed(1)}g</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 font-semibold text-white transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? (
                      <Loader2 size={18} className="animate-spin" aria-hidden />
                    ) : (
                      <Check size={18} aria-hidden />
                    )}
                    {saving ? "Saving..." : "Save meal"}
                  </button>
                  <button
                    type="button"
                    onClick={handleRetake}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line bg-card px-4 text-sm font-semibold transition hover:border-primary"
                  >
                    <Camera size={16} aria-hidden />
                    Retake photo
                  </button>
                </div>
              </div>
            )}

            {!loading && !error && items.length === 0 && photo && (
              <div className="p-5">
                <p className="text-sm text-muted">
                  No food detected. Try a different angle or add items manually.
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={handleRetake}
                    className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line bg-card px-4 text-sm font-semibold transition hover:border-primary"
                  >
                    <Camera size={16} aria-hidden />
                    Retake
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Manual entry hint (always visible below photo section) */}
        {photo && !loading && items.length > 0 && (
          <div className="mt-5 text-center">
            <p className="text-xs text-muted">
              Adjust portions using the + / - buttons, or remove items you didn&apos;t eat.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
