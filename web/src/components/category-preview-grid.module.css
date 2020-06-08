@import '../styles/media-queries.css';
@import '../styles/vars.css';

.root {
  margin: 2em 0 4em;
}

.headline {
  font-size: var(--font-small-size);
  line-height: var(--font-small-line-height);
  margin: 2rem 0;

  @nest & a {
    color: inherit;
    text-decoration: none;
  }
}

.grid {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 2em;
  grid-row-gap: 2em;

  @media (--media-min-small) {
    grid-template-columns: 1fr 1fr;
  }

  @media (--media-min-medium) {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.browseMoreNav {
  composes: small from './typography.module.css';
  margin-top: 1rem;
  text-align: right;

  @nest & a {
    display: inline-block;
    padding: 0.5rem 0;
    color: inherit;
    text-decoration: none;

    @media (hover: hover) {
      @nest &:hover {
        color: var(--color-accent);
      }
    }
  }
}
