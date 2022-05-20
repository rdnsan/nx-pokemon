import { useEffect, useState, useCallback, ChangeEvent } from 'react';
import type { Pokemon } from '@nx-pokemon/shared-types';
import styles from './index.module.css';

interface IProps {
  q: string;
  pokemon: Pokemon[];
}

export function Index({ q, pokemon: initialPokemon }: IProps) {
  const [search, setSearch] = useState(q);
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon);

  useEffect(() => {
    fetch(`http://localhost:3333/search?q=${search}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [search]);

  const onSetSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  return (
    <div className={styles.page}>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={onSetSearch}
      />
      <ul>
        {pokemon.map(({ name: { english }, id }) => (
          <li key={id}>{english}</li>
        ))}
      </ul>
    </div>
  );
}

export default Index;

export async function getServerSideProps(context) {
  const BASE_URL = `http://localhost:3333`;
  let pokemon = [];

  if (context.query.q) {
    const res = await fetch(`${BASE_URL}/search?q=${context.query.q}`);
    pokemon = await res.json();
  }

  return {
    props: {
      q: context.query.q ?? '',
      pokemon,
    },
  };
}
