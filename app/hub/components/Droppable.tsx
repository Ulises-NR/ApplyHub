import { useDroppable } from "@dnd-kit/core";

export const Droppable = ({ children, id }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div
      className="flex flex-col space-y-4 min-w-[250px]"
      ref={setNodeRef}
      style={style}
    >
      {children}
    </div>
  );
};
