"use client";

import { useState } from "react";
import { useApplications } from "@/hooks/use-applications";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { Droppable } from "./components/Droppable";
import { Draggable } from "./components/Draggable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateApplication } from "@/actions/application";
import Link from "next/link";

const Hub = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { containers, setContainers } = useApplications();
  const columns = ["Applied", "Interviewee", "Offer", "Denied"];

  async function handleDragEnd(event) {
    const { over, active } = event;

    if (!over) return;

    if (over.id === active.data.current.status) return;

    setContainers((prevState) => {
      const updatedContainers = prevState.map((container) => ({
        ...container,
        items: container.items.filter((item) => item.id !== active.id),
      }));

      const targetIndex = updatedContainers.findIndex((c) => c.id === over.id);
      if (targetIndex !== -1) {
        updatedContainers[targetIndex].items.push({
          ...active.data.current,
          status: over.id,
        });
      }

      setIsDragging(false);

      return updatedContainers;
    });

    await updateApplication({
      ...active.data.current,
      status: over.id,
    });
  }

  function handleDragStart() {
    setIsDragging(true);
  }

  return (
    <>
      <div className="container mx-auto p-4 space-y-8 my-8">
        <div className="flex justify-end">
          <Button asChild>
            <Link href="/hub/create">Create</Link>
          </Button>
        </div>

        <div className="flex justify-between space-x-12 overflow-x-auto pb-4">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            {columns.map((column, idx) => (
              <div key={idx}>
                <h2 className="font-semibold mb-4">{column}</h2>
                <ScrollArea
                  className="bg-neutral-100 p-4 rounded-lg h-[500px]"
                  style={{ overflow: isDragging ? "visible" : "hidden" }}
                >
                  <Droppable key={containers[idx].id} id={containers[idx].id}>
                    {containers[idx].items.map((application) => (
                      <Draggable
                        key={application.id}
                        id={application.id}
                        data={application}
                      />
                    ))}
                  </Droppable>
                </ScrollArea>
              </div>
            ))}
          </DndContext>
        </div>
      </div>
    </>
  );
};

export default Hub;
