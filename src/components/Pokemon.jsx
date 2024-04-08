import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAllPokemonData = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=151'
        );
        const results = response.data.results;
        const pokemonDataArray = await Promise.all(
          results.map(async (pokemon) => {
            const pokemonResponse = await axios.get(pokemon.url);
            return pokemonResponse.data;
          })
        );
        setPokemonList(pokemonDataArray);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchAllPokemonData();
  }, []);

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='max-w-6xl mx-auto flex flex-col gap-8'>
      <header className='bg-neutral shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
          <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
              <span className='text-secondary'>Pokemon</span>
              <span className='text-primary'>Deck</span>
            </h1>
          </Link>

          <form className='bg-white p-3 rounded-lg flex items-center'>
            <input
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={handleSearchChange}
              className='bg-trasparent focus:outline-none w-24 sm:w-64'
            />
            <button type='submit'>
              <FaSearch className='text-secondary' />
            </button>
          </form>
        </div>
      </header>
      <section className='flex flex-wrap justify-center items-center gap-4'>
        {filteredPokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            className='bg-neutral flex items-center justify-around shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[300px] sm:w-[330px]'
          >
            <img
              className='object-cover hover:scale-105 transition-scale duration-300'
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
            <div>
              <h2 className='truncate text-lg font-semibold text-primary'>
                {pokemon.name}
              </h2>
              <p className='truncate font-semibold text-secondary'>
                Base Experience: {pokemon.base_experience}
              </p>
              <p className='truncate font-semibold text-secondary'>
                Height: {pokemon.height}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Pokemon;
