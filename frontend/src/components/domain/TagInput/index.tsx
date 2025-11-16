import React, { useState, useEffect, useRef } from 'react';
import * as S from '../CreationForm/styles'; 
import { Keyword, KeywordContainer } from '../../common/Keyword';

interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  
  searchList: string[]; 
  limit: number;         
  placeholder: string;   
}


export default function TagInput({ 
  value: selectedTags = [], 
  onChange, 
  searchList, 
  limit,      
  placeholder 
}: TagInputProps) {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [error, setError] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = searchList.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedTags.includes(item) // Não mostra o que já foi selecionado
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, selectedTags, searchList]); 

  // Lógica para fechar a lista de resultados ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSearchResults([]); // Fecha a lista
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  // Adiciona uma tag
  const handleAddTag = (tag: string) => {
    // Usa o 'limit' da prop
    if (selectedTags.length >= limit) {
      setError(`Limite de ${limit} itens atingido.`);
      return;
    }
    if (!selectedTags.includes(tag)) {
      onChange([...selectedTags, tag]); // Atualiza o react-hook-form
      setSearchQuery(''); 
      setSearchResults([]);
      setError(''); 
    }
  };

  // Remove uma tag
  const handleRemoveTag = (tagToRemove: string) => {
    onChange(selectedTags.filter(tag => tag !== tagToRemove));
    setError(''); 
  };

  return (
    <S.SearchWrapper ref={wrapperRef}>
      {selectedTags.length > 0 && (
        <KeywordContainer>
          {selectedTags.map(tag => (
            <Keyword 
              key={tag} 
              onRemove={() => handleRemoveTag(tag)}
            >
              {tag}
            </Keyword>
          ))}
        </KeywordContainer>
      )}
      
      <div style={{ height: selectedTags.length > 0 ? '12px' : '0' }} />

      <S.Input
        type="text"
        placeholder={placeholder} 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        disabled={selectedTags.length >= limit} 
      />

      {searchResults.length > 0 && (
        <S.SearchResultsList>
          {searchResults.map(tag => (
            <S.SearchResultItem key={tag} onClick={() => handleAddTag(tag)}>
              {tag}
            </S.SearchResultItem>
          ))}
        </S.SearchResultsList>
      )}

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.SearchWrapper>
  );
}