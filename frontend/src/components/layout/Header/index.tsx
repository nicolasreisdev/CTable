import { FiPlus } from 'react-icons/fi';
import Searchbar from '../../domain/Searchbar';
import * as S from './styles';
import { useAuth } from '../../../API/AuthContext';
import { getAvatarUrl } from '../../../utils/getAvatarurl';


interface HeaderProps {
    onCreateClick: () => void; 
}

export default function Header({ onCreateClick }: HeaderProps) {

    const { currentUser } = useAuth();

    return (
        <S.HeaderContainer>
            <S.SearchContainer>
                <Searchbar />
            </S.SearchContainer>

            <S.ActionsContainer>
                <S.CreateButton onClick={onCreateClick}> 
                    <FiPlus size={20} />
                    <span>Create</span>
                </S.CreateButton>

                <S.ProfileIcon to={`/profile`}> 
                    <img 
                        src={getAvatarUrl(currentUser?.username || 'user')} 
                        alt="Meu Perfil"
                    />
                </S.ProfileIcon>
            </S.ActionsContainer>
        </S.HeaderContainer>
    );
}