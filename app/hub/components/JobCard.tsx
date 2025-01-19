import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar } from "lucide-react";
import RemoveDialog from "./RemoveDialog";

const statusColors = {
  "dnd-applied": "border-blue-500",
  "dnd-interviewee": "border-yellow-500",
  "dnd-denied": "border-red-500",
  "dnd-offer": "border-green-500",
};

export const JobApplicationCard = ({ application }) => {
  return (
    <Card
      className={`border-l-4 ${
        statusColors[application.status]
      } hover:shadow-md transition-shadow duration-200`}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-sm">{application.company}</h3>
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <Briefcase className="w-3 h-3 mr-1" />
              <span>{application.position}</span>
            </div>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{application.date.toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex mt-4 justify-end">
          <RemoveDialog applicationId={application.id} />
        </div>
      </CardContent>
    </Card>
  );
};
