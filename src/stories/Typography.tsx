import React from "react";

export function Typography() {
  return (
    <div className="card bg-background typography max-w-3xl p-8">
      <h2 className="heading-1">Typography</h2>
      <p className="ingress">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quia
        atque aliquam. Tempore ipsum sint nobis porro provident quos
        voluptatibus?
      </p>
      <p>
        <strong>Lorem ipsum</strong> dolor sit amet consectetur, adipisicing
        elit. Error ipsam doloremque delectus harum nobis, porro earum illum
        assumenda sapiente maiores asperiores dolore sint labore quae mollitia
        voluptate quas consectetur culpa alias! Explicabo, a? Repellendus
        quibusdam cumque rerum hic voluptate, assumenda aut maxime iure unde,
        quas saepe culpa repudiandae a <a href="#">laudantium</a>.
      </p>
      <h3>Lists</h3>
      <p>
        <em>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          tempora ipsam. Nobis obcaecati in animi nam ratione, placeat
          exercitationem odio.
        </em>
      </p>
      <h4>Unordered List</h4>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
      <h4>Ordered List</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
        voluptatem!
      </p>
      <ol>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ol>
      <h3>Blockquote</h3>
      <blockquote>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
        voluptate, doloremque quisquam corporis deleniti cumque, magnam
        voluptate, dicta consequatur neque.
      </blockquote>
      <h3>Code</h3>
      <p>
        Lorem ipsum, dolor sit amet <code>consectetur</code> adipisicing elit.
        Alias pariatur numquam quas, nesciunt eveniet minima!
      </p>
      <pre>
        <code>
          {`function helloWorld() {
  console.log("Hello, world!");
}`}
        </code>
      </pre>
      <h3>Figure</h3>
      <figure>
        <img
          className="w-full"
          src="https://placehold.co/600x400"
          alt="Placeholder"
        />
        <figcaption>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
          consequuntur.
        </figcaption>
      </figure>
      <h3>Table</h3>
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
          </tr>
          <tr>
            <td>Data 4</td>
            <td>Data 5</td>
            <td>Data 6</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
