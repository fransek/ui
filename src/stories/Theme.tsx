import React from "react";

export function Theme() {
  return (
    <div className="bg-background text-foreground grid grid-cols-2 gap-4 p-4 lg:grid-cols-4">
      <div className="bg-primary text-on-primary rounded-lg p-2">primary</div>
      <div className="text-primary-foreground bg-card rounded-lg border p-2">
        primary-foreground
      </div>
      <div className="bg-secondary text-on-secondary rounded-lg p-2">
        secondary
      </div>
      <div className="text-secondary-foreground bg-card rounded-lg border p-2">
        secondary-foreground
      </div>
      <div className="bg-muted text-on-muted rounded-lg p-2">muted</div>
      <div className="text-muted-foreground bg-card rounded-lg border p-2">
        muted-foreground
      </div>
      <div className="bg-error text-on-error rounded-lg p-2">error</div>
      <div className="text-error-foreground bg-card rounded-lg border p-2">
        error-foreground
      </div>
      <div className="bg-warning text-on-warning rounded-lg p-2">warning</div>
      <div className="text-warning-foreground bg-card rounded-lg border p-2">
        warning-foreground
      </div>
      <div className="bg-success text-on-success rounded-lg p-2">success</div>
      <div className="text-success-foreground bg-card rounded-lg border p-2">
        success-foreground
      </div>
      <div className="text-foreground bg-card rounded-lg border p-2">card</div>
      <div className="text-link-foreground bg-card rounded-lg border p-2">
        link-foreground
      </div>
    </div>
  );
}
