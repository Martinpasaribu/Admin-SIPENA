import { Suspense } from "react";
import ReportsPage from "./ReportsClient";

export default function ReportsWrapper() {
  return (
    <Suspense fallback={<div className="bg-white"></div>}>
      <ReportsPage />
    </Suspense>
  );
}
