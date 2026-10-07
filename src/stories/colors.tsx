import React from "react";

export function Colors() {
  return (
    <div className="bg-background flex flex-col gap-6">
      <SurfaceColors />
      <ForegroundColors />
      <OtherColors />
    </div>
  );
}

function SurfaceColors() {
  return (
    <div className="flex flex-col gap-6">
      <div className="typography max-w-3xl">
        <h2 className="heading-sm">Surface Colors</h2>
        <p className="body-sm">
          These colors come in pairs, one for the background (<code>bg-*</code>)
          and one for the foreground (<code>text-on-*</code>). Each pair is also
          available as a single utility that sets both, e.g.{" "}
          <code>primary</code> or <code>danger-subtle</code>.
        </p>
      </div>
      <div className="text-foreground grid grid-cols-2 gap-4 font-semibold lg:grid-cols-4">
        <div className="bg-default text-on-default hover:bg-default-hover active:bg-default-active col-span-2 rounded-lg border p-2 transition-colors lg:col-span-4">
          default
        </div>
        <div className="primary hover:bg-primary-hover rounded-lg p-2 transition-colors">
          primary
        </div>
        <div className="secondary hover:bg-secondary-hover rounded-lg p-2 transition-colors">
          secondary
        </div>
        <div className="tertiary hover:bg-tertiary-hover rounded-lg p-2 transition-colors">
          tertiary
        </div>
        <div className="muted hover:bg-muted-hover rounded-lg p-2 transition-colors">
          muted
        </div>
        <div className="success hover:bg-success-hover rounded-lg p-2 transition-colors">
          success
        </div>
        <div className="success-subtle hover:bg-success-subtle-hover rounded-lg p-2 transition-colors">
          success-subtle
        </div>
        <div className="warning hover:bg-warning-hover rounded-lg p-2 transition-colors">
          warning
        </div>
        <div className="warning-subtle hover:bg-warning-subtle-hover rounded-lg p-2 transition-colors">
          warning-subtle
        </div>
        <div className="danger hover:bg-danger-hover rounded-lg p-2 transition-colors">
          danger
        </div>
        <div className="danger-subtle hover:bg-danger-subtle-hover rounded-lg p-2 transition-colors">
          danger-subtle
        </div>
        <div className="highlight rounded-lg p-2 transition-colors">
          highlight
        </div>
        <div className="inverse rounded-lg p-2 transition-colors">inverse</div>
      </div>
    </div>
  );
}

function ForegroundColors() {
  return (
    <div className="flex flex-col gap-6">
      <div className="typography max-w-3xl">
        <h2 className="heading-sm">Foreground Colors</h2>
        <p className="body-sm">
          These colors are used for text and other elements that appear on top
          of surfaces.
        </p>
      </div>
      <div className="heading-xs grid grid-cols-2 gap-4 lg:grid-cols-4">
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
    </div>
  );
}

function OtherColors() {
  return (
    <div className="bg-background flex flex-col gap-6">
      <div className="typography max-w-3xl">
        <h2 className="heading-sm">Other Colors</h2>
        <p className="body-sm">
          Stand-alone colors that are used for various UI elements.
        </p>
      </div>
      <div className="text-foreground grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="flex items-center gap-4">
          <div className="bg-background size-8 rounded-lg border p-2" />
          <div>background</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-foreground size-8 rounded-lg p-2" />
          <div>foreground</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-card size-8 rounded-lg border p-2" />
          <div>card</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-track size-8 rounded-lg p-2" />
          <div>track</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-hover size-8 rounded-lg p-2" />
          <div>hover</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-active size-8 rounded-lg p-2" />
          <div>active</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-field size-8 rounded-lg border p-2" />
          <div>field</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-border size-8 rounded-lg p-2" />
          <div>border</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-contrast size-8 rounded-lg p-2" />
          <div>contrast</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-contrast-inverse size-8 rounded-lg border p-2" />
          <div>contrast-inverse</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-focus size-8 rounded-lg p-2" />
          <div>focus</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-chart-1 size-8 rounded-lg p-2" />
          <div>chart-1</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-chart-2 size-8 rounded-lg p-2" />
          <div>chart-2</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-chart-3 size-8 rounded-lg p-2" />
          <div>chart-3</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-chart-4 size-8 rounded-lg p-2" />
          <div>chart-4</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-chart-5 size-8 rounded-lg p-2" />
          <div>chart-5</div>
        </div>
      </div>
    </div>
  );
}
