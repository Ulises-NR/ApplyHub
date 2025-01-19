import { useEffect, useRef, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { JobApplicationCard } from "./JobCard";

export const Draggable = ({ id, data }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data,
    });

  const originalRef = useRef(null);
  const [originalSize, setOriginalSize] = useState({ width: 0 });

  useEffect(() => {
    if (originalRef.current) {
      setOriginalSize({
        width: originalRef.current.offsetWidth,
      });
    }
  }, []);

  const style = {
    ...(transform
      ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : {}),
    position: isDragging ? "absolute" : "relative",
    width: isDragging ? `${originalSize.width}px` : "100%",
    zIndex: 10,
  };

  return (
    <div
      className="w-full rounded"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={(e) => e.stopPropagation()}
    >
      <div ref={originalRef}>
        <JobApplicationCard application={data} />
      </div>
    </div>
  );
};
