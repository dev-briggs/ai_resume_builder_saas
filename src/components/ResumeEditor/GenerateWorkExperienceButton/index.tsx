import { generateWorkExperience } from "@/app/(main)/editor/forms/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import {
  generateWorkExperienceSchema,
  GenerateWorkExperienceSchema,
  WorkExperienceItem,
} from "@/schema/work-experience";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export type GenerateWorkExperienceButtonProps = {
  onWorkExperienceGenerated: (workExperience: WorkExperienceItem) => void;
};

export default function GenerateWorkExperienceButton({
  onWorkExperienceGenerated,
}: GenerateWorkExperienceButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={
          // TODO: block for non-premium users
          () => setShowDialog(true)
        }
      >
        <WandSparklesIcon className="size-4" />
        Smart fill (AI)
      </Button>
      <InputDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onWorkExperienceGenerated={(workExperience) => {
          onWorkExperienceGenerated(workExperience);
          setShowDialog(false);
        }}
      />
    </>
  );
}

type InputDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkExperienceGenerated: (workExperience: WorkExperienceItem) => void;
};
function InputDialog({
  open,
  onOpenChange,
  onWorkExperienceGenerated,
}: InputDialogProps) {
  const form = useForm<GenerateWorkExperienceSchema>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(data: GenerateWorkExperienceSchema) {
    try {
      const response = await generateWorkExperience(data);
      onWorkExperienceGenerated(response);
    } catch (e) {
      console.log("Error generating work experience:", e);
      toast.error(
        e instanceof Error
          ? e.message
          : "Failed to generate work experience. Please try again later.",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Work Experience</DialogTitle>
          <DialogDescription>
            Describe this work experience and the AI will generate an optimized
            entry for you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={`e.g. "software engineer at XYZ Corp from nov 2019 to dec 2020, responsible for developing web applications using React and Node.js. Led a team of 5 developers to deliver projects on time and within budget. Improved application performance by 30% through code optimization."`}
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Generate
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
