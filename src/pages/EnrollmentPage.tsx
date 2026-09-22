import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import {
  courses,
  currentStudent,
  enrollments as initialEnrollments,
} from "@/lib/mock-data";
import type { Enrollment } from "@/lib/types";

export default function EnrollmentPage() {
  // เก็บเฉพาะ enrollment ของ currentStudent คนนี้เท่านั้น (แยกจาก mock-data เดิม)
  const [enrollments, setEnrollments] = useState<Enrollment[]>(
    initialEnrollments.filter((e) => e.studentId === currentStudent.studentId),
  );
  // รายการ courseId ที่ลงทะเบียนแล้ว ไว้เช็คสถานะการ์ด
  const enrolledCourseIds = enrollments.map((e) => e.courseId);

  // วิชาที่ "ยังไม่ลงทะเบียน" → ส่งให้ Select ใน Dialog
  const availableCourses = courses.filter(
    (c) => !enrolledCourseIds.includes(c.courseId),
  );

  function handleRegister(courseId: string, time: string) {
    const now = new Date();
    const [hh, mm] = time.split(":");
    now.setHours(Number(hh), Number(mm), 0, 0);

    setEnrollments((prev) => [
      ...prev,
      {
        studentId: currentStudent.studentId,
        courseId,
        enrolledAt: now.toISOString(),
      },
    ]);
  }

  function handleUnregister(courseId: string) {
    setEnrollments((prev) => prev.filter((e) => e.courseId !== courseId));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
        <RegisterDialog
          availableCourses={availableCourses}
          student={currentStudent}
          onRegister={handleRegister}
        />
      </div>
      <p className="-mt-1 text-sm text-muted-foreground">
        {currentStudent.firstName} {currentStudent.lastName}{" "}
        ({currentStudent.studentId})
      </p>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrollment = enrollments.find(
            (e) => e.courseId === course.courseId,
          );
          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              isEnrolled={!!enrollment}
              enrolledAt={enrollment?.enrolledAt}
              onUnregister={() => handleUnregister(course.courseId)}
            />
          );
        })}
      </div>
    </div>
  );
}
