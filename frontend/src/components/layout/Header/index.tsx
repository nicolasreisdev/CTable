import { FiPlus } from 'react-icons/fi';
import Searchbar from '../../domain/Searchbar';
import * as S from './styles';

// --- DADOS MOCKADOS ---
const mockUser = {
    username: 'cecilia',
    avatarUrl: 'https://i.pravatar.cc/150?img=32' // Avatar de exemplo
};
// ----------------------------------------------------

interface HeaderProps {
    onCreateClick: () => void; 
}

export default function Header({ onCreateClick }: HeaderProps) {
    return (
        <S.HeaderContainer>
            <S.SearchContainer>
                <Searchbar />
            </S.SearchContainer>

            <S.ActionsContainer>
                <S.CreateButton onClick={onCreateClick}> 
                    <FiPlus size={20} />
                    Create
                </S.CreateButton>

                <S.ProfileIcon to={`/profile`}> 
                    <img src={mockUser.avatarUrl} alt="Foto de perfil" />
                </S.ProfileIcon>
            </S.ActionsContainer>
        </S.HeaderContainer>
    );
}

