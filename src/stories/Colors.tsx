import React from "react";

export function Colors() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-background text-foreground grid grid-cols-2 gap-4 p-4 lg:grid-cols-4">
        <div className="bg-primary text-on-primary rounded-lg p-2">primary</div>
        <div className="text-primary-foreground bg-card border-primary-foreground rounded-lg border p-2">
          primary-foreground
        </div>
        <div className="bg-secondary text-on-secondary rounded-lg p-2">
          secondary
        </div>
        <div className="text-secondary-foreground border-secondary-foreground bg-card rounded-lg border p-2">
          secondary-foreground
        </div>
        <div className="bg-muted text-on-muted rounded-lg p-2">muted</div>
        <div className="text-muted-foreground border-muted-foreground bg-card rounded-lg border p-2">
          muted-foreground
        </div>
        <div className="bg-error text-on-error rounded-lg p-2">error</div>
        <div className="text-error-foreground border-error-foreground bg-card rounded-lg border p-2">
          error-foreground
        </div>
        <div className="bg-warning text-on-warning rounded-lg p-2">warning</div>
        <div className="text-warning-foreground border-warning-foreground bg-card rounded-lg border p-2">
          warning-foreground
        </div>
        <div className="bg-success text-on-success rounded-lg p-2">success</div>
        <div className="text-success-foreground border-success-foreground bg-card rounded-lg border p-2">
          success-foreground
        </div>
      </div>
      <div className="bg-background text-foreground grid w-fit grid-cols-2 gap-4 p-4">
        <div>card</div>
        <div className="bg-card h-8 w-8 rounded-lg p-2" />
        <div>border</div>
        <div className="bg-border h-8 w-8 rounded-lg p-2" />
        <div>body</div>
        <div className="bg-body h-8 w-8 rounded-lg p-2" />
        <div>highlight</div>
        <div className="bg-highlight h-8 w-8 rounded-lg p-2" />
        <div>link</div>
        <div className="bg-link h-8 w-8 rounded-lg p-2" />
      </div>
    </div>
  );
}
