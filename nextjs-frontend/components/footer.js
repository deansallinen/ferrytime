import Link from 'next/link';

export default () => (
  <footer>

  <h3>
    <Link prefetch href="/">
    <a>
    Ferrytracker
    </a>
    </Link>
  </h3>
  <p>Written by Dean Sallinen</p>
  <p>Node | Graphql | React | Next</p>
  <style jsx>{`
    h1 {
      font-family: sans-serif;
    }
    a {
      text-decoration: none;
      color: #fefefe;
    }
    footer {
      background-color: #222;
      padding: .5rem;
      color: #aaa;
    }
  `}</style>
  </footer>

);
