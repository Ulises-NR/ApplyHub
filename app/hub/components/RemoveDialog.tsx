"use client";

import { useState, useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteApplication } from "@/actions/application";

const RemoveDialog = ({ applicationId }: { applicationId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const remove = async () => {
    await deleteApplication(applicationId);

    setIsOpen(false);
  };

  const [error, action, isPending] = useActionState(remove, null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onPointerDown={(e) => e.stopPropagation()}>
          Remove
        </Button>
      </DialogTrigger>
      <DialogContent onPointerDown={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            data.
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <Button variant="destructive" disabled={isPending} type="submit">
            Remove
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveDialog;
