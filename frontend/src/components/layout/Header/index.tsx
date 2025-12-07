import { FiPlus } from 'react-icons/fi';
import Searchbar from '../../domain/Searchbar';
import * as S from './styles';


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
                    <span>Create</span>
                </S.CreateButton>

                <S.ProfileIcon to={`/profile`}> 
                </S.ProfileIcon>
            </S.ActionsContainer>
        </S.HeaderContainer>
    );
}