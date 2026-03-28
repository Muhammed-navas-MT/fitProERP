import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Scale, Ruler, Activity, FileText } from "lucide-react";
import { getBMICategory, ProgressType } from "@/types/member/progressTypes";

interface CreateProgressModalProps {
  onSubmit: (data: ProgressType) => void;
}

export function CreateProgressModal({ onSubmit }: CreateProgressModalProps) {
  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [muscleMass, setMuscleMass] = useState("");
  const [note, setNote] = useState("");
  const [unit, setUnit] = useState<"kg" | "lb">("kg");

  const calculatedBMI =
    weight && heightCm
      ? (() => {
          const w = unit === "lb" ? parseFloat(weight) * 0.453592 : parseFloat(weight);
          const h = parseFloat(heightCm) / 100;
          return h > 0 ? parseFloat((w / (h * h)).toFixed(1)) : 0;
        })()
      : 0;

  const bmiCategory = calculatedBMI > 0 ? getBMICategory(calculatedBMI) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || !heightCm) return;

    const entry: ProgressType = {
      memberId: "current-user",
      weight: { value: parseFloat(weight), unit },
      bmi: calculatedBMI,
      bmiCategory: bmiCategory!,
      bodyFatPercentage: bodyFat ? parseFloat(bodyFat) : undefined,
      muscleMass: muscleMass ? { value: parseFloat(muscleMass), unit } : undefined,
      note: note || undefined,
      progressDate: new Date(),
    };

    onSubmit(entry);
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setWeight("");
    setHeightCm("");
    setBodyFat("");
    setMuscleMass("");
    setNote("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-orange text-primary-foreground font-semibold gap-2 rounded-xl px-6 hover:opacity-90 transition-opacity">
          <Plus size={18} />
          New Report
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Create BMI Report
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Unit Toggle */}
          <div className="flex gap-2">
            {(["kg", "lb"] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  unit === u
                    ? "gradient-orange text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {u.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Weight & Height */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground flex items-center gap-2">
                <Scale size={14} /> Weight ({unit})
              </Label>
              <Input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={`e.g. ${unit === "kg" ? "75" : "165"}`}
                className="bg-secondary border-border text-foreground"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground flex items-center gap-2">
                <Ruler size={14} /> Height (cm)
              </Label>
              <Input
                type="number"
                step="0.1"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                placeholder="e.g. 175"
                className="bg-secondary border-border text-foreground"
                required
              />
            </div>
          </div>

          {/* Live BMI Preview */}
          {calculatedBMI > 0 && (
            <div className="glass-card p-4 flex items-center justify-between animate-fade-scale">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Calculated BMI</p>
                <p className="text-3xl font-black text-foreground">{calculatedBMI}</p>
              </div>
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                  bmiCategory === "Normal"
                    ? "bg-success/10 border-success/30 text-success"
                    : bmiCategory === "Overweight"
                    ? "bg-warning/10 border-warning/30 text-warning"
                    : bmiCategory === "Obese"
                    ? "bg-destructive/10 border-destructive/30 text-destructive"
                    : "bg-info/10 border-info/30 text-info"
                }`}
              >
                {bmiCategory}
              </span>
            </div>
          )}

          {/* Optional fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground flex items-center gap-2">
                <Activity size={14} /> Body Fat %
              </Label>
              <Input
                type="number"
                step="0.1"
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
                placeholder="Optional"
                className="bg-secondary border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground flex items-center gap-2">
                <Dumbbell size={14} /> Muscle Mass ({unit})
              </Label>
              <Input
                type="number"
                step="0.1"
                value={muscleMass}
                onChange={(e) => setMuscleMass(e.target.value)}
                placeholder="Optional"
                className="bg-secondary border-border text-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground flex items-center gap-2">
              <FileText size={14} /> Note
            </Label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any additional notes..."
              className="bg-secondary border-border text-foreground resize-none"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={!weight || !heightCm}
            className="w-full gradient-orange text-primary-foreground font-semibold rounded-xl h-12 hover:opacity-90 transition-opacity"
          >
            Save Report
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Dumbbell(props: { size: number }) {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6.5 6.5 11 11" /><path d="m21 21-1-1" /><path d="m3 3 1 1" /><path d="m18 22 4-4" /><path d="m2 6 4-4" /><path d="m3 10 7-7" /><path d="m14 21 7-7" />
    </svg>
  );
}
