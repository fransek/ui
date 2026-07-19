import React from "react";

export function Colors() {
  return (
    <div className="bg-background flex flex-col gap-6">
      <div className="typography max-w-3xl">
        <h2 className="heading-5">Surface Colors</h2>
        <p className="body-2">
          These colors come in sets of three, one for the background (
          <code>bg-*</code>), one for the foreground (<code>text-on-*</code>),
          and one with higher contrast for stand-alone text (
          <code>text-*-fg</code>).
        </p>
      </div>
      <div className="text-foreground grid grid-cols-2 gap-4 font-semibold lg:grid-cols-4">
        <div className="bg-primary text-on-primary rounded-lg p-2">primary</div>
        <div className="text-primary-fg border-primary-fg bg-card rounded-lg border p-2">
          primary-fg
        </div>
        <div className="bg-secondary text-on-secondary rounded-lg p-2">
          secondary
        </div>
        <div className="text-secondary-fg border-secondary-fg bg-card rounded-lg border p-2">
          secondary-fg
        </div>
        <div className="bg-muted text-on-muted rounded-lg p-2">muted</div>
        <div className="text-muted-fg border-muted-fg bg-card rounded-lg border p-2">
          muted-fg
        </div>
        <div className="bg-danger text-on-danger rounded-lg p-2">danger</div>
        <div className="text-danger-fg border-danger-fg bg-card rounded-lg border p-2">
          danger-fg
        </div>
        <div className="bg-warning text-on-warning rounded-lg p-2">warning</div>
        <div className="text-warning-fg border-warning-fg bg-card rounded-lg border p-2">
          warning-fg
        </div>
        <div className="bg-success text-on-success rounded-lg p-2">success</div>
        <div className="text-success-fg border-success-fg bg-card rounded-lg border p-2">
          success-fg
        </div>
      </div>
      <div className="typography max-w-3xl">
        <h2 className="heading-5">Other Colors</h2>
        <p className="body-2">
          Stand-alone colors that are used for various UI elements.
        </p>
      </div>
      <div className="text-foreground grid grid-cols-2 gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-field h-8 w-8 rounded-lg p-2" />
          <div>field</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-card h-8 w-8 rounded-lg p-2" />
          <div>card</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-border h-8 w-8 rounded-lg p-2" />
          <div>border</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-body h-8 w-8 rounded-lg p-2" />
          <div>body</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-contrast h-8 w-8 rounded-lg p-2" />
          <div>contrast</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-highlight h-8 w-8 rounded-lg p-2" />
          <div>highlight</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-link h-8 w-8 rounded-lg p-2" />
          <div>link</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-chart-1 h-8 w-8 rounded-lg p-2" />
          <div>chart-1</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-chart-2 h-8 w-8 rounded-lg p-2" />
          <div>chart-2</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-chart-3 h-8 w-8 rounded-lg p-2" />
          <div>chart-3</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-chart-4 h-8 w-8 rounded-lg p-2" />
          <div>chart-4</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-chart-5 h-8 w-8 rounded-lg p-2" />
          <div>chart-5</div>
        </div>
      </div>
    </div>
  );
}
