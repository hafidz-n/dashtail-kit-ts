// @ts-nocheck
"use client";
import React, { useState, useEffect, useTransition } from "react";
import { toast } from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm, Controller } from "react-hook-form";
import Select, { components } from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn, formatDate } from "@/lib/utils";
import { addProjectAction } from "@/action/project-action";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  title: z.string().min(2, { message: "Project name is required." }),
  description: z.string().optional(),
});

const ProjectsSheet = ({ open, onClose }: any) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string>("basic");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    if (step === 1) {
      setStep(2);
      return;
    }

    startTransition(async () => {
      await addProjectAction(data);
      toast.success("Successfully Added");
    });

    onClose();
    reset();
    setStep(1);
    setSelectedOption("basic");
  };

  useEffect(() => {
    if (open) {
      reset({
        title: "",
        description: "",
      });
      setStep(1);
    }
  }, [open, reset]);

  const FormContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
      <div className="space-y-4 mt-6 flex-1 overflow-y-auto md:flex-none md:h-[350px]">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-4 py-4">
                  <div className="text-sm font-medium text-default-600">
                    Thumbnail
                  </div>
                  <Controller
                    name="file"
                    control={control}
                    render={({ field }: any) => (
                      <>
                        <Label
                          htmlFor="projectLogo"
                          className="h-16 w-16 flex justify-center items-center bg-default-100 rounded-lg cursor-pointer hover:bg-default-200 transition-colors border-2 border-dashed border-default-300"
                        >
                          <Plus className="w-6 h-6 text-default-400" />
                        </Label>
                        <Input
                          type="file"
                          id="projectLogo"
                          className="hidden"
                        />
                      </>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="projectName" className="mb-1.5">
                    Project Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="text"
                    {...register("title")}
                    placeholder="Enter project name"
                    className={cn("", {
                      "border-destructive focus:border-destructive":
                        errors.title,
                    })}
                  />
                  {errors.title && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.title.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="description" className="mb-1.5">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter project description"
                    {...register("description")}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 py-2">
                <div>
                  <h3 className="text-sm font-semibold text-default-900 mb-3">Start from template</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Basic App */}
                    <div 
                      className={`cursor-pointer rounded-lg border-2 ${selectedOption === 'basic' ? 'border-primary' : 'border-transparent hover:border-default-300'} transition-all`} 
                      onClick={() => setSelectedOption('basic')}
                    >
                      <div className="aspect-video rounded-t-lg bg-default-100 p-3 flex gap-2 overflow-hidden">
                        <div className="w-1/3 h-full border border-default-300 rounded bg-background p-1 space-y-1 flex-shrink-0">
                          <div className="h-1 w-full bg-default-300 rounded"></div>
                          <div className="flex items-center gap-1"><div className="h-1 w-1 bg-primary rounded-full shrink-0"></div><div className="h-1 w-full bg-default-300 rounded"></div></div>
                          <div className="flex items-center gap-1"><div className="h-1 w-1 bg-primary rounded-full shrink-0"></div><div className="h-1 w-full bg-default-300 rounded"></div></div>
                        </div>
                        <div className="w-2/3 h-full border border-default-300 rounded bg-background p-1 space-y-1 flex-shrink-0">
                           <div className="h-1 w-1/2 bg-default-300 rounded"></div>
                           <div className="flex items-center gap-1"><div className="h-1 w-1 bg-primary rounded-full shrink-0"></div><div className="h-1 w-full bg-default-300 rounded"></div></div>
                           <div className="flex items-center gap-1"><div className="h-1 w-1 bg-primary rounded-full shrink-0"></div><div className="h-1 w-full bg-default-300 rounded"></div></div>
                        </div>
                      </div>
                      <div className="p-3 text-center text-sm font-medium text-default-700">Basic App</div>
                    </div>
                    {/* Dashboard */}
                    <div 
                      className={`cursor-pointer rounded-lg border-2 ${selectedOption === 'dashboard' ? 'border-primary' : 'border-transparent hover:border-default-300'} transition-all`} 
                      onClick={() => setSelectedOption('dashboard')}
                    >
                      <div className="aspect-video rounded-t-lg bg-default-100 p-2 flex flex-col gap-1 overflow-hidden">
                        <div className="h-2 w-full border border-default-300 rounded bg-background flex items-center justify-between px-1 flex-shrink-0">
                           <div className="h-1 w-2 bg-primary rounded"></div>
                           <div className="h-1 w-4 bg-default-300 rounded"></div>
                        </div>
                        <div className="flex gap-1 h-full flex-shrink-0">
                           <div className="w-1/4 h-full border border-default-300 rounded bg-background flex-shrink-0"></div>
                           <div className="w-3/4 h-full flex flex-col gap-1 flex-shrink-0">
                              <div className="h-1/2 w-full border border-default-300 rounded bg-background flex items-end justify-center gap-1 p-1">
                                  <div className="w-1 h-2 bg-primary rounded-t"></div>
                                  <div className="w-1 h-4 bg-primary/70 rounded-t"></div>
                                  <div className="w-1 h-3 bg-primary/40 rounded-t"></div>
                              </div>
                              <div className="h-1/2 w-full flex gap-1">
                                 <div className="w-1/2 h-full border border-default-300 rounded bg-background"></div>
                                 <div className="w-1/2 h-full border border-default-300 rounded bg-background"></div>
                              </div>
                           </div>
                        </div>
                      </div>
                      <div className="p-3 text-center text-sm font-medium text-default-700">Dashboard</div>
                    </div>
                    {/* Blank */}
                    <div 
                      className={`cursor-pointer rounded-lg border-2 ${selectedOption === 'blank' ? 'border-primary' : 'border-transparent hover:border-default-300'} transition-all`} 
                      onClick={() => setSelectedOption('blank')}
                    >
                      <div className="aspect-video rounded-t-lg bg-default-100 p-2 flex gap-2 overflow-hidden">
                        <div className="w-1/3 h-full border border-default-300 rounded bg-background"></div>
                        <div className="w-2/3 h-full border border-default-300 rounded bg-background"></div>
                      </div>
                      <div className="p-3 text-center text-sm font-medium text-default-700">Blank</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-default-900 mb-3">Start with data</h3>
                  <div className="space-y-3">
                    {/* Choose a file */}
                    <div 
                      className={`cursor-pointer rounded-lg border-2 p-4 flex items-center gap-4 ${selectedOption === 'csv' ? 'border-primary bg-primary/5' : 'border-dashed border-default-300 hover:border-default-400'} transition-all`} 
                      onClick={() => setSelectedOption('csv')}
                    >
                      <Icon icon="lucide:file" className="w-6 h-6 flex-shrink-0 text-default-900" />
                      <div>
                        <div className="text-sm font-semibold text-default-900">Choose a file</div>
                        <div className="text-xs text-default-500 mt-0.5">Excel or CSV files.</div>
                      </div>
                    </div>

                    {/* Google Sheets */}
                    <div 
                      className={`cursor-pointer rounded-lg border-2 p-4 flex items-center gap-4 ${selectedOption === 'sheets' ? 'border-primary bg-primary/5' : 'border-dashed border-default-300 hover:border-default-400'} transition-all`} 
                      onClick={() => setSelectedOption('sheets')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-6 h-6 flex-shrink-0">
                        <use xlinkHref="/svg/color/clr-gsheet.svg#icon-import"></use>
                      </svg>
                      <div>
                        <div className="text-sm font-semibold text-default-900">Google Sheets</div>
                        <div className="text-xs text-default-500 mt-0.5">Each tab will become a table</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between gap-4 mt-auto pt-4 border-t sticky bottom-0 bg-background z-10">
            {step === 1 ? (
              <Button
                type="button"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                Cancel
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  setStep(1);
                }}
              >
                Previous
              </Button>
            )}

            {step === 1 ? (
              <Button
                type="submit"
              >
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isPending}>
                {['basic', 'dashboard', 'blank'].includes(selectedOption) ? "Create Project" : "Next"}
              </Button>
            )}
          </div>
        </form>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent size="xl" className="px-6">
          <DialogHeader className="px-0 sticky top-0 bg-background z-10 pb-2">
            <DialogTitle>
              Create a new Project
            </DialogTitle>
          </DialogHeader>
          {FormContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="px-6 rounded-t-xl h-[85vh] max-h-none flex flex-col pb-8">
        <SheetHeader className="px-0 text-left sticky top-0 bg-background z-10 pb-2">
          <SheetTitle>
            Create a new Project
          </SheetTitle>
        </SheetHeader>
        {FormContent}
      </SheetContent>
    </Sheet>
  );
};

export default ProjectsSheet;
