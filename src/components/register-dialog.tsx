import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Course, Student } from "@/lib/types";

type RegisterDialogProps = {
  availableCourses: Course[];
  student: Student;
  onRegister: (courseId: string, time: string) => void;
};

function getCurrentTime() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function RegisterDialog({
  availableCourses,
  student,
  onRegister,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [time, setTime] = useState(getCurrentTime());

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onRegister(courseId, time);
    setCourseId("");
    setTime(getCurrentTime());
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger> 
        <Button><svg xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        className="lucide lucide-user-plus preview-icon"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg> 
        ลงทะเบียน</Button> {/*ไอ่ยาวๆคือรูปไอคอน */}
      </DialogTrigger>


      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>กรอกข้อมูลเพื่อลงทะเบียน</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="courseId">วิชา</Label>
            <Select value={courseId} onValueChange={(value) => setCourseId(value ?? "")}>
              <SelectTrigger id="courseId" className="w-full h-auto py-2 text-left [&>span]:whitespace-normal [&>span]:break-words [&>span]:line-clamp-none">
                <SelectValue placeholder="เลือกวิชา" />
              </SelectTrigger>
              <SelectContent>
                {availableCourses.map((course) => (
                  <SelectItem 
                  key={course.courseId} 
                  value={course.courseId}
                  className="h-auto py-2 items-start">
                    <span className="whitespace-normal break-words text-left block w-full pr-4">
                      {course.courseId} - {course.courseTitle}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">เลือกเวลา</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ นศ.</Label>
            <Input
              id="fullName"
              value={`${student.firstName} ${student.lastName}`}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>
            <Input id="program" value={student.program} readOnly />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!courseId}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
