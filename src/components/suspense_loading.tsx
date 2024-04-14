import React from "react";
import { LoadingSpinner } from "./loading_spinner";

export const SupenseLoading = () => {
  return (
    <div className="py-4 flex items-center justify-center mx-auto">
      <LoadingSpinner className="w-8 h-8" />
    </div>
  );
};
