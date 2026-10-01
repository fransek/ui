import React from "react";

export function Colors() {
  return (
    <div className="bg-background flex flex-col gap-6">
      <div className="typography max-w-3xl">
        <h2 className="heading-sm">Surface Colors</h2>
        <p className="body-sm">
          These colors come in pairs, one for the background (<code>bg-*</code>)
          and one for the foreground (<code>text-on-*</code>).
        </p>
      </div>
      <div className="text-foreground grid grid-cols-2 gap-4 font-semibold lg:grid-cols-4">
        <div className="bg-primary text-on-primary rounded-lg p-2">primary</div>
        <div className="bg-secondary text-on-secondary rounded-lg p-2">
          secondary
        </div>
        <div className="bg-tertiary text-on-tertiary rounded-lg p-2">
          tertiary
        </div>
        <div className="bg-muted text-on-muted rounded-lg p-2">muted</div>
        <div className="bg-success text-on-success rounded-lg p-2">success</div>
        <div className="bg-success-subtle text-on-success-subtle rounded-lg p-2">
          success-subtle
        </div>
        <div className="bg-warning text-on-warning rounded-lg p-2">warning</div>
        <div className="bg-warning-subtle text-on-warning-subtle rounded-lg p-2">
          warning-subtle
        </div>
        <div className="bg-danger text-on-danger rounded-lg p-2">danger</div>
        <div className="bg-danger-subtle text-on-danger-subtle rounded-lg p-2">
          danger-subtle
        </div>
      </div>
      <div className="typography max-w-3xl">
        <h2 className="heading-sm">Foreground Colors</h2>
        <p className="body-sm">
          These colors are used for text and other elements that appear on top
          of surfaces.
        </p>
      </div>
      <div className="heading-xs">
        <div className="text-primary-fg">primary-fg</div>
        <div className="text-secondary-fg">secondary-fg</div>
        <div className="text-tertiary-fg">tertiary-fg</div>
        <div className="text-muted-fg">muted-fg</div>
        <div className="text-success-fg">success-fg</div>
        <div className="text-success-subtle-fg">success-subtle-fg</div>
        <div className="text-warning-fg">warning-fg</div>
        <div className="text-warning-subtle-fg">warning-subtle-fg</div>
        <div className="text-danger-fg">danger-fg</div>
        <div className="text-danger-subtle-fg">danger-subtle-fg</div>
        <div className="text-foreground">foreground</div>
        <div className="text-body">body</div>
        <div className="text-link">link</div>
      </div>
      <div className="typography max-w-3xl">
        <h2 className="heading-sm">Other Colors</h2>
        <p className="body-sm">
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
          <div className="bg-contrast h-8 w-8 rounded-lg p-2" />
          <div>contrast</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-highlight h-8 w-8 rounded-lg p-2" />
          <div>highlight</div>
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
