import React, { useState } from 'react';
import { FiHome, FiChevronDown } from 'react-icons/fi';

import * as S from './styles';

// --- Tipagem dos Dados ---
interface Community {
    id: string;
    name: string;
}

// --- DADOS MOCKADOS ---
const mockCommunities: Community[] = [
    { id: 'react', name: 'r/React' },
    { id: 'node', name: 'r/Node' },
    { id: 'python', name: 'r/Python'},
    { id: 'scikit', name: 'r/Scikit-Learn'},
];
// ----------------------

export default function Sidebar() {
    // Estado para controlar se a lista de comunidades está visível
    const [isCommunitiesOpen, setIsCommunitiesOpen] = useState(true);

    const toggleCommunities = () => {
        setIsCommunitiesOpen(!isCommunitiesOpen);
    };

    return (
        <S.SidebarContainer>
            <S.SidebarNav>
                
                {/* 1. Link para Home - Feed inicial*/}
                <S.HomeLink to="/feed">
                    <FiHome size={22} />
                    <span>Home</span>
                </S.HomeLink>

                {/* 2. Cabeçalho das Comunidades (clicável) */}
                <S.CommunitiesHeader onClick={toggleCommunities} isOpen={isCommunitiesOpen}>
                    <span>COMUNIDADES</span>
                    <FiChevronDown size={20} />
                </S.CommunitiesHeader>

                {/* 3. Lista de Comunidades (mockado - fazer programaticamente) */}
                {isCommunitiesOpen && (
                    <S.CommunitiesList>
                        {mockCommunities.map((community) => (
                            <S.CommunityLink
                                to={`/r/${community.id}`}
                                key={community.id}
                            >
                                <S.CommunityIcon
                                    alt={`${community.name} icon`}
                                />
                                <span>{community.name}</span>
                            </S.CommunityLink>
                        ))}
                    </S.CommunitiesList>
                )}

            </S.SidebarNav>
        </S.SidebarContainer>
    );
}

