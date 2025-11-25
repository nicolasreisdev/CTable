import React, { useState } from 'react';
import { FiHome, FiChevronDown } from 'react-icons/fi';
import { GetAllCommunities } from '../../../API/Community';
import * as S from './styles';
import type { CommunityProps } from '../../../API/Community';
import { useAuth } from '../../../API/AuthContext';
import { useEffect } from 'react';

export default function Sidebar() {
    // Estado para controlar se a lista de comunidades está visível
    const [isCommunitiesOpen, setIsCommunitiesOpen] = useState(true);
    const { currentUser, logout } = useAuth();
    const [userCommunities, setUserCommunities] = useState<CommunityProps[]>([]);

    const toggleCommunities = () => {
        setIsCommunitiesOpen(!isCommunitiesOpen);
    };

      useEffect(() => {
        // Função assíncrona para buscar todos os dados
        console.log("Efeito de busca de dados do perfil disparado.");
        const fetchProfileData = async () => {
          try {;
            
            console.log("Usuário atual no Profile:", currentUser);
            const apiUserCommunities = await GetAllCommunities();
            
            
            setUserCommunities(apiUserCommunities);
    
          } catch (error) {
            console.error("Falha ao buscar dados do perfil:", error);
          } 
          
        };
        if(currentUser)
          fetchProfileData();
      }, [currentUser]); 

    return (
        <S.SidebarContainer>
            <S.SidebarNav>
                
                <S.HomeLink to="/feed">
                    <FiHome size={22} />
                    <span>Home</span>
                </S.HomeLink>

                <S.CommunitiesHeader onClick={toggleCommunities} isOpen={isCommunitiesOpen}>
                    <span>COMUNIDADES</span>
                    <FiChevronDown size={20} />
                </S.CommunitiesHeader>

                {isCommunitiesOpen && (
                    <S.CommunitiesList>
                        {userCommunities.map((community) => (
                            <S.CommunityLink
                                to={`/r/${community.name}`}
                                key={community.communityID}
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

