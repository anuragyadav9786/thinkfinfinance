"use client";

import { useEffect } from "react";

export default function TrackGoalView({ slug }: { slug: string }) {
  useEffect(() => {
    sessionStorage.setItem("lastGoal", slug);
  }, [slug]);

  return null;
}
