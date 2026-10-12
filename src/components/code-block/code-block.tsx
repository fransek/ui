import * as BaseUI from "@base-ui/react/use-render";
import { Check, Copy } from "lucide-react";
import React from "react";
import type { BundledLanguage, BundledTheme, ThemedToken } from "shiki";
import { cn, mergeProps, tw } from "../../lib/utils";
import { Button, ButtonProps } from "../button";

// `string & {}` keeps autocompletion for the bundled names.
export type CodeBlockLanguage = BundledLanguage | "text" | (string & {});

export interface CodeBlockThemes {
  light: BundledTheme;
  dark: BundledTheme;
}

const defaultThemes: CodeBlockThemes = {
  light: "github-light",
  dark: "github-dark",
};

interface CodeBlockContextValue {
  code: string;
  language: CodeBlockLanguage;
  themes: CodeBlockThemes;
}

const CodeBlockContext = React.createContext<CodeBlockContextValue | null>(
  null,
);

export function useCodeBlockContext() {
  const context = React.useContext(CodeBlockContext);
  if (!context) {
    throw new Error("useCodeBlockContext must be used within a <CodeBlock />");
  }
  return context;
}

/**
 * Tokenizes `code` with shiki. Returns `null` until the grammar and themes
 * have loaded (and when the language is unknown), so callers can render the
 * plain source in the meantime.
 */
export function useHighlightedTokens(
  code: string,
  language: CodeBlockLanguage,
  themes: CodeBlockThemes = defaultThemes,
) {
  const [result, setResult] = React.useState<{
    key: string;
    tokens: ThemedToken[][];
  } | null>(null);
  const key = JSON.stringify([code, language, themes.light, themes.dark]);

  React.useEffect(() => {
    let cancelled = false;

    import("shiki")
      .then(({ codeToTokens }) =>
        codeToTokens(code, {
          lang: language as BundledLanguage,
          themes: { light: themes.light, dark: themes.dark },
          defaultColor: false,
        }),
      )
      .then(({ tokens }) => {
        if (!cancelled) setResult({ key, tokens });
      })
      .catch(() => {
        if (!cancelled) setResult(null);
      });

    return () => {
      cancelled = true;
    };
    // `key` captures every input; `themes` is often an inline object, so it
    // is not a dependency itself.
  }, [key]);

  return result?.key === key ? result.tokens : null;
}

export interface CodeBlockProps extends BaseUI.useRender.ComponentProps<"div"> {
  /** The source code to display (and copy). */
  code: string;
  /** Any language bundled with shiki. Defaults to `"text"`. */
  language?: CodeBlockLanguage;
  /** Shiki themes used in light and dark mode. */
  themes?: CodeBlockThemes;
}

export function CodeBlock(props: CodeBlockProps) {
  const {
    render,
    code,
    language = "text",
    themes = defaultThemes,
    ...restProps
  } = props;

  const element = BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, {
      className: tw(
        "bg-card flex flex-col overflow-hidden rounded-lg border shadow-sm",
      ),
    }),
  });

  return (
    <CodeBlockContext.Provider value={{ code, language, themes }}>
      {element}
    </CodeBlockContext.Provider>
  );
}

export type CodeBlockHeaderProps = BaseUI.useRender.ComponentProps<"div">;

export function CodeBlockHeader(props: CodeBlockHeaderProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, {
      className: tw("flex min-h-10 items-center gap-2 border-b py-1 pr-1 pl-4"),
    }),
  });
}

export type CodeBlockTitleProps = BaseUI.useRender.ComponentProps<"span">;

export function CodeBlockTitle(props: CodeBlockTitleProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "span",
    render,
    props: mergeProps(restProps, {
      className: tw("body-sm text-muted-fg flex-1 truncate font-mono"),
    }),
  });
}

export type CodeBlockActionsProps = BaseUI.useRender.ComponentProps<"div">;

export function CodeBlockActions(props: CodeBlockActionsProps) {
  const { render, ...restProps } = props;

  return BaseUI.useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(restProps, {
      className: tw("ml-auto flex items-center gap-1"),
    }),
  });
}

export interface CodeBlockContentProps extends React.ComponentProps<"pre"> {
  /** Render a line number gutter. */
  showLineNumbers?: boolean;
  /** 1-based line numbers to emphasize. */
  highlightLines?: number[];
}

export function CodeBlockContent(props: CodeBlockContentProps) {
  const { showLineNumbers, highlightLines, ...restProps } = props;
  const { code, language, themes } = useCodeBlockContext();
  const tokens = useHighlightedTokens(code, language, themes);

  const lines: ThemedToken[][] =
    tokens ??
    code
      .split("\n")
      .map((content, offset) => [{ content, offset, color: undefined }]);

  return (
    <pre
      data-language={language}
      data-highlighted={tokens ? "" : undefined}
      {...mergeProps(restProps, {
        className: tw(
          "text-foreground overflow-x-auto py-3 font-mono text-sm leading-6",
        ),
      })}
    >
      <code className="grid min-w-max">
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const highlighted = highlightLines?.includes(lineNumber);

          return (
            <span
              key={index}
              data-line={lineNumber}
              data-highlighted-line={highlighted ? "" : undefined}
              className={cn(
                "flex px-4",
                highlighted &&
                  "bg-hover shadow-[inset_2px_0_0_var(--color-primary)]",
              )}
            >
              {showLineNumbers && (
                <span
                  aria-hidden
                  className="text-muted-fg mr-4 inline-block w-[2ch] shrink-0 text-right select-none"
                >
                  {lineNumber}
                </span>
              )}
              <span>
                {line.map((token, tokenIndex) => (
                  <span
                    key={tokenIndex}
                    style={token.htmlStyle as React.CSSProperties}
                    className={tokenStyles}
                  >
                    {token.content}
                  </span>
                ))}
                {/* Keeps empty lines from collapsing. */}
                {line.every((token) => token.content === "") && "\n"}
              </span>
            </span>
          );
        })}
      </code>
    </pre>
  );
}

const tokenStyles = tw(
  "[font-weight:var(--shiki-light-font-weight)] text-(--shiki-light) [font-style:var(--shiki-light-font-style)] [text-decoration:var(--shiki-light-text-decoration)] dark:[font-weight:var(--shiki-dark-font-weight)] dark:text-(--shiki-dark) dark:[font-style:var(--shiki-dark-font-style)] dark:[text-decoration:var(--shiki-dark-text-decoration)]",
);

export interface CodeBlockCopyButtonProps extends ButtonProps {
  /** How long the "copied" state lasts, in milliseconds. */
  timeout?: number;
  /** Called after the code has been written to the clipboard. */
  onCopied?: (code: string) => void;
}

export function CodeBlockCopyButton(props: CodeBlockCopyButtonProps) {
  const { timeout = 2000, onCopied, onClick, children, ...restProps } = props;
  const { code } = useCodeBlockContext();
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), timeout);
    return () => clearTimeout(id);
  }, [copied, timeout]);

  return (
    <Button
      size="icon"
      variant="ghost"
      aria-label={copied ? "Copied" : "Copy code"}
      data-copied={copied ? "" : undefined}
      onClick={(event) => {
        onClick?.(event);
        navigator.clipboard.writeText(code).then(() => {
          setCopied(true);
          onCopied?.(code);
        });
      }}
      {...mergeProps(restProps, { className: tw("text-muted-fg") })}
    >
      {children ??
        (copied ? <Check className="size-4" /> : <Copy className="size-4" />)}
    </Button>
  );
}

CodeBlock.Header = CodeBlockHeader;
CodeBlock.Title = CodeBlockTitle;
CodeBlock.Actions = CodeBlockActions;
CodeBlock.Content = CodeBlockContent;
CodeBlock.CopyButton = CodeBlockCopyButton;
