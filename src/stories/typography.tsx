import React from "react";

export function Typography() {
  return (
    <article className="bg-background typography max-w-3xl p-8">
      <header>
        <h1>The Art of Typography</h1>
        <p className="ingress">
          Typography is the art and technique of arranging type to make the
          written word legible, readable, and visually appealing. It involves
          selecting typefaces, point sizes, line lengths, line spacing, and
          letter spacing.
        </p>
        <small>
          Last updated: <time dateTime="2026-03-06">March 6, 2026</time>
        </small>
      </header>

      <section>
        <h2>Key Typography Concepts</h2>

        <p>
          Good typography doesn't just make text look better—it{" "}
          <mark>
            <strong>enhances readability</strong>
          </mark>{" "}
          and guides the reader's eye to the most <em>important</em>{" "}
          information. Let's explore some fundamental concepts.
        </p>

        <h3>Typeface Selection</h3>
        <p>
          When choosing a typeface, consider the context and purpose of your
          design. <dfn>Typeface</dfn> refers to the complete set of characters
          with a unified design. Some popular categories include:
        </p>

        <ul>
          <li>
            <strong>Serif</strong> typefaces (e.g., Times New Roman, Georgia) —
            with small lines at character ends
          </li>
          <li>
            <strong>Sans-serif</strong> typefaces (e.g., Helvetica, Arial) —
            without serifs
          </li>
          <li>Script typefaces for decorative purposes</li>
          <li>
            <strong>Monospace</strong> typefaces for <code>code</code>
          </li>
        </ul>

        <h3>Line Spacing and Leading</h3>

        <p>
          Line spacing, also known as <code>leading</code>, is the vertical
          distance between lines of text. Proper line spacing improves
          readability significantly:
        </p>

        <ol>
          <li>Too tight spacing makes text hard to read</li>
          <li>
            Ideal spacing is typically <var>1.5x</var> the font size
          </li>
          <li>Generous spacing creates an open, airy feel</li>
        </ol>

        <details>
          <summary>Learn more about Leading in Traditional Typography</summary>
          <p>
            The term <del>cast-iron rule</del> <ins>leading</ins> comes from the
            metal strips that printers inserted between lines of type. The
            height of these strips determined the line spacing.
          </p>
        </details>

        <blockquote>
          <p>
            Typography is to literature as musical performance is to
            composition; as interpretation.
          </p>
          <footer>
            — <address>Matthew Carter, Legendary Typographer</address>
          </footer>
        </blockquote>
      </section>

      <section>
        <h2>Best Practices</h2>

        <p>Here are some guidelines for effective typography:</p>

        <figure>
          <pre>
            <code>{`/* Limit to 2-3 typefaces maximum */
body {
  font-family: 'Georgia', serif;
  line-height: 1.6;
  font-size: 16px;
}`}</code>
          </pre>
          <figcaption>Example CSS for readable body text</figcaption>
        </figure>

        <p>
          Remember that <strong>contrast</strong> matters too. Ensure sufficient
          contrast between text and background color for accessibility. Learn
          more about <a href="#typography-guidelines">typography guidelines</a>{" "}
          in our design system.
        </p>

        <p>
          To apply this in <abbr title="HyperText Markup Language">HTML</abbr>,
          press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy the CSS code, and the
          output would be <samp>font-size: 16px</samp>.
        </p>
      </section>

      <section>
        <h3>Common Typography Mistakes</h3>

        <ul>
          <li>Using too many different fonts</li>
          <li>Ignoring line spacing and letter spacing</li>
          <li>Poor color contrast</li>
          <li>Inconsistent sizing hierarchy</li>
        </ul>

        <p>
          By understanding and applying these principles, you'll create
          beautiful, readable, and professional-looking text that enhances the
          overall user experience.
        </p>
      </section>

      <footer>
        <nav>
          <h3>Related Resources</h3>
          <ul>
            <li>
              <a href="#font-pairing">Font Pairing Guide</a>
            </li>
            <li>
              <a href="#accessibility">Typography & Accessibility</a>
            </li>
            <li>
              <a href="#tools">Typography Tools</a>
            </li>
          </ul>
        </nav>
        <p>
          <small>
            © <time dateTime="2026">2026</time> Design System. Written by the
            Typography Team. This article is licensed under{" "}
            <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
            .
          </small>
        </p>
      </footer>
    </article>
  );
}
