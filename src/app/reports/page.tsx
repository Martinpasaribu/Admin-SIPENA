import { Suspense } from "react";
import ReportsPage from "./ReportsClient";

export default function ReportsWrapper() {
  return (
    <Suspense fallback={<div>Loading reports...</div>}>
      <ReportsPage />
    </Suspense>
  );
}
