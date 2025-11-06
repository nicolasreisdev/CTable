import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import * as S from './styles';

export default function Searchbar() {
    const [query, setQuery] = useState('');

    // Lida com o envio da busca (ex: pressionar Enter)
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica de busca implementada aqui
        console.log('Buscando por:', query);
    };

    return (
        <form onSubmit={handleSearch} style={{ width: '100%' }}>
            <S.SearchWrapper>
                <FiSearch size={20} />
                <S.SearchInput
                    type="text"
                    placeholder="Busque comunidades e projetos"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </S.SearchWrapper>
        </form>
    );
}
