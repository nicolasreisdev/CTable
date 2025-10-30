import React, { useState } from 'react';
import { FiHome, FiChevronDown } from 'react-icons/fi';

import * as S from './styles';

// --- Tipagem dos Dados ---
interface Community {
    id: string;
    name: string;
    iconUrl: string;
}

// --- DADOS MOCKADOS ---
const mockCommunities: Community[] = [
    { id: 'react', name: 'r/React', iconUrl: 'https://styles.redditmedia.com/t5_2zldd/styles/communityIcon_fbblpo38o0x11.png' },
    { id: 'node', name: 'r/Node', iconUrl: 'https://styles.redditmedia.com/t5_2qgct/styles/communityIcon_i4e0vjze1w2y1.png' },
    { id: 'python', name: 'r/Python', iconUrl: 'https://styles.redditmedia.com/t5_2qh0y/styles/communityIcon_h9b7f16n1af31.png' },
    { id: 'scikit', name: 'r/Scikit-Learn', iconUrl: 'https://styles.redditmedia.com/t5_2tby0/styles/communityIcon_d8j4iz4o9k731.png' },
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
                <S.HomeLink to="/">
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
                                    src={community.iconUrl}
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

