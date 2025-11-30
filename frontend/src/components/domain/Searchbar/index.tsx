import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import * as S from './styles';
import { useNavigate } from 'react-router-dom';

import { GetAllCommunities } from '../../../API/Community';
import { GetFeedProjects } from '../../../API/Project';
import type { CommunityProps } from '../../../API/Community';
import type { ProjectProps } from '../../../API/Project';

export default function Searchbar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Dados brutos (cache local)
    const [allCommunities, setAllCommunities] = useState<CommunityProps[]>([]);
    const [allProjects, setAllProjects] = useState<ProjectProps[]>([]);

    // Dados filtrados para exibição
    const [filteredCommunities, setFilteredCommunities] = useState<CommunityProps[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<ProjectProps[]>([]);

    // Carrega dados APENAS na primeira vez que o usuário foca na busca (para economizar recursos)
    const handleFocus = async () => {
        setIsFocused(true);
        if (allCommunities.length === 0 && allProjects.length === 0) {
            setIsLoading(true);
            try {
                // Busca em paralelo
                const [communitiesData, projectsData] = await Promise.all([
                    GetAllCommunities().catch(() => []), // Se falhar, retorna array vazio
                    GetFeedProjects().catch(() => [])
                ]);
                
                setAllCommunities(communitiesData);
                setAllProjects(projectsData);
            } catch (error) {
                console.error("Erro ao carregar dados para pesquisa", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Efeito para filtrar sempre que a query ou os dados mudarem
    useEffect(() => {
        if (!query.trim()) {
            setFilteredCommunities([]);
            setFilteredProjects([]);
            return;
        }

        const lowerQuery = query.toLowerCase();

        // Filtra Comunidades (pelo nome ou descrição ou tecnologias)
        const filteredComms = allCommunities.filter(comm => 
            comm.name.toLowerCase().includes(lowerQuery) ||
            comm.description?.toLowerCase().includes(lowerQuery) ||
            comm.technologies?.some(tech => tech.toLowerCase().includes(lowerQuery))
        );

        // Filtra Projetos (pelo título ou tecnologias)
        const filteredProjs = allProjects.filter(proj => 
            proj.title.toLowerCase().includes(lowerQuery) ||
            proj.technologies?.some(tech => tech.toLowerCase().includes(lowerQuery))
        );

        setFilteredCommunities(filteredComms.slice(0, 5)); // Limita a 5 resultados
        setFilteredProjects(filteredProjs.slice(0, 5));    // Limita a 5 resultados

    }, [query, allCommunities, allProjects]);

    // Fecha ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Navegação
    const handleNavigateToCommunity = (communityId: string) => {
        navigate(`/r/${communityId}`);
        setIsFocused(false);
        setQuery('');
    };

    const handleNavigateToProject = (projectId: string) => {
        navigate(`/project/${projectId}`); 
        console.log("Navegar para projeto:", projectId);
        setIsFocused(false);
    };

    const hasResults = filteredCommunities.length > 0 || filteredProjects.length > 0;

    return (
        <S.SearchWrapper ref={wrapperRef}>
            <FiSearch size={20} />
            <S.SearchInput
                type="text"
                placeholder="Busque comunidades e projetos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={handleFocus}
            />

            {/* Renderiza o dropdown apenas se estiver focado e houver texto */}
            {isFocused && query.length > 0 && (
                <S.ResultsDropdown>
                    {isLoading ? (
                        <S.NoResults>Carregando...</S.NoResults>
                    ) : !hasResults ? (
                        <S.NoResults>Nenhum resultado encontrado.</S.NoResults>
                    ) : (
                        <>
                            {/* Seção de Comunidades */}
                            {filteredCommunities.length > 0 && (
                                <S.ResultSection>
                                    <h4>Comunidades</h4>
                                    {filteredCommunities.map(comm => (
                                        <S.ResultItem 
                                            key={comm.communityID} 
                                            onClick={() => handleNavigateToCommunity(comm.communityID)}
                                        >
                                            <span>{comm.name}</span>
                                            {/* Opcional: mostrar tecnologia principal */}
                                            {comm.technologies?.[0] && <small>{comm.technologies[0]}</small>}
                                        </S.ResultItem>
                                    ))}
                                </S.ResultSection>
                            )}

                            {/* Seção de Projetos */}
                            {filteredProjects.length > 0 && (
                                <S.ResultSection>
                                    <h4>Projetos</h4>
                                    {filteredProjects.map((proj: any) => (
                                        <S.ResultItem 
                                            key={proj.id || proj.projectID} 
                                            onClick={() => handleNavigateToProject(proj.id || proj.projectID)}
                                        >
                                            <span>{proj.title}</span>
                                            <small>por {proj.authorUsername || 'Usuário'}</small>
                                        </S.ResultItem>
                                    ))}
                                </S.ResultSection>
                            )}
                        </>
                    )}
                </S.ResultsDropdown>
            )}
        </S.SearchWrapper>
    );
}
