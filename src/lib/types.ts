import React from "react";

export interface FieldAttributes {
  label?: React.ReactNode;
  errorMessage?: React.ReactNode;
  isValidating?: boolean;
  isValidatingMessage?: React.ReactNode;
  description?: React.ReactNode;
  infoPopover?: React.ReactNode;
}
