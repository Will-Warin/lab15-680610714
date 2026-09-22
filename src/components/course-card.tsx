import { Trash2 } from "lucide-react";
import type { Course, Student } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CourseCardProps = {
  course: Course;
  student: Student;
  isEnrolled: boolean;
  enrolledAt?: string;
  onUnregister: () => void;
};

export function CourseCard({
  course,
  student,
  isEnrolled,
  enrolledAt,
  onUnregister,
}: CourseCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <div>
          <CardTitle className="text-base">{course.courseTitle}</CardTitle>
          <CardDescription>
            รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
          </CardDescription>
        </div>

        <Badge
          className={
            isEnrolled
              ? "bg-amber-500 text-amber-950 dark:bg-purple-500 dark:text-purple-950"
              : "bg-purple-500 text-purple-950 dark:bg-amber-500 dark:text-amber-950"
          }
        >
          {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
        </Badge>
      </CardHeader>

      {isEnrolled && (
        <CardContent className="flex items-end justify-between">
          <div className="text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>
              ลงทะเบียนเมื่อ:{" "}
              {enrolledAt &&
                new Date(enrolledAt).toLocaleString("th-TH", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
            </p>
          </div>

          <Button variant="ghost" size="icon" onClick={onUnregister}>
            <Trash2 className="text-destructive" />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
